<script lang="ts" setup>
import { useNameSpace } from "./hooks/use-namespaces";

const ns = useNameSpace();

interface DemoBlockProps {
  path: string;
  title: string;
  description: string;
}

const props = withDefaults(defineProps<DemoBlockProps>(), {
  title: "默认标题",
  description: "描述内容",
});

console.log(props);
</script>

<template>
  <div :class="[ns.e('container')]">
    <section :class="[ns.bem('preview')]">预览</section>
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
      <div>源码内容</div>
    </section>
  </div>
</template>

<style src="./style/demo-block.scss"></style>
