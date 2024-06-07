import { Request, Response } from 'express';
import { AgendaSchema } from '../../schema';
import { prisma } from '../../schema/prismaClient';

export const update = async (
  req: Request<{ id: number }, {}>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const updateData = AgendaSchema.parse(req.body);

    const existingAgenda = await prisma.agenda.findUnique({
      where: { id: Number(id) },
    });

    if (!existingAgenda) {
      return res
        .status(404)
        .json({ message: "Agenda avec l'ID fourni non trouvé." });
    }

    const updatedAgenda = await prisma.agenda.update({
      where: { id: Number(id) },
      data: updateData,
    });

    res.status(200).json({ agenda: updatedAgenda });
  } catch (error: any) {
    console.error("Erreur lors de la mise à jour de l'agenda:", error);
    res.status(500).json({
      message: "Erreur lors de la mise à jour de l'agenda",
    });
  }
};
