import ical from 'node-ical';
import { promises as fs } from 'fs';
import path from 'path';

interface CalendarEvent {
    summary: string;
    description?: string;
    start: Date;
    end?: Date;
    location?: string;
}

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
                        description: event.description,
                        start: event.start,
                        end: event.end,
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