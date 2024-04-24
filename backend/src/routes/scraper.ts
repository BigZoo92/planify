import axios from 'axios';
import * as cheerio from 'cheerio';

export async function scraper(urlToScrape: string) {
    const { data } = await axios.get(urlToScrape);
    const $ = cheerio.load(data);
    const iframeSrc = $('iframe').attr('src');
  
    if (iframeSrc) {
      const iframeUrl = new URL(iframeSrc, urlToScrape).href;
      const iframeResponse = await axios.get(iframeUrl);
      const iframeContent: string = iframeResponse.data;

      return{dataPage: iframeContent, isHTML: false};
    } else return{dataPage: data, isHTML: true};
}
