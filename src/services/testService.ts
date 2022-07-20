import { CreateTestData } from "../repositories/testRepository.js";
import * as testRepository from "../repositories/testRepository.js";

export async function createTest(testData: CreateTestData) {
  const category = await testRepository.findCategoryById(testData.categoryId);

  if (!category) {
    throw {
      type: "not_found",
      message: `Category not found`,
    };
  }

  const teacherDiscipline = await testRepository.findTeachersDisciplinesById(
    testData.teacherDisciplineId
  );

  if (!teacherDiscipline) {
    throw {
      type: "not_found",
      message: `TeacherDiscipline not found`,
    };
  }

  await testRepository.insert(testData);
}
