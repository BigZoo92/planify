import { Request, Response } from 'express';
import { prisma } from '../../schema/prismaClient';

interface RemoveEventRequest extends Request {
  body: {
    id: string;
  };
}

export const remove = async (req: RemoveEventRequest, res: Response) => {
  try {
    const { id } = req.body;
    const eventId = parseInt(id, 10);

    const deletedEvent = await prisma.event.delete({
      where: { id: eventId },
    });

    if (!deletedEvent) {
      return res
        .status(404)
        .json({ message: 'Event with provided ID not found.' });
    }

    res.status(200).json({ message: 'Event deleted successfully.' });
  } catch (error: any) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Error deleting event' });
  }
};
