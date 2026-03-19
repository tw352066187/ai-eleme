<script setup lang="ts">
import { ref } from 'vue'
import { useStickToBottom } from 'vue-stick-to-bottom'

const messages = ref([
  { id: 1, text: '你好！这是一个 vue-stick-to-bottom 的简单示例。' },
  { id: 2, text: '尝试点击下方的按钮添加更多消息，查看自动滚动效果。' }
])

// 初始化插件
const { scrollRef, contentRef, isAtBottom, scrollToBottom } = useStickToBottom({
  resize: 'smooth',
  initial: 'smooth'
})

const addMessage = () => {
  messages.value.push({
    id: Date.now(),
    text: `新消息 ${new Date().toLocaleTimeString()} - 这是一条自动生成的测试消息，用于演示滚动效果。`
  })
}

const addManyMessages = () => {
  for (let i = 0; i < 5; i++) {
    messages.value.push({
      id: Date.now() + i,
      text: `批量消息 ${i + 1}`
    })
  }
}
</script>

<template>
  <div class="example-container">
    <div class="header">
      <h3>Vue Stick To Bottom 示例</h3>
      <p>当内容变化时，容器会自动滚动到底部。</p>
    </div>

    <!-- 滚动容器 -->
    <div ref="scrollRef" class="scroll-area">
      <div ref="contentRef" class="content-area">
        <div v-for="msg in messages" :key="msg.id" class="message-item">
          <div class="avatar">AI</div>
          <div class="bubble">{{ msg.text }}</div>
        </div>
      </div>
    </div>

    <!-- 底部状态和控制 -->
    <div class="controls">
      <div class="status">
        <a-tag :color="isAtBottom ? 'green' : 'orange'">
          {{ isAtBottom ? '已在底部' : '未在底部' }}
        </a-tag>
      </div>

      <div class="buttons">
        <a-button @click="addMessage" type="primary">添加一条消息</a-button>
        <a-button @click="addManyMessages">添加多条消息</a-button>
        <a-button @click="() => scrollToBottom()" :disabled="isAtBottom"> 滚动到底部 </a-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.example-container {
  // max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: var(--color-bg-2);
  border-radius: 8px;
  border: 1px solid var(--color-border);
}

.header {
  margin-bottom: 20px;
  h3 {
    margin: 0 0 8px;
  }
  p {
    margin: 0;
    color: var(--color-text-3);
  }
}

.scroll-area {
  height: calc(100vh - 360px);
  overflow-y: auto;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-fill-2);
  padding: 16px;
  margin-bottom: 16px;

  /* 自定义滚动条样式 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--color-text-4);
    border-radius: 3px;
  }
}

.message-item {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }

  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--color-primary-light-1);
    color: var(--color-primary-6);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    flex-shrink: 0;
  }

  .bubble {
    background: var(--color-bg-1);
    padding: 10px 14px;
    border-radius: 0 12px 12px 12px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    line-height: 1.5;
  }
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid var(--color-border);

  .buttons {
    display: flex;
    gap: 12px;
  }
}
</style>
