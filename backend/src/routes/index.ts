import express from "express";
import { authRouter } from "./auth";
import { userRouter } from "./user";
import { timetableRouter } from "./timetable";
import { eventsRouter } from "./events";
import { agendaRouter } from "./agenda";

const router = express.Router();

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/timetable', timetableRouter)
router.use('/events', eventsRouter)
router.use('/agenda', agendaRouter)

export default router;
