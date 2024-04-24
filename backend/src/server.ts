import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';

import { scrapeTestPage } from './scraper';
import session from 'express-session';
import { getGoogleAuthURL, getGoogleUser } from './auth/googleStrategy'; 
import SessionData from './@types/types';
import fs from 'fs';
import path from 'path';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cors from 'cors';
import { parseIcsFile } from './routes/parseIcs';
import { corsOptions } from './constants';
import { getDataFromCelcat } from './routes/getDataFromCelcat';

dotenv.config();


const app = express();
const port = process.env.PORT || 8000;

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret', 
  resave: true,
  saveUninitialized: true,
}));

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.get('/auth/google', (req: Request, res: Response) => getGoogleAuthURL(req, res));

app.get('/auth/google/callback', async (req: Request, res: Response) => getGoogleUser(req, res));

app.post('/getDataFromCelcat', async (req, res) => await getDataFromCelcat(req, res));

app.get('/ics', async (req, res) => {
  const test = await parseIcsFile();
  res.send(test);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
