import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [vueJsx()],
  server: {
    host: true,
    open: false,
    fs: {
      strict: false
    }
  }
})
