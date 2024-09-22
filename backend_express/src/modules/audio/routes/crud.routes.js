import { Router } from "express";
import {
  createAudio,
  editAudio,
  deleteAudio,
} from "../controllers/crud.controller.js";

export const crudAudioRouter = Router();

crudAudioRouter.post("/", createAudio);
crudAudioRouter.patch("/:audioId", editAudio);
crudAudioRouter.delete("/:audioId", deleteAudio);
