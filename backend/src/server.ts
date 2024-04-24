import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import { scrapeTestPage } from './scraper';
import session from 'express-session';
import { getGoogleAuthURL, getGoogleUser } from './auth/googleStrategy'; 
import SessionData from './@types/types';
import AppleAuth from 'apple-auth';
import fs from 'fs';
import path from 'path';
import { handleAppleLogin, getAppleLoginUrl } from './auth/appleStrategy';


dotenv.config();


const app: Application = express();
const port = process.env.PORT || 8000;
const appleConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, './appleAuthConfig.json'), 'utf8'));
const appleAuth = new AppleAuth(appleConfig, appleConfig.key_id);


app.get('/auth/apple', (req: Request, res: Response) => {
  const url = getAppleLoginUrl();
  res.redirect(url);
});
app.post('/auth/apple/callback', async (req: Request, res: Response) => {
  try {
    const response = await appleAuth.accessToken(req.body.code);
    const appleUser = await appleAuth.verifyIdToken(response.id_token);
    req.session.user = appleUser; 
    res.redirect('/some-internal-page');
  } catch (error) {
    console.error('Apple login error:', error);
    res.status(500).send('Internal Server Error');
  }
});

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
      console.error('Erreur lors de l\'échange de code Google :', error);
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
