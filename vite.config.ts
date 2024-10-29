import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
  port: 9000,
  strictPort: true,
 },
   server: {
  port: 8080,
  strictPort: true,
  host: true,
  origin: "http://0.0.0.0:9000",
 },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})