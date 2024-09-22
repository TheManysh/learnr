import { Router } from "express";
import {
  createCourse,
  editCourse,
  deleteCourse,
} from "../controllers/crud.controller.js";

export const crudCourseRouter = Router();

crudCourseRouter.post("/", createCourse);
crudCourseRouter.patch("/:courseId", editCourse);
crudCourseRouter.delete("/:courseId", deleteCourse);
