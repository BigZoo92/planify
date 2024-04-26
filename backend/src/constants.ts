import { CorsOptions } from "cors";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// CORS
export const corsOptions: CorsOptions = {
  origin: true,
  credentials: true,
};