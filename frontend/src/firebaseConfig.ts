// src/firebaseConfig.ts

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

export const firebaseConfig = {
    apiKey: "AIzaSyAvmcgMxtD5kYOgXB3DOtiicN7aEjP4nbM",
    authDomain: "planify-93233.firebaseapp.com",
    projectId: "planify-93233",
    storageBucket: "planify-93233.appspot.com",
    messagingSenderId: "606177745910",
    appId: "1:606177745910:web:07baa509623d90ad4885d7",
    measurementId: "G-RJGG3C8HG8"
  };

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestForToken = async () => {
  try {
    const currentToken = await getToken(messaging, { vapidKey: 'your-public-vapid-key' });
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      // Perform any other necessary operations like saving the token to the database
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  } catch (err) {
    console.log('An error occurred while retrieving token. ', err);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
