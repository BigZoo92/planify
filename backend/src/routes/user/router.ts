import express from 'express';
import { addUrl } from './addUrl';
import { deleteUrl } from './deleteUrl';
const userRouter = express.Router();

userRouter.post('/addUrl', (req, res) => addUrl(req, res));
userRouter.post('/deleteUrl', (req, res) => deleteUrl(req, res));

export default userRouter;
