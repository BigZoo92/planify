import { Event } from "../../../schema";

export const getTimetableFromCelcat = async (
    urlToScrape: string
): Promise<Event[] | null> => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_SERVER_BACKEND_URL}/timetable/celcat`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ urlToScrape }),
            }
        );

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data: Event[] = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de la vérification du like :", error);
        return null;
    }
};
