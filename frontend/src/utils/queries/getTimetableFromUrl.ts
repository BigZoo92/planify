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
    try {
        const response = await fetch(
            `${"http://localhost:8000"}/getDataFromCelcat`,
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

        const data: CalendarEvent[] = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Erreur lors de la vérification du like :", error);
        return null;
    }
};
