// src/services/eventService.ts
import { z } from "zod";

const IdSchema = z.object({
    id: z.number(),
});

export async function getEventById(eventId: number) {
    const parsedId = IdSchema.safeParse({ id: eventId });
    if (!parsedId.success) {
        console.error("Validation de l'ID échouée", parsedId.error);
        return null;
    }

    try {
        const response = await fetch(
            import.meta.env.VITE_SERVER_BACKEND_URL + "/events/get",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(parsedId.data),
            }
        );

        if (!response.ok) {
            if (response.status === 404) {
                console.error("Événement non trouvé");
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la récupération de l’événement:", error);
        return null;
    }
}
