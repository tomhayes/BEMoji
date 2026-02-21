import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import bemoji from 'vite-plugin-bemoji';

export default defineConfig({
  plugins: [
    react(),
    bemoji({
      config: '../../bemoji.config.js',
    }),
  ],
});
