import DefaultTheme from "vitepress/theme";
import { App } from "vue";
import componentPreview from "vitepress-component-preview-component";
import "vitepress-component-preview-component/dist/style.css";

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.use(componentPreview);
  },
};
