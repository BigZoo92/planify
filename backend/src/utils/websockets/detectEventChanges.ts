import { Event } from '../../schema/';
import { prisma } from '../../schema/prismaClient';
import { userSockets } from '../..';
import { sendPushNotification } from './sendPushNotifications';

export const detectEventChanges = async (updatedEvent: Event) => {
  const eventUsers = await prisma.eventUser.findMany({
    where: { eventId: updatedEvent.id },
    select: { userId: true },
  });

  const eventAgendas = await prisma.eventAgenda.findMany({
    where: { eventId: updatedEvent.id },
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

  userIds.forEach((userId) => {
    const userSocket = userSockets.get(userId);
    if (userSocket) {
      userSocket.emit('event-updated', updatedEvent);
    }
  });

  for (const userId of userIds) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { pushToken: true },
    });

    if (user?.pushToken) {
      await sendPushNotification(
        user.pushToken,
        `Event updated: ${updatedEvent.summary}`
      );
    }
  }
};
