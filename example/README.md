# VitePress Demo Preview Example

This is the example documentation for VitePress Demo Preview plugin with internationalization support.

## Available Languages

- **中文 (Chinese)**: Default language, accessible at root path `/`
- **English**: Accessible at `/en/`

## Directory Structure

```
example/
├── index.md                    # Chinese documentation (root)
├── components/                 # Chinese components
│   ├── ComponentPreview.vue
│   ├── ContainerPreview.vue
│   └── ContainerTsxPreview.tsx
├── en/                         # English documentation
│   ├── index.md
│   └── components/             # English components
│       ├── ComponentPreview.vue
│       ├── ContainerPreview.vue
│       └── ContainerTsxPreview.tsx
└── .vitepress/
    ├── config.ts               # VitePress configuration with i18n
    └── theme/
        ├── index.ts            # Theme configuration
        └── Layout.vue          # Custom layout with language cookie
```

## Features

- ✅ Internationalization (i18n) support
- ✅ Language-specific component examples
- ✅ Automatic language detection and cookie storage
- ✅ Language switcher in navigation
- ✅ Localized copy success messages

## Development

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run serve  # Preview production build
```

## Configuration

The i18n configuration is set up in `.vitepress/config.ts`:

- Root locale (`/`) serves Chinese content
- English locale (`/en/`) serves English content
- Each locale has its own theme configuration
- Language-specific copy success messages are handled in the theme
