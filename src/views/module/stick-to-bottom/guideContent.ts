// vue-stick-to-bottom 使用说明
export const guideContent = `# vue-stick-to-bottom 使用说明

一个用于实现聊天消息自动滚动到底部的 Vue 3 组合式函数。

## 安装

\`\`\`bash
pnpm add vue-stick-to-bottom
\`\`\`

## 基本用法

\`\`\`vue
<script setup>
import { useStickToBottom } from 'vue-stick-to-bottom'

const { scrollRef, contentRef, isAtBottom, scrollToBottom } = useStickToBottom({
  resize: 'smooth',  // 内容变化时的滚动行为
  initial: 'smooth'  // 初始滚动行为
})
<\/script>

<template>
  <div ref="scrollRef" class="scroll-container">
    <div ref="contentRef">
      <!-- 消息列表内容 -->
    </div>
  </div>

  <!-- 滚动到底部按钮 -->
  <button v-if="!isAtBottom" @click="scrollToBottom">
    回到底部
  </button>
<\/template>

<style>
.scroll-container {
  height: 400px;
  overflow-y: auto;
}
<\/style>
\`\`\`

## 返回值说明

| 属性/方法 | 类型 | 说明 |
|-----------|------|------|
| scrollRef | Ref | 滚动容器的 ref |
| contentRef | Ref | 内容容器的 ref |
| isAtBottom | Ref\\<boolean\\> | 是否在底部 |
| scrollToBottom | Function | 滚动到底部的方法 |

## 配置选项

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| resize | 'smooth' \\| 'instant' \\| 'none' | 'smooth' | 内容变化时的滚动行为 |
| initial | 'smooth' \\| 'instant' \\| 'none' | 'instant' | 初始加载时的滚动行为 |

## 典型场景

- AI 对话聊天界面
- 实时日志输出
- 消息通知列表
- 任何需要自动滚动到底部的场景
`
