import { defineConfig } from 'vitepress'
import { componentPreview, containerPreview } from '@vitepress-demo-preview/plugin'

export default defineConfig({
  base: '/vitepress-demo-preview',
  title: 'vitepress-demo-preview',
  themeConfig: {
    socialLinks: [{ icon: 'github', link: 'https://github.com/flingyp/vitepress-demo-preview' }]
  },
  description: 'Just playing around.',
  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark'
    },
    lineNumbers: true,
    config(md) {
      md.use(componentPreview)
      md.use(containerPreview)
    }
  }
})
