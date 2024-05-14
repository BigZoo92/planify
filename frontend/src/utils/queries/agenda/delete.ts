export async function removeAgenda(id: number) {
    try {
        const response = await fetch(
            `${process.env.SERVER_URL}/agenda/remove`,
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

        const data = await response.json();

        return data.message === "Agenda deleted successfully.";
    } catch (error) {
        console.error("Error deleting agenda:", error);
        return false;
    }
}
