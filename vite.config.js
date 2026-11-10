import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const allowedHosts = [
  'novadevelopment.bd',
  'www.novadevelopment.bd',
  'novadevelopment.ae',
  'www.novadevelopment.ae',
  'novadevelopment.us',
  'www.novadevelopment.us',
  'novadevelopment.uk',
  'www.novadevelopment.uk',
]

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    host: '127.0.0.1',
    port: 3001,
    strictPort: true,
    allowedHosts,
  },

  preview: {
    host: '127.0.0.1',
    port: 3001,
    strictPort: true,
    allowedHosts,
  },
})