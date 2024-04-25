import express from "express";
import { authRouter } from "./auth";
import { timetableRouter } from "./timetable";

const router = express.Router();

router.use('/auth', authRouter)
router.use('/timetable', timetableRouter)

export default router;
