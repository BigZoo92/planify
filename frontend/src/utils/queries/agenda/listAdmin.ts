export async function listAgendasAdmin(userId: number) {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_SERVER_BACKEND_URL}/agenda/listAdmin`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId }),
            }
        );

        if (!response.ok) {
            if (response.status === 404) {
                console.error("No agendas found for provided user ID.");
                return null;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const agendasResponse = await response.json();
        return agendasResponse.agendas;
    } catch (error) {
        console.error("Error fetching user agendas:", error);
        return null;
    }
}
