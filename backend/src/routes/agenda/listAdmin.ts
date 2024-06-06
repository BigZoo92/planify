import { Request, Response } from 'express';
import { prisma } from '../../schema/prismaClient';

export const listAdmin = async (
  req: Request<{ userId: number }>,
  res: Response
) => {
  try {
    const { userId } = req.body;

    const adminAgendasUser = await prisma.agendaUser.findMany({
      where: {
        userId,
        role: 'ADMIN',
      },
      select: {
        agendaId: true,
      },
    });

    const adminAgendaIds = adminAgendasUser.map((au) => au.agendaId);

    const agendas = await prisma.agenda.findMany({
      where: {
        id: {
          in: adminAgendaIds,
        },
      },
    });

    res.status(200).json({ agendas });
  } catch (error: any) {
    console.error('Error fetching user agendas:', error);
    res.status(500).json({ message: 'Error fetching user agendas' });
  }
};
