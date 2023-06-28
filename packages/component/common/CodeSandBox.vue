<script setup lang="ts">
  import CodeSandboxIcon from '../icons/code-sandbox.vue'

  defineProps({
    parameters: {
      type: Object,
      value: {}
    }
  })
</script>

<template>
  <form
    action="https://codesandbox.io/api/v1/sandboxes/define"
    method="POST"
    target="_blank"
    style="display: flex; padding: 0"
  >
    <input type="hidden" name="parameters" :value="parameters" />
    <input type="hidden" name="query" value="file=/src/Demo.vue" />
    <button type="submit">
      <CodeSandboxIcon />
    </button>
  </form>
</template>

<style scoped lang="scss">
  button {
    padding: 0;
    margin: 0;
    border: none;
    color: inherit;
    background-color: transparent;
  }
</style>
