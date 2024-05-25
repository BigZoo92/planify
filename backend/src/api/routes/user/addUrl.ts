import { Request, Response } from 'express';
import { prisma } from '../../../schema/prismaClient';

export const addUrl = async (req: Request, res: Response) => {
  try {
    const { url, userId } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (user.urls.includes(url))
      return res.status(409).json({ message: 'Url Already exist' });

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...user,
        urls: [...user.urls, url],
      },
    });

    res.status(200).json({ user: updatedUser });
  } catch (error: any) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Error updating event' });
  }
};
