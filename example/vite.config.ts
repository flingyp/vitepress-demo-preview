import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: true,
    open: false,
    fs: {
      strict: false
    }
  }
})
