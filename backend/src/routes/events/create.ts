import { Request, Response } from "express";
import { EventSchema, Event } from "../../schema";
import { prisma } from "../../schema/prismaClient";

export const create = async (req: Request<{}, {}, Event>, res: Response) => {
  try {
    const {
        id,
        summary,
        location,
        start,
        end,
        data,
        createdAt,
        updatedAt,
    } = EventSchema.parse(req.body);

    const newEvent = await prisma.event.create({
        data: {
            id,
            summary,
            location,
            start,
            end,
            data: data as any,
            createdAt,
            updatedAt,
        },
      });

    res.status(201).json({ event: newEvent });
  } catch (error: any) {
    console.error("Error creating Event:", error);
    res.status(400).json({ message: "Event creation failed", errors: error.errors });
  }
};
