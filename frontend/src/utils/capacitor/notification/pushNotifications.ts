import { Capacitor } from "@capacitor/core";

import { PushNotifications } from "@capacitor/push-notifications";
import axios from "axios";

export const registerPushNotifications = (userId: number) => {
    const isPushNotificationsAvailable =
        Capacitor.isPluginAvailable("PushNotifications");
    if (isPushNotificationsAvailable) {
        console.log("wesh");
        PushNotifications.requestPermissions().then((result) => {
            if (result.receive === "granted") {
                PushNotifications.register();
            } else {
                console.error("Push notification permission denied");
            }
        });

        PushNotifications.addListener("registration", async (token) => {
            console.log("Push registration success, token: " + token.value);

            await axios.post(
                import.meta.env.VITE_SERVER_BACKEND_URL + "/user/pushToken",
                {
                    userId,
                    token: token.value,
                }
            );
        });

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
    }
};
