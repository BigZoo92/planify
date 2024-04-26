import { Request, Response } from "express";
import { AgendaSchema, Agenda } from "../../schema";
import { prisma } from "../../schema/prismaClient";

export const create = async (req: Request<{}, {}, Agenda>, res: Response) => {
  try {
    const agendaData = AgendaSchema.parse(req.body);

    const newAgenda = await prisma.agenda.create({
      data: agendaData,
    });

    res.status(201).json({ agenda: newAgenda });
  } catch (error: any) {
    console.error("Error creating agenda:", error);
    res.status(400).json({ message: "Agenda creation failed", errors: error.errors });
  }
};