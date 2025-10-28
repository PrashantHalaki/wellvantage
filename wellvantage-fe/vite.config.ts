import path from 'path'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { load } from 'dotenv-extended'
import tailwindcss from '@tailwindcss/vite'

// Load dotenv-extended to verify environment variables
load({
  errorOnMissing: true,      // throws error if any var from .env.example is missing
  includeProcessEnv: true,   // allows fallback to process.env for CI/CD
  defaults: '.env.defaults', // fallback defaults
  schema: '.env.example'     // optional schema for required vars
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
