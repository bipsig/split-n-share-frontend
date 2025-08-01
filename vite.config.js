import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import os from 'os';

function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const iface of Object.values(interfaces)) {
    for (const alias of iface) {
      if (alias.family === 'IPv4' && !alias.internal) {
        return alias.address;
      }
    }
  }
}

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', 
    port: 1907,
    open: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
});
