import { Request, Response } from 'express';
import { prisma } from '../../schema/prismaClient';

interface GetAgendaRequest extends Request {
  params: {
    id: string;
  };
}

export const get = async (req: GetAgendaRequest, res: Response) => {
  try {
    const { id } = req.params;
    const agendaId = parseInt(id, 10);

    const agenda = await prisma.agenda.findUnique({
      where: { id: agendaId },
    });

    if (!agenda) {
      return res
        .status(404)
        .json({ message: 'Agenda with provided ID not found.' });
    }

    if (req.io) {
      req.io.emit('agenda-get', agenda);
    } else {
      console.error('Socket.io instance not available on request');
    }

    res.status(200).json({ agenda });
  } catch (error: any) {
    console.error('Error fetching agenda:', error);
    res.status(500).json({ message: 'Error fetching agenda' });
  }
};
