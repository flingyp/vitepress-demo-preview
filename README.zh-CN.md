<div align="center">
	<h1 style="margin:10px">vitepress-demo-preview</h1>
	<h6 align="center">在 vitepress 中预览 Vue SFC 组件</h6>
</div>

[English](./README.md) | 简体中文

## 🎉 简介

我们可以看到一些优秀的 UI 组件库如 `element-plus` 和 `Ant Design Vue` 中组件展示和代码示例展示

本项目基于 `vitepress` 和 `markdown-it` 实现在文档中展示组件和代码示例。使用此插件，可以在静态文档中展示 Vue SFC 组件

## 🏄‍♂️ 包

| 包                                                      | 版本 (点击查看更新日志)                                                                                             |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| [@vitepress-demo-preview/component](packages/component) | [![component version](https://badgen.net/npm/v/@vitepress-demo-preview/component)](packages/component/CHANGELOG.md) |
| [@vitepress-demo-preview/plugin](packages/plugin)       | [![plugin version](https://badgen.net/npm/v/@vitepress-demo-preview/plugin)](packages/plugin/CHANGELOG.md)          |

## ⚙️ 安装

```sh
pnpm add @vitepress-demo-preview/component @vitepress-demo-preview/plugin
```

## ⚡ 使用

在 vitepress/theme 入口文件中配置

```ts
import DefaultTheme from 'vitepress/theme';
import {
  AntDesignContainer,
  ElementPlusContainer,
  NaiveUIContainer,
} from '@vitepress-demo-preview/component';
import '@vitepress-demo-preview/component/dist/style.css';

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component('demo-preview', AntDesignContainer);
  },
};
```

配置 markdown 以添加插件

```ts
import { defineConfig } from 'vitepress';
import {
  containerPreview,
  componentPreview,
} from '@vitepress-demo-preview/plugin';

export default defineConfig({
  markdown: {
    config(md) {
      md.use(containerPreview);
      md.use(componentPreview);
    },
  },
});
```

### SSR 兼容性

如果组件不支持 SSR，可以指定 clientOnly 以禁用 SSR。

```ts
import { defineConfig } from 'vitepress';
import {
  containerPreview,
  componentPreview,
} from '@vitepress-demo-preview/plugin';

export default defineConfig({
  markdown: {
    config(md) {
      /**
       * SSR 兼容性
       * @link https://vitepress.dev/guide/ssr-compat
       * 如果组件不支持 SSR，可以指定 clientOnly 以禁用 SSR。
       */
      md.use(containerPreview, { clientOnly: true });
      md.use(componentPreview, { clientOnly: true });
    },
  },
});
```

### 别名配置

如果需要使用别名路径，可以在 vitepress 配置文件中配置别名。

```ts
import { defineConfig } from 'vitepress';
import { resolve } from 'path';

const alias = {
  '@': resolve(__dirname, '../../example'),
};

export default defineConfig({
  // ...
  markdown: {
    config(md) {
      md.use(componentPreview, { alias });
      md.use(containerPreview, { alias });
    },
  },
  vite: {
    resolve: {
      alias,
    },
  },
});
```

### 组件形式预览

```md
<!-- 提示：支持闭合标签 -->

<preview path="./xxx/xx.vue"></preview>

<preview path="./xxx/xx.vue" title="标题"></preview>

<preview path="./xxx/xx.vue" title="标题" description="组件描述内容"></preview>
```

### 容器形式预览

```md
:::preview

demo-preview=./xxx/xx.vue

:::

:::preview 标题

demo-preview=./xxx/xx.vue

:::

:::preview 标题 || 组件描述内容

demo-preview=./xxx/xx.vue

:::
```

## 🔧 配置

你可以通过 `defineClientComponentConfig` 函数自定义组件行为。

```ts
// .vitepress/theme/index.ts
import { defineClientComponentConfig } from '@vitepress-demo-preview/core';

// 定义自定义配置
defineClientComponentConfig({
  copySuccessText: '代码已复制到剪贴板！',
});
```

### 可用配置选项

| 选项              | 类型     | 默认值       | 描述                     |
| ----------------- | -------- | ------------ | ------------------------ |
| `copySuccessText` | `string` | `'复制成功'` | 代码成功复制时显示的文本 |

## 📦 包

### `@vitepress-demo-preview/plugin`

`@vitepress-demo-preview/plugin` 是一个 markdown-it 插件，主要提供两种组件预览方式，分别是**组件形式**和**容器形式**。

### `@vitepress-demo-preview/component`

`@vitepress-demo-preview/component` 是一个组件库，提供演示组件。它主要提供三种容器：**Ant Design Container**、**ElementPlus Container** 和 **Naive UI Container**，它们模仿与每个 UI 框架组件的预览相关的样式。

当然，我们也会考虑为其他组件库提供类似的组件容器。

**提示：** `@vitepress-demo-preview/component` 不是必需的。你也可以考虑只使用 `@vitepress-demo-preview/plugin`，它们互不绑定。你可以根据自己的偏好和需求实现自己的组件容器。有关详细信息，请参考上述三个容器的源代码。

## 📑 许可证

[MIT](https://github.com/flingyp/vitepress-demo-preview/blob/main/LICENSE)

Copyright (c) 2023 flingyp
