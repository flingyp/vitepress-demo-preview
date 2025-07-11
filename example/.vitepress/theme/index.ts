import DefaultTheme from 'vitepress/theme';
import { App } from 'vue';
import { NaiveUIContainer } from '@vitepress-demo-preview/component';
import '@vitepress-demo-preview/component/dist/style.css';
import { defineClientComponentConfig } from '@vitepress-demo-preview/core';

// 自动加载配置
defineClientComponentConfig({
  copySuccessText: '代码已复制到剪贴板！',
});

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component('demo-preview', NaiveUIContainer);
  },
};
