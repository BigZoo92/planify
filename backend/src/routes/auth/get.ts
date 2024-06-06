import { Request, Response } from 'express';
import { prisma } from '../../schema/prismaClient';

export const get = async (
  req: Request<object, object, { id: number }>,
  res: Response
) => {
  try {
    const { id } = req.body;

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(409).json({ message: "User don't found" });
    }

    res.status(201).json({ user });
  } catch (error: any) {
    console.error("Erreur lors de l'inscription :", error);
    res
      .status(400)
      .json({ message: 'Échec de validation', errors: error.errors });
  }
};
