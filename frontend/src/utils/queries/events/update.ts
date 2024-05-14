import { z } from "zod";
import { EventSchema } from "../../../schema";

export async function updateEvent(
    eventId: number,
    eventData: z.infer<typeof EventSchema>
) {
    const completeEventData = { ...eventData, id: eventId };
    const parsedEventData = EventSchema.safeParse(completeEventData);
    if (!parsedEventData.success) {
        console.error("Validation des données échouée", parsedEventData.error);
        return null;
    }

    try {
        const response = await fetch(
            `${process.env.SERVER_URL}/events/update`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(parsedEventData.data),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l’événement:", error);
        return null;
    }
}
