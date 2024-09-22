import { Router } from "express";

import { user } from "./src/modules/user/index.js";
import { video } from "./src/modules/video/index.js";
import { audio } from "./src/modules/audio/index.js";
import { course } from "./src/modules/course/index.js";
import { quiz } from "./src/modules/quiz/index.js";
import { flash } from "./src/modules/flashcard/index.js";
export const router = Router();

router.use("/user", user);
router.use("/video", video);
router.use("/audio", audio);
router.use("/course", course);
router.use("/quiz", quiz);
router.use("/flash", flash);
