# VitePress Component Preview Plugin

VitePress Demo Preview is a powerful component preview plugin that allows you to showcase and preview Vue components in VitePress documentation. This plugin provides multiple UI framework preview forms, including Naive UI, Ant Design Vue, and Element Plus.

## Usage

VitePress Demo Preview provides two usage methods: component form and custom container form.

### Method 1: Component Form Preview

Use the `<preview>` component to quickly preview components. This method is suitable for simple component displays.

```vue
<preview
  path="@/components/ComponentPreview.vue"
  title="Component Title"
  description="Component description information"
/>
```

**Actual Effect:**

<preview path="@/components/ComponentPreview.vue" title="Component Preview" description="Preview example component through component form" />

### Method 2: Custom Container Form Preview

Using the custom container `:::preview` provides a more flexible preview method, suitable for situations that require more configuration.

```md
:::preview Container Title || Container description information

demo-preview=@/components/ContainerPreview.vue

:::
```

**Actual Effect:**

:::preview Container Preview || Preview example component through custom container form

demo-preview=@/components/ContainerPreview.vue

:::

### Method 3: Preview TSX Components

This plugin also supports previewing TSX components, with usage similar to Vue components.

```md
:::preview Container Title || Container description information

demo-preview=./components/ContainerTsxPreview.tsx

:::
```

**Actual Effect:**

:::preview TSX Component Preview || Preview TSX example component through custom container form

demo-preview=./components/ContainerTsxPreview.tsx

:::

## Features

- 📦 Support for multiple UI frameworks: Naive UI, Ant Design Vue, Element Plus
- 🔍 Code collapse/expand functionality
- 📋 One-click code copying
- 🌈 Beautiful display interface
- 🚀 Support for Vue and TSX components
- 💡 Detailed documentation

## Configuration Options

| Parameter         | Description     | Type   | Default Value   |
| ----------------- | --------------- | ------ | --------------- |
| path/demo-preview | Component path  | string | -               |
| title             | Component title | string | 'Default Title' |
| description       | Component desc  | string | 'Description'   |
