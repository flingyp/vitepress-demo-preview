import { defineConfig } from 'vitepress'
import { transformPreviewComponent } from 'vitepress-demo-preview-plugin'

export default defineConfig({
  title: 'Vitepress-Demo-Component',
  description: 'Just playing around.',
  markdown: {
    theme: 'github-dark',
    lineNumbers: true,
    config(md) {
      md.use(transformPreviewComponent)
    }
  }
})
