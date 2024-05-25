import { Request, Response } from 'express';
import { prisma } from '../../../schema/prismaClient';

export const listPublicAgendas = async (req: Request, res: Response) => {
  try {
    const publicAgendas = await prisma.agenda.findMany({
      where: {
        private: false,
      },
      include: {
        users: true,
        events: true,
      },
    });

    if (publicAgendas.length === 0) {
      return res
        .status(404)
        .json({ message: 'No public agendas found.' });
    }

    res.status(200).json({ publicAgendas });
  } catch (error: any) {
    console.error('Error fetching public agendas:', error);
    res.status(500).json({ message: 'Error fetching public agendas' });
  }
};
