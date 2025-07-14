import type { App } from 'vue';

// 配置文件接口
export interface ClientComponentConfig {
  copySuccessText?: string;
  vueApp?: App<any>;
}

// 默认配置
const defaultConfig: ClientComponentConfig = {
  copySuccessText: '复制成功',
  vueApp: undefined,
};

/**
 * 定义配置辅助函数
 * @param config 用户配置
 * @returns 合并后的配置
 */
export function defineClientComponentConfig(
  config: Partial<ClientComponentConfig>,
) {
  const demoPreviewConfig: ClientComponentConfig = Object.assign(
    {},
    defaultConfig,
    config,
  );

  // 往浏览器 Window 上挂载 demoPreviewConfig
  if (typeof window !== 'undefined') {
    (window as any).demoPreviewConfig = demoPreviewConfig;
  }

  return demoPreviewConfig;
}
