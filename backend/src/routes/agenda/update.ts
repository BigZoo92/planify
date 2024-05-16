import { Request, Response } from 'express';
import { AgendaSchema, Agenda } from '../../schema';
import { prisma } from '../../schema/prismaClient';

interface UpdateAgendaRequest extends Request {
  body: Agenda;
  params: {
    id: string;
  };
}

export const update = async (req: UpdateAgendaRequest, res: Response) => {
  try {
    const { id } = req.params;
    const agendaId = parseInt(id, 10); // Convertir en nombre
    const updateData = AgendaSchema.parse(req.body);

    const existingAgenda = await prisma.agenda.findUnique({
      where: { id: agendaId },
    });

    if (!existingAgenda) {
      return res
        .status(404)
        .json({ message: 'Agenda with provided ID not found.' });
    }

    const updatedAgenda = await prisma.agenda.update({
      where: { id: agendaId },
      data: updateData,
    });

    if (req.io) {
      req.io.emit('agenda-updated', updatedAgenda);
    } else {
      console.error('Socket.io instance not available on request');
    }

    res.status(200).json({ agenda: updatedAgenda });
  } catch (error: any) {
    console.error('Error updating agenda:', error);
    res.status(500).json({ message: 'Error updating agenda' });
  }
};
