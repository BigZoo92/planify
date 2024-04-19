import axios from 'axios';
import { Request, Response } from 'express';
import * as cheerio from 'cheerio';

export async function getDataFromScrape(req: Request, res: Response) {
  const { urlToScrape } = req.body;
  try {
    const { data } = await axios.get(urlToScrape);
    const $ = cheerio.load(data);
    const iframeSrc = $('iframe').attr('src');
  
    if (iframeSrc) {
      const iframeUrl = new URL(iframeSrc, urlToScrape).href;
      const iframeResponse = await axios.get(iframeUrl);
      const iframeContent: string = iframeResponse.data;

      const payload = {
        content: iframeContent,
        type: 'xml'
      };

      const apiPythonURL = 'http://localhost:5000/process-data';
      const pythonApiResponse = await axios.post(apiPythonURL, payload);
      console.info(pythonApiResponse.data)
      const events = pythonApiResponse.data;
      res.send(events);
    } else res.send([]);
  } catch (error) {
    console.error('Erreur lors du scraping ou de l’appel API:', error);
    res.send([]);
  }
}
