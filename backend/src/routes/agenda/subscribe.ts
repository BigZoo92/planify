import { Request, Response } from 'express';
import { prisma } from '../../schema/prismaClient';

export const subscribeToAgenda = async (req: Request, res: Response) => {
  try {
    const { agendaId, userId } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const agenda = await prisma.agenda.findUnique({
      where: { id: agendaId },
    });

    if (!agenda || agenda.private) {
      return res.status(404).json({ message: 'Public agenda not found.' });
    }

    await prisma.agendaUser.create({
      data: {
        agendaId: agenda.id,
        userId: user.id,
        role: 'student',
      },
    });

    const events = await prisma.event.findMany({
      where: {
        agendas: {
          some: {
            agendaId: agenda.id,
          },
        },
      },
    });

    for (const event of events) {
      await prisma.eventUser.create({
        data: {
          eventId: event.id,
          userId: user.id,
        },
      });
    }

    res.status(200).json({ message: 'Subscribed to agenda successfully.' });
  } catch (error: any) {
    console.error('Error subscribing to agenda:', error);
    res.status(500).json({ message: 'Error subscribing to agenda' });
  }
};
