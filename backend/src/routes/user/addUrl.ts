import { Request, Response } from 'express';
import { prisma } from '../../schema/prismaClient';
import { scrapePage, parseEvents } from '../timetable/getDataFromCelcat';
import { detectEventChanges } from '../../utils/websockets';

export const addUrl = async (req: Request, res: Response) => {
  try {
    const { url, userId } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (user.urls.includes(url)) {
      return res.status(409).json({ message: 'URL already exists' });
    }

    const scrapedPage = await scrapePage(url);
    if (!scrapedPage) {
      return res.status(500).json({ message: 'Failed to scrape the URL' });
    }

    const { dataPage, hash } = scrapedPage;

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

    const newEvents = parseEvents(dataPage);
    const createdEvents = [];

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

      createdEvents.push(createdEvent);
    }

    await detectEventChanges(createdEvents, 'created');

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

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        urls: [...user.urls, url],
      },
    });

    res.status(200).json({ user: updatedUser });
  } catch (error: any) {
    console.error('Error adding URL:', error);
    res.status(500).json({ message: 'Error adding URL' });
  }
};
