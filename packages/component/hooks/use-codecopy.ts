import { ref } from 'vue';
import { toast } from 'vue-sonner';
import {
  getCurrentLanguage,
  getI18nText,
  ClientComponentConfig,
} from '@vitepress-demo-preview/core';

export const useCodeCopy = () => {
  const copyContent = ref('');
  const clickCopy = async (value: string) => {
    await navigator.clipboard.writeText(value);
    const config = (window as any)?.demoPreviewConfig as ClientComponentConfig;

    // 获取国际化文本
    let successText = '复制成功';
    if (config) {
      const currentLanguage = getCurrentLanguage(config.defaultLanguage);
      successText = getI18nText('copySuccessText', currentLanguage, config);
    }

    toast.success(successText, {
      position: 'top-center',
      closeButton: true,
    });
  };

  return {
    copyContent,
    clickCopy,
  };
};
