import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cors from 'cors';
import { scrapeTestPage } from './routes/scraper';
import { parseIcsFile } from './routes/parseIcs';
import { corsOptions } from './constants';

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

// JSON FORMAT
app.use(express.json());

// MIDDLEWARE
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(morgan("combined"));
app.use(compression());
app.use(cors(corsOptions));


app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.get('/scrape', async (req, res) => await scrapeTestPage(req, res));

app.get('/ics', async (req, res) => {
  const test = await parseIcsFile();
  res.send(test);
});
app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
