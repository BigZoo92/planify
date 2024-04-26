import z from "zod";

const CalendarEventDataSchema = z.object({
    group: z.string().nullish(),
    notes: z.string().nullish(),
    staff: z.string().nullish(),
    date: z.string().nullish(),
});

export const CalendarEventSchema = z.object({
    summary: z.string(),
    data: CalendarEventDataSchema.nullish(),
    start: z.string(),
    end: z.string().nullish(),
    location: z.string().nullish(),
});

export type CalendarEvent = z.infer<typeof CalendarEventSchema>;

export const getCours = async (
    urlToScrape: string
): Promise<CalendarEvent[] | null> => {
    const backendUrl = import.meta.env.VITE_SERVER_BACKEND_URL;
    console.log(`${backendUrl}/scrape`);
    try {
        const response = await fetch(`${backendUrl}/scrape`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ urlToScrape }),
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données.");
        }

        const data: CalendarEvent[] = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de la vérification du like :", error);
        return null;
    }
};
