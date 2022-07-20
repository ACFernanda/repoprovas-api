import prisma from "../config/db.js";
import { tests } from "@prisma/client";

export type CreateTestData = Omit<tests, "id">;

export async function findCategoryById(categoryId: number) {
  const result = await prisma.categories.findUnique({
    where: { id: categoryId },
  });
  return result;
}

export async function findTeachersDisciplinesById(teacherDisciplineId: number) {
  const result = await prisma.teachersDisciplines.findUnique({
    where: { id: teacherDisciplineId },
  });
  return result;
}

export async function insert(testData: CreateTestData) {
  await prisma.tests.create({ data: testData });
}
