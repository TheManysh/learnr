import { Router } from "express";
import { getCourseRoute } from "./routes/get.routes.js";
import { crudCourseRouter } from "./routes/crud.routes.js";

export const courseRouter = Router();

courseRouter.use("/get", getCourseRoute);
courseRouter.use("/crud", crudCourseRouter);
