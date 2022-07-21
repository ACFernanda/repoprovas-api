import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

import prisma from "../../src/config/db.js";

function createLogin(email = "teste@teste.com", passwordLength = 10) {
  const password = faker.internet.password(passwordLength);
  return {
    email,
    password: password,
    confirmPassword: password,
  };
}

interface Login {
  email: string;
  password: string;
}

async function createUser(login: Login) {
  const user = await prisma.users.create({
    data: {
      email: login.email,
      password: bcrypt.hashSync(login.password, 12),
    },
  });

  return { ...user, plainPassword: login.password };
}

const userFactory = {
  createLogin,
  createUser,
};

export default userFactory;
