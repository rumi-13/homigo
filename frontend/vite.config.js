import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // optional: frontend dev server port
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
