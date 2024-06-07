import { Event } from '../../schema/';
import { prisma } from '../../schema/prismaClient';
import { sendPushNotification } from './sendPushNotifications';

export const detectEventChanges = async (events: Event[], changeType: 'created' | 'updated' = 'updated') => {
  const eventUsers = await prisma.eventUser.findMany({
    where: { eventId: { in: events.map(event => event.id) } },
    select: { userId: true },
  });

  const eventAgendas = await prisma.eventAgenda.findMany({
    where: { eventId: { in: events.map(event => event.id) } },
    select: { agendaId: true },
  });

  const agendaIds = eventAgendas.map(({ agendaId }) => agendaId);
  const agendaUsers = await prisma.agendaUser.findMany({
    where: { agendaId: { in: agendaIds } },
    select: { userId: true },
  });

  const userIdsSet = new Set<number>();
  eventUsers.forEach(({ userId }) => userIdsSet.add(userId));
  agendaUsers.forEach(({ userId }) => userIdsSet.add(userId));
  const userIds = Array.from(userIdsSet);

  const notificationPromises = userIds.map(async (userId) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { pushToken: true },
    });

    if (user?.pushToken) {
      const message = changeType === 'created'
        ? `New events created: ${events.length} events`
        : `Events updated: ${events.length} events`;

      return sendPushNotification(user.pushToken, message);
    }
  });

  await Promise.all(notificationPromises);
};
