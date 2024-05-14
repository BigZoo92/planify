import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// @ts-ignore
import dotenv from "dotenv";
dotenv.config();

console.log("URL de backend:", process.env.VITE_SERVER_BACKEND_URL);

export default defineConfig({
    plugins: [react()],
});
