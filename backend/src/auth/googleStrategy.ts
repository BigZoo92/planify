import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';
import { google } from 'googleapis'; 

dotenv.config();

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:8000/auth/google/callback' 
);

export const getGoogleAuthURL = (): string => {
  const url = client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });
  return url;
};

export const getGoogleUser = async (code: string) => {
  const { tokens } = await client.getToken(code);
  client.setCredentials(tokens);
  const oauth2 = google.oauth2({
    version: 'v2',
    auth: client,
  });
  const { data } = await oauth2.userinfo.get();
  return data;
};
