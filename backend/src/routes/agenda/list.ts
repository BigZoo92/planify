import { Request, Response } from "express";
import { prisma } from "../../schema/prismaClient";

export const list = async (req: Request<{ userId: number }>, res: Response) => {
  try {
    const { userId } = req.body;
    const agendas = await prisma.agenda.findMany({
      where: {
        users: {
          some: { userId }
        }
      }
    });

    if (agendas.length === 0) {
      return res.status(404).json({ message: "No agendas found for provided user ID." });
    }

    res.status(200).json({ agendas });
  } catch (error: any) {
    console.error("Error fetching user agendas:", error);
    res.status(500).json({ message: "Error fetching user agendas" });
  }
};
