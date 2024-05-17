import { Request, Response } from "express";
import { prisma } from "../../schema/prismaClient";

export const getUniversityEvent = async (req: Request<{ id: number }>, res: Response) => {
  try {
    const { id } = req.body; 

    const event = await prisma.event.findUnique({
      where: { id },
    });

    if (!event || !event?.universityDataId) {
      return res.status(404).json({ message: "Event with provided ID not found." });
    }

    const universityData = await prisma.universityEventData.findUnique({
        where: { id: event.universityDataId as number },
      });

    res.status(200).json({ universityData });
  } catch (error: any) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Error fetching event" });
  }
};
