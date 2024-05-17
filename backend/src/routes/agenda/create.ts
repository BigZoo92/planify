import { Request, Response } from "express";
import { AgendaSchema, Agenda } from "../../schema";
import { prisma } from "../../schema/prismaClient";

interface CreateAgenda {
  agendaData: Agenda;
  userId: number;
  role: string;
}

export const create = async (req: Request<{}, {}, CreateAgenda>, res: Response) => {
  try {
    const {agendaData, userId, role} = req.body
    AgendaSchema.parse({...agendaData, id: 1, createdAt: new Date(Date.now()), updatedAt: new Date(Date.now())});
    console.info({agendaData, userId, role})
    const newAgenda = await prisma.agenda.create({
      data: agendaData,
    });

    const newAgendaUser = await prisma.agendaUser.create({
      data: {
        agendaId: newAgenda.id,
        userId,
        role,
      }
    });

    console.info("newAgendaUser : ", newAgendaUser)
    console.info("newAgenda : ", newAgenda)
    res.status(201).json({ agenda: newAgenda });
  } catch (error: any) {
    console.error("Error creating agenda:", error);
    res.status(400).json({ message: "Agenda creation failed", errors: error.errors });
  }
};
