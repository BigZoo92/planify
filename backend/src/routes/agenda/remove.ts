import { Request, Response } from 'express';
import { prisma } from '../../schema/prismaClient';

export const remove = async (req: Request<{ id: number }>, res: Response) => {
  try {
    const { id } = req.body;

    await prisma.eventAgenda.deleteMany({
      where: { agendaId: id },
    });

    await prisma.eventUser.deleteMany({
      where: { agendaId: id },
    });

    await prisma.agendaUser.deleteMany({
      where: { agendaId: id },
    });

    const deletedAgenda = await prisma.agenda.delete({
      where: { id },
      select: { id: true },
    });

    if (!deletedAgenda) {
      return res
        .status(404)
        .json({ message: "Agenda avec l'ID fourni non trouvé." });
    }

    res.status(200).json({ message: 'Agenda supprimé avec succès.' });
  } catch (error: any) {
    console.error("Erreur lors de la suppression de l'agenda :", error);
    res.status(500).json({
      message: "Erreur lors de la suppression de l'agenda",
    });
  }
};
