import type { App } from 'vue';

// 国际化文本接口
export interface I18nTexts {
  copySuccessText: string;
  copyCode: string;
  foldCode: string;
  expandCode: string;
  hideSourceCode: string;
  [key: string]: string;
}

// 语言配置接口
export interface LanguageConfig {
  [lang: string]: I18nTexts;
}

// 配置文件接口
export interface ClientComponentConfig {
  copySuccessText?: string;
  vueApp?: App<any>;
  // 新增国际化配置
  i18n?: LanguageConfig;
  defaultLanguage?: string;
}

// 默认文本配置
const defaultTexts: I18nTexts = {
  copySuccessText: '复制成功',
  copyCode: '复制代码',
  foldCode: '折叠代码',
  expandCode: '展开代码',
  hideSourceCode: '隐藏源代码',
};

// 默认语言配置
const defaultLanguageConfig: LanguageConfig = {
  zh: {
    copySuccessText: '复制成功',
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
};

// 默认配置
const defaultConfig: ClientComponentConfig = {
  copySuccessText: '复制成功',
  vueApp: undefined,
  i18n: defaultLanguageConfig,
  defaultLanguage: 'zh',
};

/**
 * 获取当前语言
 * @param defaultLang 默认语言
 * @returns 当前语言代码
 */
export function getCurrentLanguage(defaultLang: string = 'zh'): string {
  if (typeof window === 'undefined') {
    return defaultLang;
  }

  // 从 URL 路径中获取语言
  const pathname = window.location.pathname;

  // 将路径按 / 分割，检测每个段落是否为语言代码
  const pathSegments = pathname
    .split('/')
    .filter((segment) => segment.length > 0);

  // 支持的语言代码模式：en, zh, zh-CN, ja-JP 等
  const langRegex = /^[a-z]{2}(-[A-Z]{2})?$/;

  for (const segment of pathSegments) {
    if (langRegex.test(segment)) {
      return segment;
    }
  }

  // 如果没有匹配到，返回默认语言
  return defaultLang;
}

/**
 * 获取国际化文本
 * @param key 文本键
 * @param language 语言代码
 * @param config 配置对象
 * @returns 对应的文本
 */
export function getI18nText(
  key: string,
  language: string,
  config: ClientComponentConfig,
): string {
  if (config.i18n && config.i18n[language] && config.i18n[language][key]) {
    return config.i18n[language][key];
  }

  // 回退到默认语言
  const defaultLang = config.defaultLanguage || 'zh';
  if (
    config.i18n &&
    config.i18n[defaultLang] &&
    config.i18n[defaultLang][key]
  ) {
    return config.i18n[defaultLang][key];
  }

  // 回退到旧版本配置
  if (key === 'copySuccessText' && config.copySuccessText) {
    return config.copySuccessText;
  }

  // 最后回退到硬编码默认值
  return defaultTexts[key] || key;
}

/**
 * 定义配置辅助函数
 * @param config 用户配置
 * @returns 合并后的配置
 */
export function defineClientComponentConfig(
  config: Partial<ClientComponentConfig>,
) {
  // 合并国际化配置
  const mergedI18n = config.i18n
    ? { ...defaultLanguageConfig, ...config.i18n }
    : defaultLanguageConfig;

  const demoPreviewConfig: ClientComponentConfig = Object.assign(
    {},
    defaultConfig,
    config,
    { i18n: mergedI18n },
  );

  // 如果没有设置默认语言，取第一个语言配置项的语言
  if (!demoPreviewConfig.defaultLanguage && demoPreviewConfig.i18n) {
    const availableLanguages = Object.keys(demoPreviewConfig.i18n);
    demoPreviewConfig.defaultLanguage = availableLanguages[0] || 'zh';
  }

  // 往浏览器 Window 上挂载 demoPreviewConfig
  if (typeof window !== 'undefined') {
    (window as any).demoPreviewConfig = demoPreviewConfig;
  }

  return demoPreviewConfig;
}
