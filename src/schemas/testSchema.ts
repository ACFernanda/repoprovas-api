import joi from "joi";
import { CreateTestData } from "../repositories/testRepository";

export const testSchema = joi.object<CreateTestData>({
  name: joi.string().required(),
  pdfUrl: joi.string().uri().required(),
  categoryId: joi.number().integer().required(),
  teacherDisciplineId: joi.number().integer().required(),
});
