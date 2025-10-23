import { computed } from 'vue';
import {
  getCurrentLanguage,
  getI18nText,
  type ClientComponentConfig,
} from '@vitepress-demo-preview/core';

/**
 * 国际化 Hook
 * @returns 提供获取国际化文本的方法
 */
export const useI18n = () => {
  const config =
    typeof window !== 'undefined'
      ? ((window as any).demoPreviewConfig as ClientComponentConfig)
      : null;

  const currentLanguage = computed(() =>
    getCurrentLanguage(config?.defaultLanguage),
  );

  /**
   * 获取国际化文本
   * @param key 文本键
   * @returns 对应语言的文本
   */
  const t = (key: string): string => {
    if (!config) {
      // 如果没有配置，返回键名作为后备
      return key;
    }
    return getI18nText(key, currentLanguage.value, config);
  };

  return {
    currentLanguage,
    t,
  };
};
