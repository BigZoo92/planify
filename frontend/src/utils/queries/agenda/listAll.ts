export async function listPublicAgendas() {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_SERVER_BACKEND_URL}/agenda/public`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            if (response.status === 404) {
                console.error("No public agendas found.");
                return [];
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const publicAgendasResponse = await response.json();
        return publicAgendasResponse.publicAgendas;
    } catch (error) {
        console.error("Error fetching public agendas:", error);
        return [];
    }
}
