import axios from 'axios';
import { Request, Response } from 'express';
import { extractPrompt } from '../constants';
import { scrapeTestPage } from './scraper';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from "dotenv";

dotenv.config();

// GoogleGenerativeAI required config
const configuration = new GoogleGenerativeAI(process.env.API_KEY || "API_KEY");

// Model initialization
const modelId = "gemini-pro";
const model = configuration.getGenerativeModel({ model: modelId });

interface RequestBody {
  prompt: string;
  temperature?: number; // Optional parameter to control creativity
}

export async function getDataFromTimetableWithAi(req: Request, res: Response) {
    try {
        const { urlToScrape } = req.body;
    const { dataPage, isHTML } = await scrapeTestPage(urlToScrape);
    const prompt = extractPrompt(dataPage, isHTML);

    const requestBody: RequestBody = {
        prompt,
    };

    const chat = model.startChat({})
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const responseText = response.text();;
    console.log(responseText);
    res.send({ responseText });
    } catch (error) {
        console.error('Error making POST request:', error);
        res.status(500).send('Internal Server Error');
    }
}
