import type { App } from 'vue'
import DemoPreview from './DemoPreview.vue'

const componentName = 'demo-preview'

export default {
  install(app: App) {
    app.component(componentName, DemoPreview)
  }
}
