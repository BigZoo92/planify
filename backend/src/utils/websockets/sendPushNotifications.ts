import axios from 'axios';
import { GoogleAuth } from 'google-auth-library';

const auth = new GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/cloud-platform']
});

export async function sendPushNotification(token: string, message: string) {
  const client = await auth.getClient();
  const accessToken = await client.getAccessToken();

  if (!accessToken.token) {
    console.error('Failed to obtain access token');
    return;
  }

  await axios.post(
    'https://fcm.googleapis.com/v1/projects/planify-93233/messages:send',
    {
      message: {
        token: token,
        notification: {
          title: 'Event Updated',
          body: message,
        },
        webpush: {
          notification: {
            title: 'Event Updated',
            body: message,
          }
        }
      }
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken.token}`,
      },
    }
  ).then(response => {
    console.log('Notification sent successfully:', response.data);
  }).catch(error => {
    console.error('Error sending notification:', error.response ? error.response.data : error.message);
  });
}
