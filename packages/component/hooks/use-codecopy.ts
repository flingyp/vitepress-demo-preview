import { ref } from 'vue';
import { toast } from 'vue-sonner';
import { ClientComponentConfig } from '@vitepress-demo-preview/core';

export const useCodeCopy = () => {
  const copyContent = ref('');
  const clickCopy = async (value: string) => {
    await navigator.clipboard.writeText(value);
    const config = (window as any)?.demoPreviewConfig as ClientComponentConfig;
    toast.success(config?.copySuccessText || '复制成功', {
      position: 'top-center',
      closeButton: true,
    });
  };

  return {
    copyContent,
    clickCopy,
  };
};
