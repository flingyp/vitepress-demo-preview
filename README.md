## 如何使用

- `pnpm add vitepress-component-preview-component`

- `pnpm add vitepress-component-preview-plugin -D`

1. 注册组件

```ts
import componentPreview, {
  ComponentPreview,
} from "vitepress-component-preview-component";
import "vitepress-component-preview-component/dist/style.css";

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    // app.use(componentPreview);
    app.component("demo", ComponentPreview);
  },
};
```

2. 配置`MarkDown` 插件

```ts
import { defineConfig } from "vitepress";
import { transformPreviewComponent } from "vitepress-component-preview-plugin";

export default defineConfig({
  title: "Vitepress-Demo-Component",
  description: "Just playing around.",
  markdown: {
    config(md) {
      md.use(transformPreviewComponent);
    },
  },
});
```

3. 使用

```md
<preview path="./xxx/xx.vue" title="标题" description="XXXX"></preview>
```
