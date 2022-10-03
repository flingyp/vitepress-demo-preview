<div align="center">
  <img src="https://s1.328888.xyz/2022/08/24/wDqX7.png" width="100" />
	<h1 style="margin:10px">vitepress-demo-preview</h1>
	<h6 align="center">Demo of Vue SFC components in vitepress</h6>
</div>

## 🎉Introduce

We can see their component display and code example display from some excellent UI component libraries such as `element-plus` and `Ant Design Vue`

This project is based on `vitepress` and `markdown-it` implementation to display components and code examples in documents. Using this plug-in, Vue SFC components can be displayed in static documents

## 🏄‍♂️ Packages

| Package                                                 | Version (click for changelogs)                                                                                      |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| [@vitepress-demo-preview/component](packages/component) | [![component version](https://badgen.net/npm/v/@vitepress-demo-preview/component)](packages/component/CHANGELOG.md) |
| [@vitepress-demo-preview/plugin](packages/plugin)       | [![plugin version](https://badgen.net/npm/v/@vitepress-demo-preview/plugin)](packages/plugin/CHANGELOG.md)          |

## 🔥Installation

```sh
pnpm add @vitepress-demo-preview/component @vitepress-demo-preview/plugin
```

## ⚡Usage

### Preview of Component Form

configure in your vitepress/theme entry file

```ts
import DemoPreview from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.use(DemoPreview)
  }
}
```

configure markdown to add plugin

```ts
import { defineConfig } from 'vitepress'
import { componentPreview } from '@vitepress-demo-preview/plugin'

export default defineConfig({
  markdown: {
    config(md) {
      md.use(componentPreview)
    }
  }
})
```

use in markdown file

```md
<preview path="./xxx/xx.vue" title="title" description="component description content"></preview>
```

### Preview by Container Form

configure in your vitepress/theme entry file

```ts
import { AntDesignContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component('demo-preview', AntDesignContainer)
  }
}
```

configure markdown to add plugin

```ts
import { defineConfig } from 'vitepress'
import { containerPreview } from 'vitepress-demo-preview-plugin'

export default defineConfig({
  markdown: {
    config(md) {
      md.use(containerPreview)
    }
  }
})
```

use in markdown file

```md
:::preview title || component description content

demo-preview=./xxx/xx.vue

:::
```

## 👊 TODO

- [ ] Integration demo component of other UI frameworks
  - [x] Ant Design Container
  - [ ] ElementPlus Container
  - [ ] Naive UI Container
