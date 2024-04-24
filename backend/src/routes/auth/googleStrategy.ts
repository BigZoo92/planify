import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { google } from 'googleapis'; 

dotenv.config();

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:8000/auth/google/callback' 
);

export const getGoogleAuthURL = (req: Request, res: Response) => {
  const url = client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });
  res.redirect(url)
};

export const getGoogleUser = async (req: Request, res: Response) => {
  const { code } = req.query;
  if (code) {
    try {
  const { tokens } = await client.getToken(code as string);
  client.setCredentials(tokens);
  const oauth2 = google.oauth2({
    version: 'v2',
    auth: client,
  });
  const { data } = await oauth2.userinfo.get();
  return data
}
  catch (error) {
    console.error('Erreur lors de l\'échange de code Google :', error);
    res.status(500).send('Erreur d\'authentification avec Google.');
  }
} else {
  res.status(400).send('Code non fourni.');
}
};
