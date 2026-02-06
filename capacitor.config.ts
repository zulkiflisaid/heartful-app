import type { CapacitorConfig } from '@capacitor/cli';

const isDev = process.env.NODE_ENV !== 'production';

const config: CapacitorConfig = {
  appId: 'com.heartful.app',
  appName: 'Heartful',
  webDir: 'dist',
  server: isDev
    ? {
        url: 'https://32bcb31e-4869-406a-9e03-2978bdd32114.lovableproject.com?forceHideBadge=true',
        cleartext: true,
      }
    : undefined,
};

export default config;
