import { Request, Response } from "express";
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis'; 
import { prisma } from "../../schema/prismaClient";
import jwt from "jsonwebtoken";
import { jwtToken } from "../../constant";

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:8000/auth/google/callback' 
);

export const googleAuth = async (req: Request, res: Response) => {
  const { code } = req.query;
  if (!code) {
    return res.status(400).send('Code non fourni.');
  }

  try {
    const { tokens } = await client.getToken(code as string);
    client.setCredentials(tokens);
    const oauth2 = google.oauth2({
      version: 'v2',
      auth: client,
    });
    const { data } = await oauth2.userinfo.get();

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email as string }
    });

    if (!existingUser) {
      const newUser = await prisma.user.create({
        data: {
          email: data.email as string,
          firstName: data.given_name,
          lastName: data.family_name,
        },
      });
      const token = jwt.sign({ userId: newUser.id, email: newUser.email }, jwtToken, { expiresIn: "7d" });
      res.status(201).json({ token, user: newUser });
    } else {
      const token = jwt.sign({ userId: existingUser.id, email: existingUser.email }, jwtToken, { expiresIn: "7d" });
      res.status(200).json({ token, user: existingUser });
    }
  } catch (error) {
    console.error('Erreur lors de l\'échange de code Google :', error);
    res.status(500).send('Erreur d\'authentification avec Google.');
  }
};
