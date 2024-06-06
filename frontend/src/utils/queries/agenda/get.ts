export async function getAgenda(id: number) {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_SERVER_BACKEND_URL}/agenda/get`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            }
        );

        if (!response.ok) {
            if (response.status === 404) {
                console.error("Agenda with provided ID not found.");
                return null;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const agendaResponse = await response.json();
        return agendaResponse.agenda;
    } catch (error) {
        console.error("Error fetching agenda:", error);
        return null;
    }
}
