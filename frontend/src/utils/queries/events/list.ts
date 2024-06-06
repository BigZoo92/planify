export async function listEvents(agendaId: number) {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_SERVER_BACKEND_URL}/events/list`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ agendaId }),
            }
        );

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
        return [];
    }
}
