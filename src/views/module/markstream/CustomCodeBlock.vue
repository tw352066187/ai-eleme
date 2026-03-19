<script setup lang="ts">
import { CodeBlockNode } from 'markstream-vue'

// 接收节点数据
defineProps<{
  node: any
  stream?: boolean
  loading?: boolean
}>()

// 复制事件
const emit = defineEmits<{
  copy: [code: string]
  previewCode: [code: string, lang: string]
}>()

const handleCopy = (code: string) => {
  emit('copy', code)
}

const handlePreview = (code: string, lang: string) => {
  emit('previewCode', code, lang)
}
</script>

<template>
  <CodeBlockNode
    :node="node"
    :stream="stream"
    :loading="loading"
    @copy="handleCopy"
    @preview-code="handlePreview"

  />
</template>

<style scoped lang="scss">
.custom-header-left {
  display: flex;
  align-items: center;
  gap: 8px;

  .lang-badge {
    font-size: 12px;
    color: var(--color-text-2);
    background: var(--color-fill-2);
    padding: 2px 8px;
    border-radius: 4px;
  }
}

.custom-header-right {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
