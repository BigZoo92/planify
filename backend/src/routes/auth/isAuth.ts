import { Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import { jwtToken } from '../../constant';
import { prisma } from '../../schema/prismaClient';

export const isAuth = async(req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.error(token)
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, jwtToken) as {userId: number};
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });
    res.status(200).json(user);
  } catch (err) {
    console.error("JWT Verification Error:", err);
    res.status(401).json({ message: "Invalid token", error: err });
  }
};