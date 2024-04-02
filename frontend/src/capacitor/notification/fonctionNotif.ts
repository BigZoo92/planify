import { LocalNotifications } from '@capacitor/local-notifications';
export async function fonctionNotif() {
  try {
    await LocalNotifications.requestPermissions();
    const notification = await LocalNotifications.schedule({
      notifications: [
        {
          title: "Test Notification",
          body: "This is a test notification.",
          id: new Date().getTime(),
          schedule: { at: new Date(Date.now() + 1000) },
          sound: undefined,
          attachments: undefined,
          actionTypeId: "",
          extra: null
        }
      ]
    });
    console.log('Notification scheduled', notification);
  } catch (e) {
    console.error('Error scheduling notification', e);
  }
}