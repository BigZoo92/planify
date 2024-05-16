import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cors from 'cors';
import router from './routes';
import { corsOptions } from './constant';
import session from 'express-session';
import { Server as SocketIOServer } from 'socket.io';
import { createServer } from 'http';
import setupWebsocketServer from './socket';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(cors(corsOptions));
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());

const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});

setupWebsocketServer(io);

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: true,
    saveUninitialized: true,
  })
);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.use('/api', router);

server
  .listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  })
  .on('error', (err) => {
    console.error(`Failed to start server: ${err.message}`);
  });
