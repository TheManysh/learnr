import express from "express";
import {
  createQuiz,
  editQuiz,
  deleteQuiz,
} from "../controllers/crud.controller.js";

export const crudQuizRouter = express.Router();

crudQuizRouter.post("/", createQuiz);
crudQuizRouter.patch("/:quizId", editQuiz);
crudQuizRouter.delete("/:quizId", deleteQuiz);
