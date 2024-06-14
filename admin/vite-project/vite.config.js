//vite.config.js
import path from "path";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const __filename = import.meta.url;
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/admin/',
  server: {
    proxy: {
      '/api': {
        target: 'https://servicebox35.pp.ru',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      assets: "/src/assets",
      components: "/src/components",
      mockData: "/src/data",
      features: "/src/features",
      pages: "/src/pages",
      theme: "/src/theme",
      utils: "/src/utils",
    },
  },
});