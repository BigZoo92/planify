import { Request, Response } from "express";
import { AgendaSchema } from "../../schema"; 
import { prisma } from "../../schema/prismaClient";

export const update = async (req: Request<{ id: number }, {}>, res: Response) => {
  try { 
    const updateData = AgendaSchema.parse(req.body); 

    const existingAgenda = await prisma.agenda.findUnique({
      where: { id: updateData.id },
    });

    if (!existingAgenda) {
      return res.status(404).json({ message: "Agenda with provided ID not found." });
    }

    const updatedAgenda = await prisma.agenda.update({
      where: { id: updateData.id },
      data: updateData,
    });

    if (req.io) {
      req.io.emit('agenda-updated', updatedAgenda);
    } else {
      console.error("Socket.io instance not available on request");
    }

    res.status(200).json({ agenda: updatedAgenda });
  } catch (error: any) {
    console.error("Error updating agenda:", error);
    res.status(500).json({ message: "Error updating agenda" });
  }
};
