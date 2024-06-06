import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cron from 'node-cron';
import helmet from 'helmet';
import http from 'http';
import morgan from 'morgan';
import compression from 'compression';
import cors from 'cors';
import router from './routes/router';
import { corsOptions } from './constant';
import { scrapeAndCompare } from './routes/user/scraping';

dotenv.config();

export const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8000;

app.use(helmet());
app.use(cors(corsOptions));
app.use(compression());
app.use(morgan('dev'));

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.use('/api', router);

// Planifie le scraping toutes les 5 minutes
cron.schedule('* * * * *', () => {
  console.log('Démarrage du scraping...');
  scrapeAndCompare().catch(console.error);
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
