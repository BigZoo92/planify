import ical from 'node-ical';
import { promises as fs } from 'fs';
import path from 'path';
import z from 'zod'

const CalendarEventDataSchema = z.object({
    group: z.string().nullish(),
    notes: z.string().nullish(),
    staff: z.string().nullish(),
    date: z.string().nullish(),
});

const CalendarEventSchema = z.object({
    summary: z.string(),
    data: CalendarEventDataSchema.nullish(),
    start: z.string(),
    end: z.string().nullish(),
    location: z.string().nullish(),
});

export type CalendarEvent = z.infer<typeof CalendarEventSchema>

export const parseIcsFile = async(): Promise<CalendarEvent[]> => {
    const filePath = path.join(__dirname, '..', 'assets', 'test.ics');
    try {
        const fileContent = await fs.readFile(filePath, { encoding: 'utf-8' });
        const data = ical.parseICS(fileContent);
        const events: CalendarEvent[] = [];

        for (const k in data) {
            if (data.hasOwnProperty(k)) {
                const event = data[k];
                if (event.type === 'VEVENT') {
                    events.push({
                        summary: event.summary,
                        data: {
                            notes: event.description
                        },
                        start: event.start.toString(),
                        end: event.end.toString(),
                        location: event.location,
                    });
                }
            }
        }

        return events;
    } catch (error) {
        console.error('Error reading or parsing the ICS file:', error);
        throw error;
    }
}