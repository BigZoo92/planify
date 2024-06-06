import axios from 'axios';
import { GoogleAuth } from 'google-auth-library';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

// Définir le chemin du fichier temporaire
const keyFilePath = path.join(__dirname, 'google-credentials-temp.json');

// Construire le contenu du fichier JSON à partir des variables d'environnement
const serviceAccount = {
  type: "service_account",
  project_id: process.env.GOOGLE_PROJECT_ID,
  private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
  private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),  // Remplacement des \n par des sauts de ligne réels
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  client_id: process.env.GOOGLE_CLIENT_ID,
  auth_uri: process.env.GOOGLE_AUTH_URI,
  token_uri: process.env.GOOGLE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.GOOGLE_CLIENT_CERT_URL
};

// Écrire le contenu dans le fichier temporaire
fs.writeFileSync(keyFilePath, JSON.stringify(serviceAccount));

const auth = new GoogleAuth({
  keyFile: keyFilePath,
  scopes: ['https://www.googleapis.com/auth/cloud-platform']
});

async function getAccessToken() {
  const client = await auth.getClient();
  const tokenResponse = await client.getAccessToken();
  return tokenResponse.token;
}

export async function sendPushNotification(token: string, message: string) {
  try {
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
  } catch (error) {
    console.error('Error obtaining access token:', error);
  }
}
