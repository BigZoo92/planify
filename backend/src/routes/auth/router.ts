import express from 'express';
import { googleAuth } from './googleAuth';
import { login } from './login';
import { isAuth } from './isAuth';
import { signup } from './signup';
import { get } from './get';

const authRouter = express.Router();

authRouter.post('/login', (req, res) => login(req, res));
authRouter.post('/signup', (req, res) => signup(req, res));
authRouter.post('/isAuth', (req, res) => isAuth(req, res));
authRouter.post('/get', (req, res) => get(req, res));

authRouter.post('/google', (req, res) => googleAuth(req, res));

export default authRouter;
