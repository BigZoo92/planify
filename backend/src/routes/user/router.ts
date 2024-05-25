import express from 'express';
import { addUrl } from './addUrl';
import { deleteUrl } from './deleteUrl';
import { pushToken } from './pushToken';
const userRouter = express.Router();

userRouter.post('/addUrl', (req, res) => addUrl(req, res));
userRouter.post('/deleteUrl', (req, res) => deleteUrl(req, res));
userRouter.post('/pushToken', (req, res) => pushToken(req, res));

export default userRouter;
