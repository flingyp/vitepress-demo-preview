<template>
  <div class="container-preview">
    <p>Container Form</p>
    <div>
      <span>新增：{{ num }}</span>
      <button @click="addNum">按钮</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const num = ref(0);
const addNum = () => {
  num.value += 2;
};
</script>

<style scoped>
.container-preview > p {
  margin: 0;
  padding: 0;
  margin-bottom: 10px;
  font-size: 20px;
}

button {
  display: inline-block;
  padding: 0px 16px;
  border-radius: 4px;
  background: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
  border: 1px solid var(--vp-button-brand-border);
  margin-left: 40px;
}
</style>
