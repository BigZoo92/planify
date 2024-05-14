import { z } from "zod";
import { AgendaSchema } from "../../../schema";

export async function createAgenda(agendaData: z.infer<typeof AgendaSchema>) {
    const parsedAgendaData = AgendaSchema.safeParse(agendaData);
    if (!parsedAgendaData.success) {
        console.error("Validation des données échouée", parsedAgendaData.error);
        return null;
    }

    try {
        const response = await fetch(
            `${process.env.SERVER_URL}/agenda/create`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(parsedAgendaData.data),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la création de l’agenda:", error);
        return null;
    }
}
