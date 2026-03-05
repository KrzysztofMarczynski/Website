// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {                     // Proxy dla wszystkich endpointów /api/*
        target: 'http://localhost:8000',  // Twój backend Python (uruchom: uvicorn api.index:app --reload)
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')  // Opcjonalnie, jeśli endpointy są bez /api w Pythonie
      }
    }
  }
});