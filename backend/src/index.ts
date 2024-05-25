import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

import helmet from 'helmet';
import http from 'http';
import morgan from 'morgan';
import compression from 'compression';
import cors from 'cors';
import router from './routes';
import { corsOptions } from './constant';
import { Server, Socket } from 'socket.io';

dotenv.config();

export const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8000;

app.use(helmet());
app.use(cors(corsOptions));
app.use(compression());
app.use(morgan('dev'));

app.use(express.json());

export const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

export const userSockets = new Map<number, Socket>();

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('register', (userId: number) => {
    userSockets.set(userId, socket);
  });

  socket.on('disconnect', () => {
    userSockets.forEach((value, key) => {
      if (value === socket) {
        userSockets.delete(key);
      }
    });
    console.log('Client disconnected');
  });
});

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.use('/api', router);

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
