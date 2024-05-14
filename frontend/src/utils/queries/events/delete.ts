// src/services/eventService.ts
import { z } from "zod";

const IdSchema = z.object({
    id: z.number(),
});

export async function deleteEvent(eventId: number) {
    const parsedId = IdSchema.safeParse({ id: eventId });
    if (!parsedId.success) {
        console.error("Validation de l'ID échouée", parsedId.error);
        return null;
    }

    try {
        const response = await fetch(
            `${process.env.SERVER_URL}/events/delete`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(parsedId.data),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la suppression de l’événement:", error);
        return null;
    }
}
