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

export const getTimetableFromUrl = async (
    urlToScrape: string
): Promise<CalendarEvent[] | null> => {
    console.log(`${"http://localhost:8000"}/scrape`);
    try {
        const response = await fetch(`${"http://localhost:8000"}/scrape`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ urlToScrape }),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data: CalendarEvent[] = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de la vérification du like :", error);
        return null;
    }
};
