<div align="center">
	<h1 style="margin:10px">vitepress-demo-preview</h1>
	<h6 align="center">Demo of Vue SFC components in vitepress</h6>
</div>

[简体中文](./README.zh-CN.md)

## 🎉 Introduce

We can see their component display and code example display from some excellent UI component libraries such as `element-plus` and `Ant Design Vue`

This project is based on `vitepress` and `markdown-it` implementation to display components and code examples in documents. Using this plug-in, Vue SFC components can be displayed in static documents

## 🏄‍♂️ Packages

| Package                                                 | Version (click for changelogs)                                                                                      |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| [@vitepress-demo-preview/component](packages/component) | [![component version](https://badgen.net/npm/v/@vitepress-demo-preview/component)](packages/component/CHANGELOG.md) |
| [@vitepress-demo-preview/plugin](packages/plugin)       | [![plugin version](https://badgen.net/npm/v/@vitepress-demo-preview/plugin)](packages/plugin/CHANGELOG.md)          |
| [@vitepress-demo-preview/core](packages/core)           | [![core version](https://badgen.net/npm/v/@vitepress-demo-preview/core)](packages/core/CHANGELOG.md)                |

## ⚙️ Installation

```sh
pnpm add @vitepress-demo-preview/component @vitepress-demo-preview/plugin
```

## ⚡ Usage

configure in your vitepress/theme entry file

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

configure markdown to add plugin

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

### SSR Compatibility

If the components are not SSR-friendly, you can specify the clientOnly to disable SSR.

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
       * SSR Compatibility
       * @link https://vitepress.dev/guide/ssr-compat
       * If the components are not SSR-friendly, you can specify the clientOnly to disable SSR.
       */
      md.use(containerPreview, { clientOnly: true });
      md.use(componentPreview, { clientOnly: true });
    },
  },
});
```

### Alias Configuration

If you need to use alias paths, you can configure the alias in the vitepress configuration file.

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

### Preview of Component Form

```md
<!-- Tip: Support for closed tags -->

<preview path="./xxx/xx.vue"></preview>

<preview path="./xxx/xx.vue" title="title"></preview>

<preview path="./xxx/xx.vue" title="title" description="component description content"></preview>
```

### Preview by Container Form

```md
:::preview

demo-preview=./xxx/xx.vue

:::

:::preview title

demo-preview=./xxx/xx.vue

:::

:::preview title || component description content

demo-preview=./xxx/xx.vue

:::
```

## 🔧 Configuration

You can customize component behaviors through the `defineClientComponentConfig` function.

### Basic Configuration

```ts
// .vitepress/theme/index.ts
import { defineClientComponentConfig } from '@vitepress-demo-preview/core';

// Define custom configuration
defineClientComponentConfig({
  copySuccessText: 'Code copied to clipboard!',
});
```

### Internationalization (i18n) Configuration

The plugin supports internationalization to display different languages based on the current locale:

```ts
// .vitepress/theme/index.ts
import { defineClientComponentConfig } from '@vitepress-demo-preview/core';

// Define internationalization configuration
defineClientComponentConfig({
  // Keep backward compatibility
  copySuccessText: 'Code copied to clipboard!',
  vueApp: app,
  // Internationalization configuration
  i18n: {
    zh: {
      copySuccessText: '代码已复制到剪贴板！',
      copyCode: 'Copy code',
      foldCode: 'Fold code',
      expandCode: 'Expand code',
      hideSourceCode: 'Hide source code',
    },
    en: {
      copySuccessText: 'Code copied to clipboard!',
      copyCode: '复制代码',
      foldCode: '折叠代码',
      expandCode: '展开代码',
      hideSourceCode: '隐藏源代码',
    },
  },
  // Set default language
  defaultLanguage: 'en',
});
```

The plugin automatically detects the current language based on the URL path (e.g., `/en/` for English, `/zh/` for Chinese) and displays the corresponding text.

### Available Configuration Options

| Option            | Type     | Default      | Description                                               |
| ----------------- | -------- | ------------ | --------------------------------------------------------- |
| `copySuccessText` | `string` | `'复制成功'`  | The text shown when code is successfully copied (deprecated, use i18n instead) |
| `i18n`            | `object` | `undefined`  | Internationalization configuration object                  |
| `defaultLanguage` | `string` | `'zh'`       | Default language when no locale is detected               |
| `vueApp`          | `App`    | `undefined`  | Vue application instance                                  |

#### Supported i18n Text Keys

| Key              | Description                          |
| ---------------- | ------------------------------------ |
| `copySuccessText` | Text shown on successful code copy   |
| `copyCode`        | Tooltip text for copy button        |
| `foldCode`        | Tooltip text for fold button        |
| `expandCode`      | Tooltip text for expand button      |
| `hideSourceCode`  | Text for hide source code button    |

## 📦 Packages

### `@vitepress-demo-preview/plugin`

`@vitepress-demo-preview/plugin` is a markdown-it plugin, which mainly provides two kinds of Component preview methods, namely **Component Form** and **Container Form**.

### `@vitepress-demo-preview/component`

`@vitepress-demo-preview/component` is a component library that provides presentation components. It mainly provides three containers. These are **Ant Design Container**, **ElementPlus Container**, and **Naive UI Container**, which mimic the styles associated with the preview of each UI framework component.

Of course, we will also consider providing similar component containers for other component libraries.

**Tip:** `@vitepress-demo-preview/component` is not necessary. You can also consider just using the `@vitepress-demo-preview/plugin`, which is not bound to each other. You can implement your own component container according to your own preferences and needs. For details, refer to the source code of the above three containers.

## 📑 License

[MIT](https://github.com/flingyp/vitepress-demo-preview/blob/main/LICENSE)

Copyright (c) 2023 flingyp
