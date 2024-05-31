//vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            console.log('Sending request to:', proxyReq.path);
          });
          proxy.on('proxyRes', (proxyRes) => {
            console.log('Received response from:', proxyRes.req.path);
          });
        }
      }
    }
  }
});