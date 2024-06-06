import { prisma } from '../../schema/prismaClient';
import { scrapePage, parseEvents } from '../timetable/getDataFromCelcat';
import { detectEventChanges } from '../../utils/websockets';

export const scrapeAndCompare = async () => {
  const users = await prisma.user.findMany({
    select: { id: true, urls: true },
  });

  for (const user of users) {
    for (const url of user.urls) {
      const existingHash = await prisma.urlHash.findUnique({
        where: {
          userId_url: {
            userId: user.id,
            url: url,
          },
        },
      });

      const scrapedPage = await scrapePage(url);
      if (!scrapedPage) continue;

      const { dataPage, hash } = scrapedPage;

      if (!existingHash || existingHash.hash !== hash) {
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

        const newEvents = parseEvents(dataPage);

        for (const newEvent of newEvents) {
          const createdEvent = await prisma.event.create({
            data: {
              summary: newEvent.summary,
              location: newEvent.location,
              start: newEvent.start,
              end: newEvent.end,
              data: newEvent.data as any,
            },
          });

          await prisma.eventAgenda.create({
            data: {
              eventId: createdEvent.id,
              agendaId: agenda.id,
            },
          });

          await prisma.eventUser.create({
            data: {
              eventId: createdEvent.id,
              userId: user.id,
            },
          });

          await detectEventChanges(createdEvent, 'created');
        }

        await prisma.urlHash.upsert({
          where: {
            userId_url: {
              userId: user.id,
              url: url,
            },
          },
          update: {
            hash: hash,
          },
          create: {
            userId: user.id,
            url: url,
            hash: hash,
          },
        });
      }
    }
  }
};
