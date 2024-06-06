import { Event, Agenda } from '../../schema/';
import { prisma } from '../../schema/prismaClient';
import { sendPushNotification } from './sendPushNotifications';

export const detectEventChanges = async (agenda: Agenda) => {
  const agendaUsers = await prisma.agendaUser.findMany({
    where: { agendaId: agenda.id },
    select: { userId: true },
  });

  const userIdsSet = new Set<number>();
  agendaUsers.forEach(({ userId }) => userIdsSet.add(userId));
  const userIds = Array.from(userIdsSet);

  const notificationPromises = userIds.map(async (userId) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { pushToken: true },
    });

    if (user?.pushToken) {
      const message = `L'agenda a été mis à jour. Veuillez vérifier les nouveaux événements.`;

      return sendPushNotification(user.pushToken, message);
    }
  });

  await Promise.all(notificationPromises);
};
