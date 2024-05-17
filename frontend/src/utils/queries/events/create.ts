import { Event } from "../../../schema";

interface CreateEventProps extends Event {
    agendaId?: number;
    userId?: number;
}

export async function createEvent(eventData: CreateEventProps) {
    console.log(eventData);
    try {
        const response = await fetch(
            import.meta.env.VITE_SERVER_BACKEND_URL + "/events/create",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(eventData),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la création de l’événement:", error);
        return null;
    }
}
