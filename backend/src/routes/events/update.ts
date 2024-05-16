import { Request, Response } from 'express';
import { EventSchema, Event } from '../../schema';
import { prisma } from '../../schema/prismaClient';

interface UpdateEventRequest extends Request {
  body: Event;
  params: {
    id: string;
  };
}

export const update = async (req: UpdateEventRequest, res: Response) => {
  try {
    const { id } = req.params;
    const eventId = parseInt(id, 10);
    const { summary, location, start, end, data, createdAt, updatedAt } =
      EventSchema.parse(req.body);

    const existingEvent = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!existingEvent) {
      return res
        .status(404)
        .json({ message: 'Event with provided ID not found.' });
    }

    const updatedEvent = await prisma.event.update({
      where: { id: eventId },
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

    res.status(200).json({ event: updatedEvent });
  } catch (error: any) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Error updating event' });
  }
};
