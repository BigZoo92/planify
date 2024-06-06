import { GoogleAuth } from 'google-auth-library';
import * as path from 'path';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const keyFilePath = path.join(__dirname, 'src/assets/planify-93233-30db112190ce.json');

async function getAccessToken() {
  const auth = new GoogleAuth({
    keyFile: keyFilePath,
    scopes: 'https://www.googleapis.com/auth/cloud-platform'
  });

  const client = await auth.getClient();
  const tokenResponse = await client.getAccessToken();
  return tokenResponse.token;
}

async function sendPushNotification(token: string, message: string) {
  const accessToken = await getAccessToken();

  if (!accessToken) {
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
        Authorization: `Bearer ${accessToken}`,
      },
    }
  ).then(response => {
    console.log('Notification sent successfully:', response.data);
  }).catch(error => {
    console.error('Error sending notification:', error.response ? error.response.data : error.message);
  });
}

