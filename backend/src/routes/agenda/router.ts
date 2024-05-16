import express from 'express';
import { create } from './create';
import { get } from './get';
import { update } from './update';
import { remove } from './remove';
import { list } from './list';
import { Request } from 'express';
import { ParsedQs } from 'qs';

const agendaRouter = express.Router();

type Req = Request<{ id: string }, any, any, ParsedQs, Record<string, any>>;
type ReqUserId = Request<
  { userId: string },
  any,
  any,
  ParsedQs,
  Record<string, any>
>;

agendaRouter.post('/create', (req, res) => create(req, res));
agendaRouter.post('/get', (req: Req, res) => get(req, res));
agendaRouter.post('/remove', (req: Req, res) => remove(req, res));
agendaRouter.post('/update', (req: Req, res) => update(req, res));
agendaRouter.post('/list', (req: ReqUserId, res) => list(req, res));

export default agendaRouter;
