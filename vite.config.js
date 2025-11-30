import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Настройка base path для GitHub Pages
  // Если репозиторий называется username.github.io, используйте base: '/'
  // Если репозиторий называется иначе (например, react_kr4), используйте base: '/react_kr4/'
  base: process.env.NODE_ENV === 'production' ? '/react_kr4/' : '/',
})

