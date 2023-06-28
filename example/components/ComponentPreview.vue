<template>
  <div>
    <NButton type="primary" size="small" @click="num += 2">点击新增</NButton>
    <span style="margin-left: 20px">{{ num }}</span>
  </div>
</template>

<script setup lang="ts">
  import { NButton } from 'naive-ui'
  import { ref } from 'vue'

  const num = ref(0)
</script>
