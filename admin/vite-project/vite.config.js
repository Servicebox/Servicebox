//vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/admin/',
  server: {
    proxy: {
      '/': {
        target: 'https://servicebox35.pp.ru',
        changeOrigin: true,
        secure: false, 
        rewrite: (path) => path.replace(/^\/api/, '')  
      }
    }
  }
})