<script setup lang="ts">
import { useStickToBottomContext } from 'vue-stick-to-bottom'
import { ArrowDownOutline } from '@vicons/ionicons5'

const { isAtBottom, scrollToBottom } = useStickToBottomContext()
</script>

<template>
  <n-button
    v-if="!isAtBottom"
    circle
    type="primary"
    class="scroll-btn"
    @click="scrollToBottom()"
  >
    <template #icon>
      <n-icon><ArrowDownOutline /></n-icon>
    </template>
  </n-button>
</template>

<style scoped>
.scroll-btn {
  position: absolute;
  bottom: 160px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
}
</style>
