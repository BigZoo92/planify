import { Request, Response } from 'express';
import { prisma } from '../../schema/prismaClient';

interface GetUserRequest extends Request {
  body: {
    id: string;
  };
}

export const get = async (req: GetUserRequest, res: Response) => {
  try {
    const { id } = req.body;
    const userId = parseInt(id, 10); // Convertir en nombre

    const user = await prisma.user.findUnique({
      where: { id: userId },
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
