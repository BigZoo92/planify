
import { prisma } from '../../schema/prismaClient';
import { User } from '../../schema';

export const searchUserByEmail = async (
  email: string,
): Promise<User | null> => {
  try {
      const user = await prisma.user.findFirst({
        where: { email: { equals: email } },
      });
      await prisma.$disconnect();
      //@ts-ignore
      return user;
  } 
  catch (error) {
    console.error(
      "Erreur lors de la recherche d'utilisateur existant :",
      error,
    );
    throw error;
  }
};
