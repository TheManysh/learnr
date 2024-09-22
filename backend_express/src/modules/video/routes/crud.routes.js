import { Router } from "express";
import {
  createVideo,
  updateVideo,
  deleteVideo,
} from "../controllers/crud.controller.js"; // Adjust the path as needed

export const crudvideoRouter = Router();

// Route to create a new video
crudvideoRouter.post("/", createVideo);

// Route to update a video by ID
crudvideoRouter.put("/:id", updateVideo);

// Route to delete a video by ID
crudvideoRouter.delete("/:id", deleteVideo);
