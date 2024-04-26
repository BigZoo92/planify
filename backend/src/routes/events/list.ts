import { Request, Response } from "express";
import { prisma } from "../../schema/prismaClient";

export const list = async (req: Request<{ agendaId: number }>, res: Response) => {
  try {
    const { agendaId } = req.body;

    const agendaUser = await prisma.eventAgenda.findFirst({
        where: {agendaId}
    })

    const events = await prisma.event.findMany({
      where: { id: agendaUser?.eventId }, 
    });

    if (!events.length) {
      return res.status(404).json({ message: "No events found for provided agenda IDs." });
    }

    res.status(200).json({ events });
  } catch (error: any) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Error fetching events" });
  }
};