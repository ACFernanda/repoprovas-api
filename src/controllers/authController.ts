import { Request, Response } from "express";

import { CreateUserData } from "../repositories/authRepository.js";
import * as authService from "./../services/authService.js";

export async function signUp(req: Request, res: Response) {
  const body: { email: string; password: string; confirmPassword: string } =
    req.body;
  const userData: CreateUserData = {
    email: body.email,
    password: body.password,
  };
  await authService.signUp(userData);
  res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
  const userData: CreateUserData = req.body;
  const token = await authService.signIn(userData);
  res.status(200).send(token);
}
