import { Request, Response } from "express";
import { prisma } from "../../schema/prismaClient";

export const remove = async (req: Request<{ id: number }>, res: Response) => {
  try {
    const { id } = req.body; 

    const deletedAgenda = await prisma.agenda.delete({
      where: { id },
      select: { id: true },
    });

    if (!deletedAgenda) {
      return res.status(404).json({ message: "Agenda with provided ID not found." });
    }

    res.status(200).json({ message: "Agenda deleted successfully." });
  } catch (error: any) {
    console.error("Error deleting agenda:", error);
    res.status(500).json({ message: "Error deleting agenda" });
  }
};
