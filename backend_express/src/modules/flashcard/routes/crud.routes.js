import express from "express";
import { createFlash } from "../controllers/crud.controller.js";

export const crudFlashRouter = express.Router();

crudFlashRouter.post("/", createFlash);
