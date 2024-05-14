// src/services/eventService.ts
import { z } from "zod";

const AgendaIdSchema = z.object({
    agendaId: z.number(),
});

export async function listEvents(agendaId: number) {
    const parsedAgendaId = AgendaIdSchema.safeParse({ agendaId });
    if (!parsedAgendaId.success) {
        console.error("Validation de l'agendaId échouée", parsedAgendaId.error);
        return null;
    }

    try {
        const response = await fetch(`${process.env.SERVER_URL}/events/list`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(parsedAgendaId.data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (!data.events.length) {
            console.log("Aucun événement trouvé pour cet agenda.");
            return [];
        }

        return data.events;
    } catch (error) {
        console.error("Erreur lors de la récupération des événements:", error);
        return null;
    }
}
