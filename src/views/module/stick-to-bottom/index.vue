<template>
  <div class="container-page">
    <!-- Tab 切换组件：用于在"示例"和"使用说明"之间切换 -->
    <a-tabs v-model:active-key="activeTab" class="ai-tabs">
      <!-- 示例 Tab 页签 -->
      <a-tab-pane key="example" title="示例" />
      <!-- 使用说明 Tab 页签 -->
      <a-tab-pane key="guide" title="vue-stick-to-bottom 用法" />
    </a-tabs>

    <!-- Example 组件：展示 vue-stick-to-bottom 的示例 -->
    <Example v-if="activeTab === 'example'" />

    <!-- 使用说明卡片：展示 vue-stick-to-bottom 库的使用文档 -->
    <a-card v-if="activeTab === 'guide'" title="使用说明" class="guide-card">
      <div class="guide-container markstream-vue">
        <!-- MarkdownRender 组件：用于渲染 Markdown 格式的使用说明文档 -->
        <Markdown :content="guideContent" class="ai-markdown-content" />
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Markdown } from 'vue-stream-markdown'
import '@/assets/styles/markdown-stream.css'
import 'vue-stream-markdown/theme.css'
import { guideContent } from './guideContent'
import Example from './Example.vue'

// 当前激活的 Tab
const activeTab = ref('example')
</script>

<style scoped lang="scss">
.ai-page {
  padding: 16px;
  background-color: #fff;
}

.guide-card {
  // height: calc(100vh - 180px);
}

.guide-container {
  min-width: 900px;
  padding: 0 16px;

  :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0;

    th,
    td {
      padding: 10px 12px;
      border: 1px solid var(--color-border);
      text-align: left;
    }

    th {
      background: var(--color-fill-2);
    }
  }

  :deep(pre) {
    margin: 12px 0;
    border-radius: 6px;
    overflow: hidden;
  }
}

</style>
