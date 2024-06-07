import { Request, Response } from 'express';
import { prisma } from '../../schema/prismaClient';

export const deleteUrl = async (req: Request, res: Response) => {
  try {
    const { url, userId } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (!user.urls.includes(url)) {
      return res.status(409).json({ message: "URL not found" });
    }

    // Récupérer l'agenda associé à l'URL
    const agenda = await prisma.agenda.findFirst({
      where: {
        name: `Agenda for URL: ${url}`,
        users: {
          some: {
            userId: user.id,
          },
        },
      },
    });

    if (agenda) {
      // Récupérer tous les événements existants pour cet agenda
      const existingEventIds = await prisma.event.findMany({
        where: {
          agendas: {
            some: {
              agendaId: agenda.id,
            },
          },
        },
        select: { id: true },
      }).then(events => events.map(event => event.id));

      // Supprimer les enregistrements dans EventUser pour ces événements
      await prisma.eventUser.deleteMany({
        where: {
          eventId: { in: existingEventIds },
        },
      });

      // Supprimer les enregistrements dans EventAgenda pour ces événements
      await prisma.eventAgenda.deleteMany({
        where: {
          eventId: { in: existingEventIds },
        },
      });

      // Ensuite, supprimer tous les événements existants pour cet agenda
      await prisma.event.deleteMany({
        where: {
          id: { in: existingEventIds },
        },
      });

      // Supprimer l'agenda
      await prisma.agenda.delete({
        where: { id: agenda.id },
      });

      // Supprimer le hash associé à l'URL
      await prisma.urlHash.delete({
        where: {
          userId_url: {
            userId: user.id,
            url: url,
          },
        },
      });
    }

    // Mettre à jour les URLs de l'utilisateur
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        urls: user.urls.filter((u) => u !== url),
      },
    });

    res.status(200).json({ user: updatedUser });
  } catch (error: any) {
    console.error('Error deleting URL:', error);
    res.status(500).json({ message: 'Error deleting URL' });
  }
};
