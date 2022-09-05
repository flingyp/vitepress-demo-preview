<template>
  <div class="component-preview">
    <p>Component Form</p>
    <div>新增：{{ num }}</div>
    <button @click="addNum">按钮</button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const num = ref(0)
  const addNum = () => {
    num.value += 2
  }
</script>

<style scoped>
  .component-preview > p {
    margin: 0;
    padding: 0;
    font-size: 20px;
  }

  .component-preview > button {
    display: inline-block;
    padding: 0px 16px;
    border-radius: 4px;
    background: var(--vp-button-brand-bg);
    color: var(--vp-button-brand-text);
    border: 1px solid var(--vp-button-brand-border);
  }
</style>
