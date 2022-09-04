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

### preview by component form

configure in your vitepress/theme entry file

```ts
import DemoPreview from 'vitepress-demo-preview-component'
import 'vitepress-demo-preview-component/dist/style.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.use(demoPreview)
  }
}
```

configure markdown to add plugin

```ts
import { defineConfig } from 'vitepress'
import { componentPreview } from 'vitepress-demo-preview-plugin'

export default defineConfig({
  title: 'Vitepress-Demo-Component',
  description: 'Just playing around.',
  markdown: {
    config(md) {
      md.use(componentPreview)
    }
  }
})
```

### preview by custom container

configure in your vitepress/theme entry file

```ts
import DemoPreview from 'vitepress-demo-preview-component'
import 'vitepress-demo-preview-component/dist/style.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.use(demoPreview)
  }
}
```

configure markdown to add plugin

```ts
import { defineConfig } from 'vitepress'
import { containerPreview } from 'vitepress-demo-preview-plugin'

export default defineConfig({
  title: 'Vitepress-Demo-Component',
  description: 'Just playing around.',
  markdown: {
    config(md) {
      md.use(containerPreview)
    }
  }
})
```

use in markdown file

```md
:::preview Title || component description content

demo-preview=./xxx/xx.vue

:::
```
