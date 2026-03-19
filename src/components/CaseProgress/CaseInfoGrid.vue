<template>
  <div class="case-info-grid">
    <slot />
  </div>
</template>

<script setup>
// 这是一个简单的网格容器组件，主要提供布局功能
</script>

<style lang="scss" scoped>
.case-info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  min-height: 200px;

  // 响应式设计
  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
</style>
