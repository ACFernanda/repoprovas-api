import supertest from "supertest";
import app from "../src/app.js";

describe("POST /sign-up", () => {
  it("returns 201 for valid input", async () => {
    const result = await supertest(app).post("/sign-up").send({
      email: "teste@teste.com",
      password: "teste",
      confirmPassword: "teste",
    });
    expect(result.status).toEqual(201);
  });

  it("returns 409 for duplicate input", async () => {
    const body = {
      email: "teste2@teste2.com",
      password: "teste2",
      confirmPassword: "teste2",
    };

    const firstTry = await supertest(app).post("/sign-up").send(body);
    expect(firstTry.status).toEqual(201);

    const secondTry = await supertest(app).post("/sign-up").send(body);
    expect(secondTry.status).toEqual(409);
  });
});
