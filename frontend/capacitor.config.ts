import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
    appId: "com.thecatchies.planify",
    appName: "planify",
    webDir: "dist",
    server: {
        androidScheme: "https",
    },
};

export default config;
