import axios from 'axios';
import * as cheerio from 'cheerio';

interface EventDetails {
  group: string | null;
  subject: string | null;
  staff: string | null;
  classroom: string;
  date: string | null;
  notes: string | null;
  starttime: string;
  endtime: string;
}

export async function scrapeTestPage(url: string): Promise<EventDetails[]> {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const iframeSrc = $('iframe').attr('src');

    if (iframeSrc) {
      const iframeUrl = new URL(iframeSrc, url).href;
      console.log(iframeUrl);
      const iframeResponse = await axios.get(iframeUrl);
      const iframeContent: string = iframeResponse.data;
      const eventsPerDaysXml = iframeContent.split('</rawweeks>');

      return eventsPerDaysXml
        .map((day) => {
          const day$ = cheerio.load(day, { xmlMode: true });
          const eventDetails: EventDetails = {
            group: day$('group[title="Groupe"]').find('item').text() || null,
            subject:
              day$('module[title="Matière"]').find('item').text() || null,
            staff: day$('staff[title="Personnel"]').find('item').text() || null,
            classroom: day$('room[title="Salle"]').find('item').text(),
            date: day$('event').attr('date') || null,
            notes: day$('notes').text() || null,
            starttime: day$('starttime').text(),
            endtime: day$('endtime').text(),
          };

          return eventDetails;
        })
        .filter(
          (e) => e.classroom.length !== 0 && e.starttime.length !== 0
        ) as EventDetails[];
    } else return [];
  } catch (error) {
    console.error('Erreur lors du scraping:', error);
    return [];
  }
}
