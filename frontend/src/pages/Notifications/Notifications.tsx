// Dependencies
import React, { useEffect, useState } from "react";

// Utils
import { useUser } from "../../providers/UserProvider";

// Images
import PushNotifications from "../../assets/images/element/push-notifications.svg";

// Styles
import styles from "./Notifications.module.scss";

type Event = {
    id: number;
    title: string;
    description: string;
    date: string;
};

const Notifications: React.FC = () => {
    const { user } = useUser();
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        if (user) {
            fetch(`/api/events?userId=${user.id}`)
                .then((response) => response.json())
                .then((data) => setEvents(data))
                .catch((error) =>
                    console.error("Error fetching events:", error)
                );
        }
    }, [user]);

    return (
        <main className={styles.notificationsWrapper}>
            <h2>Notifications d'événements</h2>
            {events.length === 0 ? (
                <img src={PushNotifications} alt="Push notifications" />
            ) : (
                <ul>
                    {events.map((event) => (
                        <li key={event.id} className={styles.eventNotification}>
                            <h3>{event.title}</h3>
                            <p>{event.description}</p>
                            <p>
                                Date:{" "}
                                {new Date(event.date).toLocaleDateString()}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
};

export default Notifications;
