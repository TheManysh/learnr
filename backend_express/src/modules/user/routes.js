import { Router } from "express";
import { authRouter } from "./routes/auth.routes.js";

export const userRouter = Router();

userRouter.use("/auth", authRouter);
