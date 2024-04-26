import { Event } from "../../../schema";

export const getTimetableFromCelcat = async (
    urlToScrape: string
): Promise<Event[] | null> => {
    try {
        const response = await fetch(
            `http://localhost:8000/api/timetable/celcat`,
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
