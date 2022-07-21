import prisma from "../config/db.js";
import { tests } from "@prisma/client";
import { number } from "joi";

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

export async function findByDiscipline() {
  // const result = await prisma.terms.findMany({
  //   include: {
  //     disciplines: {
  //       select: {
  //         name: true,
  //       },
  //       include: {
  //         teachersDisciplines: {
  //           include: {
  //             tests: {
  //               select: {
  //                 name: true,
  //                 pdfUrl: true,
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // });
  const result = await prisma.terms.findMany({
    select: {
      number: true,
      disciplines: {
        select: {
          id: true,
          name: true,
          teachersDisciplines: {
            select: {
              teachers: { select: { name: true } },
              tests: {
                select: {
                  name: true,
                  pdfUrl: true,
                  category: { select: { name: true } },
                },
              },
            },
          },
        },
      },
    },
  });

  return result;
}
