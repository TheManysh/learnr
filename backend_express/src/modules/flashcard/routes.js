import { Router } from "express";
import { getFlashRouter } from "./routes/get.routes.js";
import { crudFlashRouter } from "./routes/crud.routes.js";

export const flashRouter = Router();

flashRouter.use("/get", getFlashRouter);
flashRouter.use("/crud", crudFlashRouter);
