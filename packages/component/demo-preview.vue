<script lang="ts" setup>
  import { ref } from 'vue'
  import CodeOpen from './icons/code-open.vue'
  import CodeClose from './icons/code-close.vue'
  import CodeCopy from './icons/code-copy.vue'
  import { useNameSpace } from './hooks/use-namespaces'
  import { useCodeFold } from './hooks/use-codefold'
  import { useCodeCopy } from './hooks/use-codecopy'
  import { MessageNoticeService } from './messages/index'

  const ns = useNameSpace()
  const { isCodeFold, setCodeFold } = useCodeFold()
  const { copyContent, clickCopy } = useCodeCopy()

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
  const sourceCode = ref(decodeURIComponent(props.code))
  const showSourceCode = ref(decodeURIComponent(props.showCode))

  const clickCodeCopy = () => {
    clickCopy(sourceCode.value)
    MessageNoticeService.open()
  }
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
          <CodeClose v-if="!isCodeFold" @click="setCodeFold(true)" />
          <CodeOpen v-else @click="setCodeFold(false)" />
          <CodeCopy @click="clickCodeCopy" />
        </div>
      </section>
      <transition name="slide-down">
        <section :class="[ns.bem('source')]" v-if="isCodeFold">
          <div v-html="showSourceCode" class="language-vue"></div>
        </section>
      </transition>
    </div>
  </ClientOnly>
</template>

<style src="./styles/demo-block.scss"></style>
<style src="./styles/demo-code.scss"></style>
