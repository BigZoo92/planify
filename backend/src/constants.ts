import { CorsOptions } from "cors";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// CORS
export const corsOptions: CorsOptions = {
  origin: true,
  credentials: true,
};

export const extractPrompt = (timetablePage: string, isHTML: boolean): string => {
  return `
  Utilisant l'${isHTML ? "HTML" : "XML"} fourni, qui représente un emploi du temps, extrais les événements selon les directives suivantes. Chaque événement doit être conformé à l'interface TypeScript 'CalendarEventOutputSchema'. Retourne uniquement les données extraites sans aucune information supplémentaire ou commentaire. Voici l'interface typescript avec Zod :' :
  
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

  const CalendarEventOutputSchema = z.array(CalendarEventSchema)

  Voici le ${isHTML ? "HTML": "XML"} à traiter :

  ${timetablePage}
  `
}