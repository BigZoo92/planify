import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import { scrapeTestPage } from './scraper';

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.get('/scrape', async (req, res) => {
  const url = 'https://chronos.iut-velizy.uvsq.fr/EDT/g235272.html';
  const test = await scrapeTestPage(url);
  res.send(test);
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
