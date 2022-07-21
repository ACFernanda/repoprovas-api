import { Router } from "express";
import { tokenValidator } from "../middlewares/tokenValidator.js";
import schemaValidator from "../middlewares/schemaValidator.js";
import {
  createTest,
  getTestsByDisciplines,
  getTestsByTeachers,
} from "../controllers/testsController.js";
import { testSchema } from "../schemas/testSchema.js";

const testsRouter = Router();

testsRouter.use(tokenValidator);

testsRouter.post("/tests", schemaValidator(testSchema), createTest);
testsRouter.get("/tests/disciplines", getTestsByDisciplines);
testsRouter.get("/tests/teachers", getTestsByTeachers);

export default testsRouter;
