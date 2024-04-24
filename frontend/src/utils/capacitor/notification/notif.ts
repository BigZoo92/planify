import { Capacitor } from '@capacitor/core';
import {
  PushNotifications,
  ActionPerformed,
} from '@capacitor/push-notifications';
export const notif = async (title: string, message: string) => {
  try {
    if (Capacitor.getPlatform() === 'web') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        new Notification(title, {
          body: message,
        });
      } else {
        console.error('Permission de notification de bureau refusée');
      }
    } else {
      const result = await PushNotifications.requestPermissions();
      if (result.receive === 'granted') {
        await PushNotifications.register();
        PushNotifications.addListener('registration', (token) =>
          console.log('Push registration success, token: ' + token.value)
        );
        PushNotifications.addListener('registrationError', (error) =>
          console.error('Error on registration: ' + error)
        );
        PushNotifications.addListener(
          'pushNotificationReceived',
          (notification) =>
            console.log('Push received: ' + JSON.stringify(notification))
        );
        PushNotifications.addListener(
          'pushNotificationActionPerformed',
          (notification: ActionPerformed) =>
            console.log(
              'Push action performed: ' + JSON.stringify(notification)
            )
        );
      } else {
        console.error('Push notification permission not granted');
      }
    }
  } catch (error) {
    console.error('Error occurred: ' + error);
  }
};
// faire avec firebase, voir avec Noé
