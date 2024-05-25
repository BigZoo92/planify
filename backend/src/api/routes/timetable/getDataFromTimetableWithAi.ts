import { Request, Response } from 'express';
import { scraper } from '../../utils/scrape';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

export async function getDataFromTimetableWithAi(req: Request, res: Response) {
  try {
    const { urlToScrape } = req.body;
    const { dataPage } = await scraper(urlToScrape);
    const url = 'http://127.0.0.1:5000/predict';
    const data = {
      text: dataPage,
    };
    const response = await axios.post(url, data);
    console.log(response.data);
    res.send({ data: response.data });
  } catch (error) {
    console.error('Error making POST request:', error);
    res.status(500).send('Internal Server Error');
  }
}
