<template>
  <div class="container-preview">
    <p>Container Form</p>
    <div class="add-container">
      <span>新增：{{ num }}</span>
      <NButton type="primary" size="small" @click="addNum">按钮</NButton>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { NButton } from 'naive-ui'

  const num = ref(0)
  const addNum = () => {
    num.value += 2
  }
</script>

<style scoped>
  .component-preview > p {
    margin: 0;
    padding: 0;
    margin-bottom: 10px;
    font-size: 20px;
  }

  .container-preview .add-container span {
    margin-right: 8px;
  }
</style>
