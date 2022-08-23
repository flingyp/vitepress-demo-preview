<script lang="ts" setup>
  import { ref } from 'vue'
  import CodeOpen from './icons/code-open.vue'
  import CodeClose from './icons/code-close.vue'
  import { useNameSpace } from './hooks/use-namespaces'
  import { useCodeFold } from './hooks/use-codefold'

  const ns = useNameSpace()
  const { isCodeFold, setCodeFold } = useCodeFold()

  interface DemoBlockProps {
    code: string
    showCode: string
    title: string
    description: string
  }

  const props = withDefaults(defineProps<DemoBlockProps>(), {
    title: '默认标题',
    description: '描述内容'
  })

  const showSourceCode = ref(decodeURIComponent(props.showCode))
</script>

<template>
  <ClientOnly>
    <div :class="[ns.e('container')]">
      <section :class="[ns.bem('preview')]">
        <slot> </slot>
      </section>
      <section :class="[ns.bem('description')]">
        <div :class="[ns.bem('description', 'title')]">
          <span>{{ title }}</span>
        </div>
        <div :class="[ns.bem('description', 'content')]">{{ description }}</div>
        <div :class="[ns.bem('description', 'split-line')]"></div>
        <div :class="[ns.bem('description', 'handle-btn')]">
          <div :class="[ns.bem('icon', 'code_open_close')]">
            <CodeClose v-if="!isCodeFold" @click="setCodeFold(true)" />
            <CodeOpen v-else @click="setCodeFold(false)" />
          </div>
        </div>
      </section>
      <section :class="[ns.bem('source')]" v-if="isCodeFold">
        <div v-html="showSourceCode" class="language-vue"></div>
      </section>
    </div>
  </ClientOnly>
</template>

<style src="./style/demo-block.scss"></style>
<style src="./style/demo-code.scss"></style>
