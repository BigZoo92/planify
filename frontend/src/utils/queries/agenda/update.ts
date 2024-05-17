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
            `${import.meta.env.VITE_SERVER_BACKEND_URL}/agendas/update`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(parsedUpdateData.data),
            }
        );

        if (!response.ok) {
            if (response.status === 404) {
                console.error("Agenda with provided ID not found.");
                return null;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating agenda:", error);
        return null;
    }
}
