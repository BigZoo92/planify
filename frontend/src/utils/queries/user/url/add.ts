export async function addUrl(userId: number, url: string) {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_SERVER_BACKEND_URL}/user/addUrl`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, url }),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l’événement:", error);
        return null;
    }
}
