// public/firebase-messaging-sw.js

importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging.js"
);

firebase.initializeApp({
    apiKey: "AIzaSyAvmcgMxtD5kYOgXB3DOtiicN7aEjP4nbM",
    authDomain: "planify-93233.firebaseapp.com",
    projectId: "planify-93233",
    storageBucket: "planify-93233.appspot.com",
    messagingSenderId: "606177745910",
    appId: "1:606177745910:web:07baa509623d90ad4885d7",
    measurementId: "G-RJGG3C8HG8",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log("Received background message ", payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
