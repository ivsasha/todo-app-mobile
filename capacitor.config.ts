import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.kkn_iog.lab',
  appName: 'todo-app',
  webDir: 'dist',
  server: {
    androidScheme: "https"
  }
};

export default config;
