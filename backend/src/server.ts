import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cors from 'cors';
import { parseIcsFile } from './routes/parseIcs';
import { corsOptions } from './constants';
import { getDataFromCelcat } from './routes/getDataFromCelcat';

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

// app.post('/scrape', async (req, res) => await scrapeTestPage(req, res));
app.post('/getDataFromCelcat', async (req, res) => await getDataFromCelcat(req, res));

app.get('/ics', async (req, res) => {
  const test = await parseIcsFile();
  res.send(test);
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
