import express from 'express';
import { getDataFromCelcat } from './getDataFromCelcat';
import { getDataFromTimetableWithAi } from './getDataFromTimetableWithAi';
// import parseIcs from "./parseIcs";

const timetableRouter = express.Router();

// timetable.post('/ics', (req, res) => parseIcs(req, res))

timetableRouter.post('/celcat', (req, res) => getDataFromCelcat(req, res));

timetableRouter.post('/ai', (req, res) => getDataFromTimetableWithAi(req, res));

export default timetableRouter;
