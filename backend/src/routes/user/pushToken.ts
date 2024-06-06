import { Request, Response } from 'express';
import { prisma } from '../../schema/prismaClient';

export const pushToken = async (req: Request, res: Response) => {
  const { userId, token } = req.body;

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { pushToken: token },
    });
    res.status(200).send({ message: 'Push token saved successfully' });
  } catch (error) {
    console.error('Error saving push token:', error);
    res.status(500).send({ message: 'Failed to save push token' });
  }
};
