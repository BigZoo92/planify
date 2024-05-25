import { Request, Response } from 'express';
import { hashPassword } from '../../utils/password';
import { prisma } from '../../schema/prismaClient';
import { z } from 'zod';

const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

type SignupSchemaType = z.infer<typeof SignupSchema>;

export const signup = async (
  req: Request<{}, {}, SignupSchemaType>,
  res: Response
) => {
  try {
    const { email, password, firstName, lastName } = SignupSchema.parse(
      req.body
    );

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: 'Un utilisateur avec cet email existe déjà.' });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });

    res.status(201).json({ user: newUser });
  } catch (error: any) {
    console.error("Erreur lors de l'inscription :", error);
    res
      .status(400)
      .json({ message: 'Échec de validation', errors: error.errors });
  }
};
