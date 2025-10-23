<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import CodeOpen from '../../icons/code-open.vue';
import CodeClose from '../../icons/code-close.vue';
import CodeCopy from '../../icons/code-copy.vue';
import { useNameSpace } from '../../hooks/use-namespaces';
import { useCodeFold } from '../../hooks/use-codefold';
import { useCodeCopy } from '../../hooks/use-codecopy';
import { Toaster } from 'vue-sonner';
import 'vue-sonner/style.css';

import { Tooltip } from 'floating-vue';
import 'floating-vue/dist/style.css';

interface DemoBlockProps {
  code: string;
  showCode: string;
  title: string;
  description: string;
}

const props = withDefaults(defineProps<DemoBlockProps>(), {
  title: '默认标题',
  description: '描述内容',
});

const ns = useNameSpace();
const { isCodeFold, setCodeFold } = useCodeFold();
const { clickCopy } = useCodeCopy();

watch(
  () => isCodeFold.value,
  (newVal) => {
    checkCodeOverflow();
  },
);

const sourceCode = ref(decodeURIComponent(props.code));
const showSourceCode = ref(decodeURIComponent(props.showCode));
const sourceCodeArea = ref<any>(null);
const isOverflowScreen = ref(false);
const isBottomButtonVisible = computed(() => !isCodeFold.value);

const clickCodeCopy = () => {
  clickCopy(sourceCode.value);
};

const scrollToTop = () => {
  // 找到组件的容器元素并滚动到其顶部，向上偏移30像素
  const container = sourceCodeArea.value?.closest('[class*="__container"]');
  if (container) {
    const rect = container.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetY = rect.top + scrollTop - 120;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  }
};

const sourceCodeContainerHeight = computed(() => {
  if (sourceCodeArea.value) return sourceCodeArea.value?.clientHeight;
  return 0;
});

const checkCodeOverflow = () => {
  if (!sourceCodeArea.value) return;

  const containerRect = sourceCodeArea.value.getBoundingClientRect();
  const screenHeight = window.innerHeight;

  // 检查代码块是否完全展示在屏幕内
  // 如果代码块的顶部在屏幕上方不可见，或者底部在屏幕下方不可见，就显示按钮
  const isTopAboveScreen = containerRect.top < 0;
  const isBottomBelowScreen = containerRect.bottom > screenHeight;
  const isCompletelyVisible =
    containerRect.top >= 0 && containerRect.bottom <= screenHeight;

  // 只要有任何部分超出屏幕就显示按钮
  isOverflowScreen.value = !isCompletelyVisible;
};

const setContainerHeight = (value: number) => {
  if (isCodeFold.value) sourceCodeArea.value.style.height = '0px';
  else sourceCodeArea.value.style.height = `${value}px`;

  // 在设置高度后检查是否溢出
  if (!isCodeFold.value) {
    setTimeout(checkCodeOverflow, 100);
  }
};
onMounted(() => {
  // 组件挂载时，先获取代码块容器为折叠前的容器高度
  const currentContainerHeight = sourceCodeContainerHeight.value;
  setContainerHeight(currentContainerHeight);

  // 监听窗口大小变化和滚动事件
  window.addEventListener('resize', checkCodeOverflow);
  window.addEventListener('scroll', checkCodeOverflow, { passive: true });
});

// 在组件卸载时清理事件监听器
onUnmounted(() => {
  window.removeEventListener('resize', checkCodeOverflow);
  window.removeEventListener('scroll', checkCodeOverflow);
});

watch(isCodeFold, () => {
  const container = sourceCodeContainerHeight.value;
  setContainerHeight(container);
});
</script>

<template>
  <div :class="[ns.e('naive-ui__container')]">
    <section :class="[ns.bem('name_handle')]">
      <div v-if="props.title" :class="[ns.bem('component', 'name')]">
        {{ title }}
      </div>
      <div :class="[ns.bem('description', 'btns')]">
        <Tooltip placement="bottom">
          <CodeCopy @click="clickCodeCopy" />
          <template #popper> 复制代码 </template>
        </Tooltip>

        <Tooltip v-if="!isCodeFold" placement="bottom">
          <CodeClose @click="setCodeFold(true)" />
          <template #popper> 折叠代码 </template>
        </Tooltip>

        <Tooltip v-else placement="bottom">
          <CodeOpen @click="setCodeFold(false)" />
          <template #popper> 展开代码 </template>
        </Tooltip>
      </div>
    </section>

    <section v-if="props.description" :class="[ns.bem('description')]">
      <span>
        {{ description }}
      </span>
    </section>

    <section :class="[ns.bem('preview')]">
      <slot> </slot>
    </section>

    <section :class="[ns.bem('source')]" ref="sourceCodeArea">
      <div v-html="showSourceCode" class="language-vue"></div>
    </section>

    <!-- 底部吸附关闭按钮 -->
    <div
      v-if="isBottomButtonVisible"
      :class="[ns.bem('bottom-close-button')]"
      @click="
        () => {
          setCodeFold(true);
          scrollToTop();
        }
      "
    >
      <CodeClose />
      <span>隐藏源代码</span>
    </div>
  </div>

  <Toaster :expand="true" closeButton richColors />
</template>

<style src="./naive-ui.scss"></style>
