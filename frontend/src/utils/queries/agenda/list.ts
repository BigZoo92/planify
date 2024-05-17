export async function listAgendas(userId: number) {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_SERVER_BACKEND_URL}/agenda/list`,
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

        return await response.json();
    } catch (error) {
        console.error("Error fetching user agendas:", error);
        return null;
    }
}
