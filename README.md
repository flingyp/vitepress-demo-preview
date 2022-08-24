<div align="center">
  <img src="https://s1.328888.xyz/2022/08/24/wDqX7.png" width="100" />
	<h1 style="margin:10px">vitepress-demo-preview</h1>
	<h6 align="center">Quickly add vue demo examples and source code display in your vitepress</h6>
</div>

## 🎉Introduce

[vitepress-demo-preview](https://github.com/flingyp/vitepress-demo-preview) consists of two packages. Use it to easily write Vue examples in vitepress

[vitepress-component-preview-component](https://www.npmjs.com/package/vitepress-demo-preview-component) for example preview and related example information and code presentation

[vitepress-component-preview-plugin](https://www.npmjs.com/package/vitepress-component-preview-plugin) is a markdown-it plugin used in the vitepress configuration file

## 🔥Installation

```sh
pnpm add vitepress-demo-preview-component -D
```

```sh
pnpm add vitepress-demo-preview-plugin -D
```

## ⚡Usage

configure in your vitepress/theme entry file

```ts
import demoPreview, { DemoPreview } from 'vitepress-demo-preview-component'
import 'vitepress-demo-preview-component/dist/style.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    // 第一种方式
    app.use(componentPreview)
    // 第二种方式
    app.component('demo-preview', DemoPreview)
  }
}
```

configure markdown to add plugin

```ts
import { defineConfig } from 'vitepress'
import { transformPreviewComponent } from 'vitepress-demo-preview-plugin'

export default defineConfig({
  title: 'Vitepress-Demo-Component',
  description: 'Just playing around.',
  markdown: {
    config(md) {
      md.use(transformPreviewComponent)
    }
  }
})
```

use in markdown file

```html
<demo-preview path="./xxx/xx.vue" title="标题" description="描述内容"></demo-preview>
```
