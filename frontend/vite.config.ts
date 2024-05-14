import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
// @ts-ignore
import dotenv from "dotenv";
dotenv.config();

console.log("URL de backend:", process.env.VITE_SERVER_BACKEND_URL);

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    return {
        define: {
            "process.env.SOME_KEY": JSON.stringify(env.SOME_KEY),
        },
        plugins: [react()],
    };
});
