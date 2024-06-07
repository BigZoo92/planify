export async function listUserSubscribedAgendas(userId: number) {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_SERVER_BACKEND_URL}/agenda/user-subscribed`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.subscribedAgendas;
    } catch (error) {
        console.error('Error fetching subscribed agendas:', error);
        return [];
    }
}
