import { z } from "zod";
import { EventSchema } from "../../../schema";

export async function createEvent(eventData: z.infer<typeof EventSchema>) {
    const parsedEventData = EventSchema.safeParse(eventData);
    if (!parsedEventData.success) {
        console.error("Validation des données échouée", parsedEventData.error);
        return null;
    }

    try {
        const response = await fetch(
            process.env.SERVER_URL + "/events/create",
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
        console.error("Erreur lors de la création de l’événement:", error);
        return null;
    }
}
