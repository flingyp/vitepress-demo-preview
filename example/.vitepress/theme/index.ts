import DefaultTheme from 'vitepress/theme';
import { App } from 'vue';
import { NaiveUIContainer } from '@vitepress-demo-preview/component';
import '@vitepress-demo-preview/component/dist/style.css';
import { defineClientComponentConfig } from '@vitepress-demo-preview/core';

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component('demo-preview', NaiveUIContainer);

    // 自动加载配置
    defineClientComponentConfig({
      // 保持向后兼容
      copySuccessText: '代码已复制到剪贴板！',
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
      // 设置默认语言为中文
      defaultLanguage: 'zh',
    });
  },
};
