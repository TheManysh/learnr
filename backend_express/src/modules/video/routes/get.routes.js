import { Router } from "express";
import { getVideos, getVideobyId } from "../controllers/get.controller.js"; // Adjust the path as needed

export const getvideoRoute = Router();

getvideoRoute.get("/:id", getVideobyId);
getvideoRoute.get("/", getVideos);
