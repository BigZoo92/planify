import { Request, Response } from 'express';
import { EventSchema, Event } from '../../schema';
import { prisma } from '../../schema/prismaClient';
import { detectEventChanges } from '../../utils/websockets/detectEventChanges';

interface CreateEventProps extends Event {
  agendaId?: number;
  userId?: number;
}

export const create = async (
  req: Request<object, object, CreateEventProps>,
  res: Response
) => {
  try {
    const { agendaId, userId, summary, location, start, end, data } = req.body;

    const newEvent = await prisma.event.create({
      data: {
        summary,
        location,
        start,
        end,
        data: data as any,
      },
    });

    const eventId = newEvent.id;

    if (userId) {
      const newEventUser = await prisma.eventUser.create({
        data: {
          eventId,
          userId,
        },
      });
    }

    if (agendaId) {
      const newEventAgenda = await prisma.eventAgenda.create({
        data: {
          eventId,
          agendaId,
        },
      });
    }

    await detectEventChanges(newEvent);

    res.status(201).json({ event: newEvent });
  } catch (error: any) {
    console.error('Error creating Event:', error);
    res
      .status(400)
      .json({ message: 'Event creation failed', errors: error.errors });
  }
};
