import { Request, Response } from 'express';
import { prisma } from '../../../schema/prismaClient';

export const list = async (
  req: Request<{ agendaId: number }>,
  res: Response
) => {
  try {
    const { agendaId } = req.body;

    const eventAgendas = await prisma.eventAgenda.findMany({
      where: { agendaId },
    });

    const eventIds = eventAgendas.map((ea) => ea.eventId);

    const events = await prisma.event.findMany({
      where: { id: { in: eventIds } },
    });

    res.status(200).json({ events });
  } catch (error: any) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Error fetching events' });
  }
};
