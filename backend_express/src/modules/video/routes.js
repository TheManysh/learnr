import { Router } from "express";
import { getvideoRoute } from "./routes/get.routes.js";
import { crudvideoRouter } from "./routes/crud.routes.js";

export const videoRouter = Router();

videoRouter.use("/get", getvideoRoute);
videoRouter.use("/crud", crudvideoRouter);
