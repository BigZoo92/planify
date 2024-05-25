import { Request, Response } from 'express';
import { prisma } from '../../schema/prismaClient';

export const pushToken = async (req: Request, res: Response) => {
  const { userId, token } = req.body;

  await prisma.user.update({
    where: { id: userId },
    data: { pushToken: token },
  });

  res.json({ message: 'Token registered successfully' });
};
