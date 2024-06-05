// src/utils/capacitor/notification.ts

import { Capacitor } from "@capacitor/core";
import { PushNotifications } from "@capacitor/push-notifications";
import axios from "axios";
import { requestForToken } from "../../../firebaseConfig";

export const registerPushNotifications = async (userId: number) => {
    const isPushNotificationsAvailable =
        Capacitor.isPluginAvailable("PushNotifications");
    if (!isPushNotificationsAvailable) {
        console.error("PushNotifications plugin is not available");
        return;
    }

    console.log("isAvailable For notification");

    const result = await PushNotifications.requestPermissions();
    if (result.receive !== "granted") {
        console.error("Push notification permission denied");
        return;
    }
    console.log("Push notification permission accepted");
    PushNotifications.register();
    console.log("Push notification is register");
    PushNotifications.addListener("registration", async (token) => {
        console.log("Push registration success, token: " + token.value);
        await axios.post(
            `${import.meta.env.VITE_SERVER_BACKEND_URL}/user/pushToken`,
            {
                userId,
                token: token.value,
            }
        );
    });
    console.log("Push notification's query maked");
    PushNotifications.addListener("registrationError", (error) => {
        console.error("Push registration error: " + error);
    });

    PushNotifications.addListener(
        "pushNotificationReceived",
        (notification) => {
            console.log("Push received: ", notification);
            alert("Notification: " + notification.body);
        }
    );

    PushNotifications.addListener(
        "pushNotificationActionPerformed",
        (notification) => {
            console.log("Push action performed: " + notification);
        }
    );

    // Request the Firebase token for web notifications
    await requestForToken();
};
