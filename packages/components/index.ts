import type {App} from 'vue'
import ComponentPreview from "./ComponentPreview.vue";

export { ComponentPreview };

export default {
    install(app: App) {
        app.component('demo', ComponentPreview)
    }
}

