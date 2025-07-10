import { ref } from 'vue';
import { toast } from 'vue-sonner';

export const useCodeCopy = () => {
  const copyContent = ref('');
  const clickCopy = async (value: string) => {
    await navigator.clipboard.writeText(value);
    toast.success('复制成功', {
      position: 'top-center',
      closeButton: true,
    });
  };
  return {
    copyContent,
    clickCopy,
  };
};
