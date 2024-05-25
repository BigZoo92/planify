import axios from 'axios';

export async function sendPushNotification(token: string, message: string) {
  console.info(process.env.FCM_SERVER_KEY);
  await axios.post(
    'https://fcm.googleapis.com/fcm/send',
    {
      to: token,
      notification: {
        title: 'Event Updated',
        body: message,
      },
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `key=${process.env.FCM_SERVER_KEY}`,
      },
    }
  );
}
