import { Router } from "express";
export const authRouter = Router();
import { loginuser, signupuser } from "../controllers/auth.controller.js";
authRouter.post("/signup", signupuser);
authRouter.post("/login", loginuser);
