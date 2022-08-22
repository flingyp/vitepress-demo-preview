import type { App } from 'vue'
import DemoPreview from './DemoPreview.vue'

export { DemoPreview }

const componentName = 'demo-preview'

export default {
  install(app: App) {
    app.component(componentName, DemoPreview)
  }
}
