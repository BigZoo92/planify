import { Request, Response } from 'express';
import { prisma } from '../../schema/prismaClient';

interface RemoveAgendaRequest extends Request {
  body: {
    id: string;
  };
}

export const remove = async (req: RemoveAgendaRequest, res: Response) => {
  try {
    const { id } = req.body;
    const agendaId = parseInt(id, 10);

    const deletedAgenda = await prisma.agenda.delete({
      where: { id: agendaId },
      select: { id: true },
    });

    if (!deletedAgenda) {
      return res
        .status(404)
        .json({ message: 'Agenda with provided ID not found.' });
    }

    if (req.io) {
      req.io.emit('agenda-deleted', deletedAgenda);
    } else {
      console.error('Socket.io instance not available on request');
    }

    res.status(200).json({ message: 'Agenda deleted successfully.' });
  } catch (error: any) {
    console.error('Error deleting agenda:', error);
    res.status(500).json({ message: 'Error deleting agenda' });
  }
};
