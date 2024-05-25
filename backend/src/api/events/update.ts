import { Request, Response } from 'express';
import { EventSchema, Event } from '../../schema';
import { prisma } from '../../schema/prismaClient';
import { userSockets } from '../../index.ts';
import { detectEventChanges } from '../../utils/websockets';

export const update = async (
  req: Request<{ id: number }, {}, Event>,
  res: Response
) => {
  try {
    const { id } = req.body;
    const { summary, location, start, end, data, createdAt, updatedAt } =
      EventSchema.parse(req.body);

    const existingEvent = await prisma.event.findUnique({
      where: { id },
    });

    if (!existingEvent) {
      return res
        .status(404)
        .json({ message: 'Event with provided ID not found.' });
    }

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        summary,
        location,
        start,
        end,
        data: data as any,
        createdAt,
        updatedAt,
      },
    });

    await detectEventChanges(updatedEvent);

    res.status(200).json({ event: updatedEvent });
  } catch (error: any) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Error updating event' });
  }
};
