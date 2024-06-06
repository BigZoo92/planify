import express from 'express';
import { create } from './create';
import { get } from './get';
import { update } from './update';
import { remove } from './remove';
import { list } from './list';
import { Request } from 'express';
import { ParsedQs } from 'qs';
import { getUniversityEvent } from './getUniversityEvent';

const eventsRouter = express.Router();

type Req = Request<{ id: number }, any, any, ParsedQs, Record<string, any>>;
type ReqAgendaId = Request<
  { agendaId: number },
  any,
  any,
  ParsedQs,
  Record<string, any>
>;

eventsRouter.post('/create', (req, res) => create(req, res));
eventsRouter.post('/get', (req: Req, res) => get(req, res));
eventsRouter.post('/remove', (req: Req, res) => remove(req, res));
eventsRouter.post('/update', (req: Req, res) => update(req, res));
eventsRouter.post('/list', (req: ReqAgendaId, res) => list(req, res));
eventsRouter.post('/getUniversityEvent', (req: Req, res) =>
  getUniversityEvent(req, res)
);

export default eventsRouter;
