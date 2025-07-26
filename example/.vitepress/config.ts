import { defineConfig } from 'vitepress';
import {
  componentPreview,
  containerPreview,
} from '@vitepress-demo-preview/plugin';
import { resolve } from 'path';

const alias = {
  '@': resolve(__dirname, '../../example'),
};

export default defineConfig({
  base: '/vitepress-demo-preview',
  title: 'vitepress-demo-preview',
  description: 'Just playing around.',

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'VitePress 组件预览插件',
      description: '一个强大的 VitePress 组件预览插件',
      themeConfig: {
        nav: [
          {
            text: 'Vitepress Plugin Legend',
            link: 'https://github.com/flingyp/vitepress-plugin-legend',
          },
        ],
      },
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'VitePress Component Preview Plugin',
      description: 'A powerful VitePress component preview plugin',
      themeConfig: {
        nav: [
          {
            text: 'Vitepress Plugin Legend',
            link: 'https://github.com/flingyp/vitepress-plugin-legend',
          },
        ],
      },
    },
  },

  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/flingyp/vitepress-demo-preview',
      },
    ],
  },
  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
    lineNumbers: true,
    config(md) {
      md.use(componentPreview, { clientOnly: true, alias });
      md.use(containerPreview, { clientOnly: true, alias });
    },
  },
  vite: {
    resolve: {
      alias,
    },
  },
});
