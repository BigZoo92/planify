import { Request, Response } from 'express';
import { prisma } from '../../schema/prismaClient';

export const remove = async (req: Request<{ id: number }>, res: Response) => {
  try {
    const { id } = req.body;

    const deletedEvent = await prisma.event.delete({
      where: { id },
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
