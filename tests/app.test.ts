import supertest from "supertest";

import app from "../src/app.js";
import prisma from "../src/config/db.js";
import userFactory from "./factories/userFactory.js";
import testFactory from "./factories/testFactory.js";

beforeEach(async () => {
  await prisma.$executeRaw`DELETE FROM users WHERE email = 'teste@teste.com'`;
  await prisma.$executeRaw`TRUNCATE TABLE tests`;
});

describe("POST /sign-up", () => {
  it("returns 201 for valid input", async () => {
    const login = userFactory.createLogin();
    const response = await supertest(app).post("/sign-up").send(login);
    expect(response.status).toEqual(201);
  });

  it("returns 409 for duplicate input", async () => {
    const login = userFactory.createLogin();
    await userFactory.createUser(login);

    const response = await supertest(app).post("/sign-up").send(login);
    expect(response.status).toEqual(409);
  });

  it("given an invalid input, returns 400", async () => {
    const login = userFactory.createLogin();
    delete login.password;

    const response = await supertest(app).post("/sign-up").send(login);
    expect(response.status).toEqual(400);
  });
});

describe("POST /sign-in", () => {
  it("returns token for valid input", async () => {
    const login = userFactory.createLogin();
    delete login.confirmPassword;
    const user: any = await userFactory.createUser(login);

    const response = await supertest(app).post("/sign-in").send({
      email: user.email,
      password: user.plainPassword,
    });
    const token = response.body.token;
    expect(token).not.toBeNull();
  });

  it("returns 401 for wrong email or password", async () => {
    const login = userFactory.createLogin();
    delete login.confirmPassword;
    const user = userFactory.createUser(login);

    const response = await supertest(app)
      .post("/sign-in")
      .send({ ...login, password: "outropassword" });
    expect(response.status).toEqual(401);
  });

  it("given an invalid input, returns 400", async () => {
    const login = userFactory.createLogin();

    const response = await supertest(app).post("/sign-in").send(login);
    expect(response.status).toEqual(400);
  });
});

describe("POST /tests", () => {
  it("given valid inputs, create test", async () => {
    const login = userFactory.createLogin();
    delete login.confirmPassword;
    await userFactory.createUser(login);

    let response = await supertest(app).post("/sign-in").send(login);
    const token = response.text;

    const test = testFactory.createTestInfo();

    response = await supertest(app)
      .post("/tests")
      .send(test)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(201);

    const savedTest = await prisma.tests.findFirst({
      where: { name: test.name, pdfUrl: test.pdfUrl },
    });

    expect(test.name).toBe(savedTest.name);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
