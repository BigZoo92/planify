import AppleAuth from 'apple-auth';
import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';

const appleConfigFilePath = path.resolve(__dirname, '..', 'config', 'appleAuthConfig.json');
const appleConfig = JSON.parse(fs.readFileSync(appleConfigFilePath, 'utf8'));
const applePrivateKey = fs.readFileSync(path.resolve(__dirname, '..', 'config', 'apple_private_key.p8')).toString();
const appleAuth = new AppleAuth(appleConfig, applePrivateKey, 'text');

export async function handleAppleLogin(req: Request, res: Response) {
  try {
    const response = await appleAuth.accessToken(req.body.code);
    const idToken = response.id_token;
    //@ts-ignore
    const appleUser = await appleAuth.verifyIdToken(idToken, undefined, 'HS256');
    req.session.user = appleUser;
    res.redirect('/some-internal-page');
  } catch (error) {
    console.error('Apple login error:', error);
    res.status(500).send('Internal Server Error');
  }
}

export function getAppleLoginUrl() {
  return appleAuth.loginURL();
}
