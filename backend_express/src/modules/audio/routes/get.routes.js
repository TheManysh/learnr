import { Router } from "express";
import { getAudiosByVideo } from "../controllers/get.controller.js";

export const getAudioRouter = Router();

getAudioRouter.get("/video/:videoId", getAudiosByVideo);
