import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'planify.com',
  appName: 'planify',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
