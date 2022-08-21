<script lang="ts" setup>
import { ref } from "vue";
import { useNameSpace } from "./hooks/use-namespaces";

const ns = useNameSpace();

interface DemoBlockProps {
  code: string;
  showCode: string;
  title: string;
  description: string;
}

const props = withDefaults(defineProps<DemoBlockProps>(), {
  title: "默认标题",
  description: "描述内容",
});

const sourceCode = ref(decodeURIComponent(props.code));
const showCode = ref(decodeURIComponent(props.showCode));
console.log(sourceCode);
console.log(showCode);
</script>

<template>
  <ClientOnly>
    <div :class="[ns.e('container')]">
      <section :class="[ns.bem('preview')]">
        <slot> </slot>
      </section>
      <section :class="[ns.bem('description')]">
        <div :class="[ns.bem('description', 'title')]">
          <span>标题</span>
        </div>
        <div :class="[ns.bem('description', 'content')]">
          描述内容描述内容描述内容描述内容描述内容描述内容
        </div>
        <div :class="[ns.bem('description', 'split-line')]"></div>
        <div :class="[ns.bem('description', 'handle-btn')]">操作按钮</div>
      </section>
      <section :class="[ns.bem('source')]">
        <div v-html="showCode" class="language-vue"></div>
      </section>
    </div>
  </ClientOnly>
</template>

<style src="./style/demo-block.scss"></style>
