import { Request, Response } from 'express';
import * as cheerio from 'cheerio';
import { scraper } from '../../../utils/scrape';

export async function getDataFromCelcat(req: Request, res: Response) {
  const { urlToScrape } = req.body;
  try {
    const { dataPage } = await scraper(urlToScrape);
    if (dataPage) {
      const dateElements: string[] = dataPage.split('<span');
      const dates = dateElements
        .map((el) => {
          const test$ = cheerio.load(el, { xmlMode: true });
          const weekStart = test$('description').text().split('le ')[1];
          const dates = test$('date').map((index, el) => {
            return test$(el).text();
          });
          return { weekStart, dates };
        })
        .filter((e) => !!e.weekStart);
      const eventsPerDaysXml: string[] = dataPage.split('</rawweeks>');
      const events = eventsPerDaysXml
        .flatMap((day) => {
          const day$ = cheerio.load(day, { xmlMode: true });
          const dateId = day$('day').text();
          const weekStart = day$('event').attr('date');
          const date = dateId
            ? dates.find((e) => e.weekStart == weekStart)?.dates[
                parseInt(dateId)
              ]
            : null;
          return [
            {
              data: {
                group:
                  day$('group[title="Groupe"]').find('item').text() ||
                  undefined,
                staff:
                  day$('staff[title="Personnel"]').find('item').text() ||
                  undefined,
                date,
                notes: day$('notes').text() || undefined,
              },
              summary: day$('module[title="Matière"]').find('item').text(),
              location: day$('room[title="Salle"]').find('item').text(),
              start: day$('starttime').text(),
              end: day$('endtime').text(),
            },
          ];
        })
        .filter((e) => e.summary && e.start);

      res.send(events);
    } else res.send([]);
  } catch (error) {
    console.error('Erreur lors du scraping:', error);
    res.send([]);
  }
}
