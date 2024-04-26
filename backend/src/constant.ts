import { CorsOptions } from "cors";
import dotenv from "dotenv";

dotenv.config();

// WHITELIST
export const whitelist = ["http://localhost:3000"];

// CORS
export const corsOptions: CorsOptions = {
  origin: true,
  credentials: true,
};

export const jwtToken = process.env.JWT_SECRET || "jwt_secret_not_found";

export const secret = process.env.SESSION_SECRET || "session_secret_not_found";

export const mail = process.env.MAIL || "mail_not_found";

export const mdp = process.env.MDP_SECRET || "mdp_secret_not_found";
