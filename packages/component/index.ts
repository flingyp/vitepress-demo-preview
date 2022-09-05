import type { App } from 'vue'
import DemoPreview from './demo-preview.vue'

const COMPONENT_NAME = 'demo-preview'

export default {
  install(app: App) {
    app.component(COMPONENT_NAME, DemoPreview)
  }
}
