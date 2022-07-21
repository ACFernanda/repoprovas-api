import { Request, Response } from "express";

import { CreateTestData } from "../repositories/testRepository.js";
import * as testService from "./../services/testService.js";

export async function createTest(req: Request, res: Response) {
  const testData: CreateTestData = req.body;
  await testService.createTest(testData);

  res.sendStatus(201);
}

export async function getTestsByDisciplines(req: Request, res: Response) {
  const tests = await testService.getByDisciplines();
  res.send(tests);
}

export async function getTestsByTeachers(req: Request, res: Response) {
  const tests = await testService.getByTeachers();
  res.send(tests);
}
