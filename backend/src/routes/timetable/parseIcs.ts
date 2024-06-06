import * as ical from 'ical.js';

type EventData = {
  data: {
    group: string | undefined;
    staff: string | undefined;
    date: string | null | undefined;
    notes: string | undefined;
  };
  summary: string;
  location: string;
  start: string;
  end: string;
};

export function parseIcs(icsContent: string): EventData[] {
  const jcalData = ical.parse(icsContent);
  const vcalendar = new ical.Component(jcalData);
  const events = vcalendar.getAllSubcomponents('vevent');
  const extractedEvents: EventData[] = events.map((event) => {
    const vevent = new ical.Event(event);

    return {
      data: {
        group: vevent.getOrganizer() ? vevent.getOrganizer().cn : undefined,
        staff: vevent
          .getAttendees()
          .map((att) => att.cn)
          .join(', '),
        date: vevent.startDate ? vevent.startDate.toString() : undefined,
        notes: vevent.description,
      },
      summary: vevent.summary,
      location: vevent.location || '',
      start: vevent.startDate.toString(),
      end: vevent.endDate.toString(),
    };
  });

  return extractedEvents;
}

export default parseIcs;
