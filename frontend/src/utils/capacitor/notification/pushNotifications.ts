// src/utils/capacitor/notification.ts

import { Capacitor } from "@capacitor/core";
import { PushNotifications } from "@capacitor/push-notifications";
import axios from "axios";
import { requestForToken } from "../../../firebaseConfig";

export const registerPushNotifications = async (
    userId: number
): Promise<string | null> => {
    const isPushNotificationsAvailable =
        Capacitor.isPluginAvailable("PushNotifications");

    if (!isPushNotificationsAvailable) {
        console.error("PushNotifications plugin is not available");
        return null;
    }

    console.log("isAvailable For notification");

    const result = await PushNotifications.requestPermissions();
    if (result.receive !== "granted") {
        console.error("Push notification permission denied");
        return null;
    }

    console.log("Push notification permission accepted");
    PushNotifications.register();
    console.log("Push notification is registered");

    return new Promise((resolve, reject) => {
        PushNotifications.addListener("registration", async (token) => {
            console.log("Push registration success, token: " + token.value);
            try {
                await axios.post(
                    `${import.meta.env.VITE_SERVER_BACKEND_URL}/user/pushToken`,
                    {
                        userId,
                        token: token.value,
                    }
                );
                resolve(token.value);
            } catch (error) {
                console.error("Failed to send push token to backend", error);
                reject(null);
            }
        });

        PushNotifications.addListener("registrationError", (error) => {
            console.error("Push registration error: " + error);
            reject(null);
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
        requestForToken()
            .then((token) => {
                if (token) {
                    resolve(token);
                } else {
                    reject(null);
                }
            })
            .catch((error) => {
                console.error("Error requesting Firebase token:", error);
                reject(null);
            });
    });
};
