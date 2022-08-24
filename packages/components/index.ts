import type { App } from 'vue'
import DemoPreview from './DemoPreview.vue'
import { MessageNotice } from './messages/index'

export { DemoPreview, MessageNotice }

const componentName = 'demo-preview'

export default {
  install(app: App) {
    app.component(componentName, DemoPreview)
  }
}
