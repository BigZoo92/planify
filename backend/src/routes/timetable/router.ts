import express from 'express';
import { getDataFromTimetableWithAi } from './getDataFromTimetableWithAi';
// import parseIcs from "./parseIcs";

const timetableRouter = express.Router();

// timetable.post('/ics', (req, res) => parseIcs(req, res))

timetableRouter.post('/ai', (req, res) => getDataFromTimetableWithAi(req, res));

export default timetableRouter;
