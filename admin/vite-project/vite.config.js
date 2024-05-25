//vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dns from 'node:dns'

// Отключить изменение порядка DNS
dns.setDefaultResultOrder('verbatim')

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // или true для прослушивания всех адресов
    port: 5173,
    open: true, // Открывает браузер автоматически при запуске
    proxy: {
      '/api': {
        target: 'https://servicebox35.pp.ru', // Адрес вашего удалённого бэкенда
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    cors: {
      origin: '*', // Разрешает все источники
      credentials: true
    }
  },
  // Корневая директория для административной панели
  root: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'public/index.html'
      }
    }
  }
})