<template>
  <div class="container-page">
    <a-tabs v-model:active-key="activeTab" class="ai-tabs">
      <!-- 示例 Tab 页签 -->
      <a-tab-pane key="example" title="示例" />
      <!-- 使用说明 Tab 页签 -->
      <a-tab-pane key="guide" title="使用说明" />
    </a-tabs>
    <!-- 示例 Tab 内容 -->
    <div v-if="activeTab === 'example'">
      <Example />
    </div>
    <!-- 使用说明 Tab 内容 -->
    <div v-if="activeTab === 'guide'">
      <Guide />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Example from './example.vue'
import Guide from './guide.vue'

const activeTab = ref('example')
</script>

<style lang="less" scoped>

</style>
