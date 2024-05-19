export async function removeAgenda(id: number) {
    try {
        const url = `${import.meta.env.VITE_SERVER_BACKEND_URL}/agenda/remove`;
        console.log("URL de VITE_SERVER_BACKEND_URL :", url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        });

        if (!response.ok) {
            if (response.status === 404) {
                console.error("Agenda avec l'ID fourni non trouvé.");
                return null;
            }
            throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        }

        const data = await response.json();

        return data.message === "Agenda deleted successfully.";
    } catch (error) {
        console.error("Erreur lors de la suppression de l'agenda :", error);
        return false;
    }
}
