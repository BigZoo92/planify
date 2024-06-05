import { prisma } from '../../schema/prismaClient';
import { getDataFromCelcat } from '../timetable/getDataFromCelcat';
import { detectEventChanges } from '../../utils/websockets';

export const scrapeAndCompare = async () => {
  const users = await prisma.user.findMany({
    select: { id: true, urls: true },
  });

  for (const user of users) {
    const urlsToScrape = user.urls;

    for (const url of urlsToScrape) {
      // Vérifier si un agenda existe déjà pour cette URL
      let agenda = await prisma.agenda.findFirst({
        where: {
          name: `Agenda for URL: ${url}`,
          users: {
            some: {
              userId: user.id,
            },
          },
        },
      });

      // Créer un agenda seulement s'il n'existe pas déjà
      if (!agenda) {
        agenda = await prisma.agenda.create({
          data: {
            name: `Agenda for URL: ${url}`,
            type: 'PERSONNEL',
            private: true,
            users: {
              create: {
                userId: user.id,
                role: 'owner',
              },
            },
          },
        });
      }

      const newEvents = await getDataFromCelcat(url);
      if (!newEvents) continue;

      for (const newEvent of newEvents) {
        const existingEvent = await prisma.event.findFirst({
          where: {
            summary: newEvent.summary,
            location: newEvent.location,
            start: newEvent.start,
            agendas: {
              some: {
                agendaId: agenda.id,
              },
            },
          },
        });

        if (!existingEvent) {
          const createdEvent = await prisma.event.create({
            data: {
              summary: newEvent.summary,
              location: newEvent.location,
              start: newEvent.start,
              end: newEvent.end,
              data: newEvent.data as any,
            },
          });

          // Associer l'événement à l'agenda créé
          await prisma.eventAgenda.create({
            data: {
              eventId: createdEvent.id,
              agendaId: agenda.id,
            },
          });

          // Associer l'événement à l'utilisateur
          await prisma.eventUser.create({
            data: {
              eventId: createdEvent.id,
              userId: user.id,
            },
          });

          await detectEventChanges(createdEvent);
        } else if (
          existingEvent.summary !== newEvent.summary ||
          existingEvent.location !== newEvent.location ||
          existingEvent.start !== newEvent.start ||
          existingEvent.end !== newEvent.end ||
          JSON.stringify(existingEvent.data) !== JSON.stringify(newEvent.data)
        ) {
          const updatedEvent = await prisma.event.update({
            where: { id: existingEvent.id },
            data: {
              summary: newEvent.summary,
              location: newEvent.location,
              start: newEvent.start,
              end: newEvent.end,
              data: newEvent.data as any,
            },
          });

          // Associer l'événement mis à jour à l'agenda
          await prisma.eventAgenda.upsert({
            where: {
              eventId_agendaId: {
                eventId: updatedEvent.id,
                agendaId: agenda.id,
              },
            },
            update: {},
            create: {
              eventId: updatedEvent.id,
              agendaId: agenda.id,
            },
          });

          // Associer l'événement mis à jour à l'utilisateur
          await prisma.eventUser.upsert({
            where: {
              eventId_userId: {
                eventId: updatedEvent.id,
                userId: user.id,
              },
            },
            update: {},
            create: {
              eventId: updatedEvent.id,
              userId: user.id,
            },
          });

          await detectEventChanges(updatedEvent);
        }
      }
    }
  }
};
