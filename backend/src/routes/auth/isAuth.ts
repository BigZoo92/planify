import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { jwtToken } from '../../constant';
import { prisma } from '../../schema/prismaClient';

export const isAuth = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];
  const { pushToken } = req.body;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, jwtToken) as { userId: number };
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.pushToken && pushToken) {
      await prisma.user.update({
        where: { id: user.id },
        data: { pushToken },
      });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error('JWT Verification Error:', err);
    res.status(401).json({ message: 'Invalid token', error: err });
  }
};
