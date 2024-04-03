import { Capacitor } from '@capacitor/core';
import { PushNotifications, Token, ActionPerformed } from '@capacitor/push-notifications';
export const fonctionNotif = async () => {
  try {
    if (Capacitor.getPlatform() === 'web') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        new Notification('Notification sur le bureau', {
          body: 'Vous avez activé les notifications sur le bureau!',
        });
      } else {
        console.error('Permission de notification de bureau refusée');
      }
    } else {
      const result = await PushNotifications.requestPermissions();
      if (result.receive === 'granted') {
        await PushNotifications.register();
        PushNotifications.addListener('registration', 
          (token: Token) => console.log('Push registration success, token: ' + token.value)
        );
        PushNotifications.addListener('registrationError', 
          (error: any) => console.error('Error on registration: ' + error)
        );
        PushNotifications.addListener('pushNotificationReceived', 
          (notification: any) => console.log('Push received: ' + JSON.stringify(notification))
        );
        PushNotifications.addListener('pushNotificationActionPerformed', 
          (notification: ActionPerformed) => console.log('Push action performed: ' + JSON.stringify(notification))
        );
      } else {
        console.error('Push notification permission not granted');
      }
    }
  } catch (error) {
    console.error('Error occurred: ' + error);
  }
};
export const initNotificationSetup = () => {
  fonctionNotif().catch(error => console.error('Error in notification setup:', error));
};