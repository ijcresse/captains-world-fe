import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { version } from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `[name].js?v=${version}`,
        chunkFileNames: `[name].js?v=${version}`,
        assetFileNames: `[name].js?v=${version}`
      }
    }
  }
})
