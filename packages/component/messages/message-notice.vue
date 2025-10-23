<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useNameSpace } from '../hooks/use-namespaces';
import CopySuccess from '../icons/copy-success.vue';
import { getCurrentLanguage, getI18nText, type ClientComponentConfig } from '@vitepress-demo-preview/core';

interface MessageNotice {
  content?: string;
  close: () => void;
}

const props = withDefaults(defineProps<MessageNotice>(), {
  content: '',
});

const ns = useNameSpace();
const visible = ref(false);
const setVisible = (value: boolean) => {
  visible.value = value;
};
const topHeight = ref(-999);
const setTopHeight = (value: number) => {
  topHeight.value = value;
};

// 获取国际化文本
const displayContent = computed(() => {
  // 如果有传入的内容，优先使用
  if (props.content) {
    return props.content;
  }

  // 否则从配置中获取国际化文本
  if (typeof window !== 'undefined' && (window as any).demoPreviewConfig) {
    const config: ClientComponentConfig = (window as any).demoPreviewConfig;
    const currentLanguage = getCurrentLanguage(config.defaultLanguage);
    return getI18nText('copySuccessText', currentLanguage, config);
  }

  // 回退到默认值
  return '复制成功!';
});

watch(visible, (newValue) => {
  if (newValue === true) {
    setTimeout(() => {
      visible.value = false;
    }, 3000);
  }
});

const handleDestroy = () => {
  props.close();
};

defineExpose({
  setVisible,
  setTopHeight,
});
</script>

<template>
  <transition name="slide-fade" @after-leave="handleDestroy">
    <div
      v-if="visible"
      :class="[ns.bem('message-notice', 'container')]"
      :style="{ top: topHeight + 'px' }"
    >
      <CopySuccess />
      <span>{{ displayContent }}</span>
    </div>
  </transition>
</template>

<style src="./message-notice.scss"></style>
