export async function listAgendas(userId: number, searchTerm: string) {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_SERVER_BACKEND_URL}/agenda/list`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, searchTerm }),
            }
        );

        if (!response.ok) {
            if (response.status === 404) {
                console.error("No agendas found for provided user ID.");
                return [];
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const agendasResponse = await response.json();
        return agendasResponse.agendas;
    } catch (error) {
        console.error("Error fetching user agendas:", error);
        return [];
    }
}
