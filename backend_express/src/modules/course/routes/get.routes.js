import { Router } from "express";
import { getCourseById, getCourses } from "../controllers/get.controller.js"; // Adjust the path as needed

export const getCourseRoute = Router();
getCourseRoute.get("/:id", getCourseById);
getCourseRoute.get("/", getCourses);
