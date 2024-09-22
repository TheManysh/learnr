import { Router } from "express";
import { getAudioRouter } from "./routes/get.routes.js";
import { crudAudioRouter } from "./routes/crud.routes.js";

export const audioRouter = Router();

audioRouter.use("/get", getAudioRouter);
audioRouter.use("/crud", crudAudioRouter);
