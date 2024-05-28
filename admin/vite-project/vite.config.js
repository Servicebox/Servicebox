//vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/admin/',  // или '/', если не используется подкаталог
  server: {
    proxy: {
      '/api': {
        target: 'https://servicebox35.pp.ru',
        changeOrigin: true,
        secure: false,  // Если ваш сервер использует самоподписанный сертификат
        rewrite: (path) => path.replace(/^\/api/, '')  // Переписывание пути, если необходимо
      }
    }
  }
})