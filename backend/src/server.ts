import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

import session from 'express-session';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cors from 'cors';
import router from './routes';
import { corsOptions } from './constant';

dotenv.config();

export const app = express();
const port = process.env.PORT || 8000;

app.use(helmet());
app.use(cors(corsOptions));
app.use(compression());
app.use(morgan('dev'));

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.use('/api', router)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
