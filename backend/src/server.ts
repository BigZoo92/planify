import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import fs from 'fs/promises';

import session from 'express-session';
import { getGoogleAuthURL, getGoogleUser } from './routes/auth'; 
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cors from 'cors';
import { parseIcs } from './routes/parse';
import { getDataFromCelcat } from './routes/parse';

dotenv.config();


const app = express();
const port = process.env.PORT || 8000;

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan('dev'));

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

// app.get('/ics', async (req, res) => {
//   const test = parseIcs(icsTest);
//   res.send(test);
// });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
