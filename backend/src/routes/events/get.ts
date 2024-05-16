import { Request, Response } from 'express';
import { prisma } from '../../schema/prismaClient';

interface GetEventRequest extends Request {
  body: {
    id: string;
  };
}

export const get = async (req: GetEventRequest, res: Response) => {
  try {
    const { id } = req.body;
    const eventId = parseInt(id, 10);

    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return res
        .status(404)
        .json({ message: 'Event with provided ID not found.' });
    }

    res.status(200).json({ event });
  } catch (error: any) {
    console.error('Error fetching event:', error);
    res.status(500).json({ message: 'Error fetching event' });
  }
};
