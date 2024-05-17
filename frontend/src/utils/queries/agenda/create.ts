import { Agenda, AgendaSchema } from "../../../schema";
import { isAuth } from "../auth";

export enum AgendaType {
    ACADEMIC = "ACADEMIC",
}

export enum RoleAgendaAcademic {
    ADMIN = "ADMIN",
    TEACHER = "TEACHER",
    STUDENT = "STUDENT",
}

export interface CreatAgendaProps {
    agendaData: Agenda;
    role: RoleAgendaAcademic;
}

export async function createAgenda(agendaCreateProps: CreatAgendaProps) {
    const user = await isAuth();
    console.log(user);
    if (!user.id) return;
    console.log({ ...agendaCreateProps, userId: user.id });
    try {
        const response = await fetch(
            `${import.meta.env.VITE_SERVER_BACKEND_URL}/agenda/create`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...agendaCreateProps, userId: user.id }),
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
