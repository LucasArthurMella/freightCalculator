import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4200
  },
  preview: {
    port: 4200
  },
  define: {
    VITE_API_PORT: JSON.stringify("3000")
  }

})
