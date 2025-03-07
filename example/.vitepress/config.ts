import { defineConfig } from 'vitepress'
import { componentPreview, containerPreview } from '@vitepress-demo-preview/plugin'
import { resolve } from 'path'

const alias = {
  '@': resolve(__dirname, '../../example')
}

export default defineConfig({
  base: '/vitepress-demo-preview',
  title: 'vitepress-demo-preview',
  themeConfig: {
    socialLinks: [{ icon: 'github', link: 'https://github.com/flingyp/vitepress-demo-preview' }]
    // search: {
    //   provider: 'local'
    // }
  },
  description: 'Just playing around.',
  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark'
    },
    lineNumbers: true,
    config(md) {
      md.use(componentPreview, { clientOnly: true, alias })
      md.use(containerPreview, { clientOnly: true, alias })
    }
  },
  vite: {
    resolve: {
      alias
    }
  }
})
