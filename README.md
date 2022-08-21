## 如何使用

- `pnpm add vitepress-component-preview-component`

- `pnpm add vitepress-component-preview-plugin`

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
