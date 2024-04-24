import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import { scrapeTestPage } from './scraper';
import session from 'express-session';
import { getGoogleAuthURL, getGoogleUser } from './auth/googleStrategy'; 
import SessionData from './@types/types';
import { Server as SocketIOServer } from 'socket.io';
import { createServer } from 'http';
import { setupWebsocketServer } from './socket';  

dotenv.config();


const app: Application = express();
const port = process.env.PORT || 8000;
const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

setupWebsocketServer(io);

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret', 
  resave: true,
  saveUninitialized: true,
}));


app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.get('/auth/google', (req: Request, res: Response) => {
  const url = getGoogleAuthURL();
  res.redirect(url);
});

app.get('/auth/google/callback', async (req: Request, res: Response) => {
  const { code } = req.query;
  if (code) {
    try {
      const user = await getGoogleUser(code.toString());
      req.session.user = user; 
      res.redirect('/some-internal-page'); 
    } catch (error) {
      res.status(500).send('Erreur d\'authentification avec Google.');
    }
  } else {
    res.status(400).send('Code non fourni.');
  }
});

app.get('/scrape', async (req, res) => {
  const url = 'https://chronos.iut-velizy.uvsq.fr/EDT/g235272.html';
  const test = await scrapeTestPage(url);
  res.send(test);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
