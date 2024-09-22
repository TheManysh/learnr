import { Router } from "express";
import { getQuizRouter } from "./routes/get.routes.js";
import { crudQuizRouter } from "./routes/crud.routes.js";

export const quizRouter = Router();

quizRouter.use("/get", getQuizRouter);
quizRouter.use("/crud", crudQuizRouter);
