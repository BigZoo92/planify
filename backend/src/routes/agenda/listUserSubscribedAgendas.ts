import { Request, Response } from 'express';
import { prisma } from '../../schema/prismaClient';

export const listUserSubscribedAgendas = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    const subscribedAgendas = await prisma.agenda.findMany({
      where: {
        users: {
          some: {
            userId,
          },
        },
      },
    });

    res.status(200).json({ subscribedAgendas });
  } catch (error: any) {
    console.error('Error fetching subscribed agendas:', error);
    res.status(500).json({ message: 'Error fetching subscribed agendas' });
  }
};
