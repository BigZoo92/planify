import { initializeApp } from "firebase/app";
import {
    Messaging,
    getMessaging,
    getToken,
    onMessage,
} from "firebase/messaging";

export const firebaseConfig = {
    apiKey: "AIzaSyAvmcgMxtD5kYOgXB3DOtiicN7aEjP4nbM",
    authDomain: "planify-93233.firebaseapp.com",
    projectId: "planify-93233",
    storageBucket: "planify-93233.appspot.com",
    messagingSenderId: "606177745910",
    appId: "1:606177745910:web:07baa509623d90ad4885d7",
    measurementId: "G-RJGG3C8HG8",
};

const app = initializeApp(firebaseConfig);
let messaging: Messaging;
try {
    messaging = getMessaging();
} catch (err) {
    console.error("Failed to initialize Firebase Messaging", err);
}

export const requestForToken = async (): Promise<string | null> => {
    try {
        const currentToken = await getToken(messaging, {
            vapidKey: "BC6kuE1IIZ9odyNjz-jLcbOAoIIOVXE3ExgoXL3d632WmUqamqqKn7jC1PwSWJ3LVH6Ro9CufHpy61lHWYJnsKs",
        });
        if (currentToken) {
            console.log("current token for client: ", currentToken);
            return currentToken;
        } else {
            console.log("No registration token available. Request permission to generate one.");
            return null;
        }
    } catch (err) {
        console.log("An error occurred while retrieving token. ", err);
        return null;
    }
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });
