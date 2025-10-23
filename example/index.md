# VitePress 组件预览插件

VitePress Demo Preview 是一个强大的组件预览插件，允许你在 VitePress 文档中展示和预览 Vue 组件。本插件提供多种 UI 框架预览形式，包括 Naive UI、Ant Design Vue 和 Element Plus。

## 使用方式

VitePress Demo Preview 提供了两种使用方式：组件形式和自定义容器形式。

### 方式一：组件形式预览

使用 `<preview>` 组件可以快速预览组件。这种方式适合简单的组件展示。

```vue
<preview
  path="@/components/ComponentPreview.vue"
  title="组件标题"
  description="组件描述信息"
/>
```

**实际效果：**

<preview path="@/components/ComponentPreview.vue" title="组件预览" description="通过组件形式预览示例组件" />

### 方式二：自定义容器形式预览

使用自定义容器 `:::preview` 可以提供更灵活的预览方式，适合需要更多配置的情况。

```md
:::preview 容器标题 || 容器描述信息

demo-preview=@/components/ContainerPreview.vue

:::
```

**实际效果：**

:::preview 容器预览 || 通过自定义容器形式预览示例组件

demo-preview=@/components/ContainerPreview.vue

:::

### 方式三：预览 TSX 组件

本插件同样支持预览 TSX 组件，使用方式与 Vue 组件类似。

```md
:::preview 容器标题 || 容器描述信息

demo-preview=./components/ContainerTsxPreview.tsx

:::
```

**实际效果：**

:::preview TSX组件预览 || 通过自定义容器形式预览TSX示例组件

demo-preview=./components/ContainerTsxPreview.tsx

:::

## 功能特点

- 📦 支持多种 UI 框架：Naive UI、Ant Design Vue、Element Plus
- 🔍 代码折叠/展开功能
- 📋 代码一键复制
- 🌈 美观的展示界面
- 🚀 支持 Vue 和 TSX 组件
- 💡 详细的文档说明

## 配置选项

### 组件预览配置

| 参数              | 说明     | 类型   | 默认值     |
| ----------------- | -------- | ------ | ---------- |
| path/demo-preview | 组件路径 | string | -          |
| title             | 组件标题 | string | '默认标题' |
| description       | 组件描述 | string | '描述内容' |

### 国际化配置

插件支持通过 `defineClientComponentConfig` 函数配置国际化选项：

```ts
// .vitepress/theme/index.ts
import { defineClientComponentConfig } from '@vitepress-demo-preview/core';

// 定义国际化配置
defineClientComponentConfig({
  vueApp: app,
  // 国际化配置
  i18n: {
    zh: {
      copySuccessText: '代码已复制到剪贴板！',
      copyCode: '复制代码',
      foldCode: '折叠代码',
      expandCode: '展开代码',
      hideSourceCode: '隐藏源代码',
    },
    en: {
      copySuccessText: 'Code copied to clipboard!',
      copyCode: 'Copy code',
      foldCode: 'Fold code',
      expandCode: 'Expand code',
      hideSourceCode: 'Hide source code',
    },
  },
  // 设置默认语言
  defaultLanguage: 'zh',
});
```

#### 全局配置选项

| 选项              | 类型     | 默认值       | 描述                                           |
| ----------------- | -------- | ------------ | ---------------------------------------------- |
| `copySuccessText` | `string` | `'复制成功'` | 代码成功复制时显示的文本（已弃用，请使用 i18n）        |
| `i18n`            | `object` | `undefined`  | 国际化配置对象                                  |
| `defaultLanguage` | `string` | `'zh'`       | 未检测到语言环境时的默认语言                     |
| `vueApp`          | `App`    | `undefined`  | Vue 应用实例                                    |

#### 支持的 i18n 文本键

| 键               | 描述                     |
| ---------------- | ------------------------ |
| `copySuccessText` | 代码复制成功时显示的文本 |
| `copyCode`        | 复制按钮的提示文本       |
| `foldCode`        | 折叠按钮的提示文本       |
| `expandCode`      | 展开按钮的提示文本       |
| `hideSourceCode`  | 隐藏源代码按钮的文本     |

插件会自动根据 URL 路径检测当前语言并显示对应的文本。
