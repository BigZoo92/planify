import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
export async function fonctionNotif() {
  if (Capacitor.platform !== 'web') {
    await PushNotifications.requestPermissions();
    await PushNotifications.register();
    PushNotifications.addListener('registration', 
      (token) => console.log('Push registration success, token: ' + token.value)
    );
    PushNotifications.addListener('registrationError', 
      (error) => console.error('Error on registration: ' + error)
    );
    PushNotifications.addListener('pushNotificationReceived', 
      (notification) => console.log('Push received: ' + JSON.stringify(notification))
    );
    PushNotifications.addListener('pushNotificationActionPerformed', 
      (notification) => console.log('Push action performed: ' + JSON.stringify(notification))
    );
  }
}