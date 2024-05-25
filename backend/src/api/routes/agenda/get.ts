import { Request, Response } from 'express';
import { prisma } from '../../../schema/prismaClient';

export const get = async (req: Request<{ id: number }>, res: Response) => {
  try {
    const { id } = req.body;

    const agenda = await prisma.agenda.findUnique({
      where: { id },
    });

    if (!agenda) {
      return res
        .status(404)
        .json({ message: 'agenda with provided ID not found.' });
    }

    res.status(200).json({ agenda });
  } catch (error: any) {
    console.error('Error fetching agenda:', error);
    res.status(500).json({ message: 'Error fetching agenda' });
  }
};
