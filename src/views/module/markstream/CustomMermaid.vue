<template>
  <MermaidBlockNode
  :node="node"
  :is-strict="true"
  :stream="stream"
  :loading="loading"
  :showZoomControls="false"
  :showFullscreenButton="false"
/>
</template>

<script setup lang="ts">
import { MermaidBlockNode } from 'markstream-vue'

defineProps<{
  node: any
  stream?: boolean
  loading?: boolean
}>()

</script>

<style lang="less" scoped>

</style>
