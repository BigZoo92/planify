import { z } from "zod";
import { AgendaSchema } from "../../../schema";

export async function updateAgenda(updateData: z.infer<typeof AgendaSchema>) {
    const parsedUpdateData = AgendaSchema.safeParse(updateData);
    if (!parsedUpdateData.success) {
        console.error("Validation des données échouée", parsedUpdateData.error);
        return null;
    }

    try {
        const response = await fetch(
            `${import.meta.env.VITE_SERVER_BACKEND_URL}/agenda/update/${updateData.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(parsedUpdateData.data),
            }
        );

        if (!response.ok) {
            if (response.status === 404) {
                console.error("Agenda avec l'ID fourni non trouvé.");
                return null;
            }
            throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'agenda:", error);
        return null;
    }
}
