import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
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
        plugins: [react(), tsconfigPaths()],
        build: {
            outDir: "dist",
            emptyOutDir: true,
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes("node_modules")) {
                            return id
                                .toString()
                                .split("node_modules/")[1]
                                .split("/")[0]
                                .toString();
                        }
                    },
                },
            },
        },
        resolve: {
            alias: {
                "@": "/src",
            },
        },
    };
});
