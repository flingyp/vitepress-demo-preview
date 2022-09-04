<template>
  <div>
    <div>{{ msg }}</div>
    <button>按钮介绍</button>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  const msg = ref('Hello Button')
</script>
