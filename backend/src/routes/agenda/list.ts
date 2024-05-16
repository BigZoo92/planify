import { Request, Response } from 'express';
import { prisma } from '../../schema/prismaClient';

interface ListAgendaRequest extends Request {
  body: {
    userId: string;
  };
}

export const list = async (req: ListAgendaRequest, res: Response) => {
  try {
    const { userId } = req.body;
    const parsedUserId = parseInt(userId, 10);

    const agendas = await prisma.agenda.findMany({
      where: {
        users: {
          some: { userId: parsedUserId },
        },
      },
    });

    if (agendas.length === 0) {
      return res
        .status(404)
        .json({ message: 'No agendas found for provided user ID.' });
    }

    if (req.io) {
      req.io.emit('agenda-list', { userId: parsedUserId, agendas });
    } else {
      console.error('Socket.io instance not available on request');
    }

    res.status(200).json({ agendas });
  } catch (error: any) {
    console.error('Error fetching user agendas:', error);
    res.status(500).json({ message: 'Error fetching user agendas' });
  }
};
