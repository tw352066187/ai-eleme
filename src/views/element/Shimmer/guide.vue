<template>
  <a-card title="使用说明" class="guide-card">
    <div class="guide-container markstream-vue">
      <Markdown :content="guideContent" class="ai-markdown-content" />
    </div>
  </a-card>
</template>

<script lang="ts" setup>
import { Markdown } from 'vue-stream-markdown'
import '@/assets/styles/markdown-stream.css'
import 'vue-stream-markdown/theme.css'

const guideContent = `
# Shimmer（闪烁加载）组件说明

本页说明基于示例页 \`example.vue\` 中的使用方式，覆盖组件的作用、主要 Props/Slots，以及推荐用法。

## 组件清单

- \`Shimmer\`：闪烁动画文本组件，用于显示加载状态或流式传输提示

## 组件特性

- 提供平滑的闪烁动画效果
- 适用于 AI 生成内容的加载提示
- 支持自定义文本内容
- 轻量级，无需额外配置

---

## Shimmer

**作用**

- 显示带有闪烁动画效果的文本，用于提示用户内容正在生成或加载中
- 常用于 AI 响应生成、数据加载等场景
- 提供视觉反馈，改善用户等待体验

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**Slots**

| 插槽 | 说明 |
| --- | --- |
| 默认插槽 | 闪烁文本内容 |

**样式特性**

- 自带渐变闪烁动画效果
- 文本颜色为半透明灰色
- 动画循环播放，提供持续的视觉反馈

**用法**

\`\`\`vue
<Shimmer>
  正在生成您的回答...
</Shimmer>
\`\`\`

---

## 使用场景

### 场景 1：AI 响应生成提示

在 AI 开始生成回答之前，显示加载提示。

\`\`\`vue
<script setup lang="ts">
import { Shimmer } from '@/components/ai-elements/shimmer'
import { ref } from 'vue'

const isGenerating = ref(true)
const response = ref('')

async function generateResponse() {
  isGenerating.value = true

  // 模拟 AI 生成过程
  await new Promise(resolve => setTimeout(resolve, 2000))

  response.value = '这是 AI 生成的回答内容。'
  isGenerating.value = false
}
<\/script>

<template>
  <div>
    <Shimmer v-if="isGenerating">
      正在生成您的回答...
    </Shimmer>
    <div v-else>{{ response }}</div>
  </div>
</template>
\`\`\`

### 场景 2：流式传输准备阶段

在流式传输开始前，显示准备提示。

\`\`\`vue
<script setup lang="ts">
import { Shimmer } from '@/components/ai-elements/shimmer'
import { ref } from 'vue'

const streamingState = ref<'idle' | 'preparing' | 'streaming' | 'complete'>('idle')
const content = ref('')

async function startStreaming() {
  streamingState.value = 'preparing'

  // 准备阶段
  await new Promise(resolve => setTimeout(resolve, 1000))

  streamingState.value = 'streaming'

  // 开始流式传输
  const text = '这是流式传输的内容...'
  for (let i = 0; i < text.length; i++) {
    content.value += text[i]
    await new Promise(resolve => setTimeout(resolve, 50))
  }

  streamingState.value = 'complete'
}
<\/script>

<template>
  <div>
    <Shimmer v-if="streamingState === 'preparing'">
      准备流式传输...
    </Shimmer>
    <div v-else-if="streamingState === 'streaming' || streamingState === 'complete'">
      {{ content }}
    </div>
    <button v-if="streamingState === 'idle'" @click="startStreaming">
      开始生成
    </button>
  </div>
</template>
\`\`\`

### 场景 3：多阶段加载提示

根据不同的加载阶段显示不同的提示文本。

\`\`\`vue
<script setup lang="ts">
import { Shimmer } from '@/components/ai-elements/shimmer'
import { ref, computed } from 'vue'

const loadingStage = ref<'analyzing' | 'searching' | 'generating' | null>('analyzing')

const loadingText = computed(() => {
  switch (loadingStage.value) {
    case 'analyzing':
      return '正在分析您的问题...'
    case 'searching':
      return '正在搜索相关信息...'
    case 'generating':
      return '正在生成回答...'
    default:
      return ''
  }
})

async function processRequest() {
  loadingStage.value = 'analyzing'
  await new Promise(resolve => setTimeout(resolve, 1000))

  loadingStage.value = 'searching'
  await new Promise(resolve => setTimeout(resolve, 1500))

  loadingStage.value = 'generating'
  await new Promise(resolve => setTimeout(resolve, 2000))

  loadingStage.value = null
}
<\/script>

<template>
  <div>
    <Shimmer v-if="loadingStage">
      {{ loadingText }}
    </Shimmer>
    <div v-else>
      处理完成！
    </div>
  </div>
</template>
\`\`\`

### 场景 4：带图标的加载提示

结合图标组件，提供更丰富的视觉效果。

\`\`\`vue
<script setup lang="ts">
import { Shimmer } from '@/components/ai-elements/shimmer'
import { Loader2 } from 'lucide-vue-next'
import { ref } from 'vue'

const isLoading = ref(true)
<\/script>

<template>
  <div class="flex items-center gap-2">
    <Loader2 v-if="isLoading" class="size-4 animate-spin" />
    <Shimmer v-if="isLoading">
      正在处理您的请求...
    </Shimmer>
  </div>
</template>
\`\`\`

### 场景 5：居中显示的加载状态

在页面或容器中心显示加载提示。

\`\`\`vue
<script setup lang="ts">
import { Shimmer } from '@/components/ai-elements/shimmer'
<\/script>

<template>
  <div class="flex items-center justify-center min-h-[200px]">
    <Shimmer>
      正在加载内容...
    </Shimmer>
  </div>
</template>
\`\`\`

---

## 完整示例

以下是一个完整的 AI 对话场景示例，展示 Shimmer 在实际应用中的使用：

\`\`\`vue
<script setup lang="ts">
import { Shimmer } from '@/components/ai-elements/shimmer'
import { ref } from 'vue'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  isGenerating?: boolean
}

const messages = ref<Message[]>([])
const userInput = ref('')
const isGenerating = ref(false)

async function sendMessage() {
  if (!userInput.value.trim()) return

  // 添加用户消息
  messages.value.push({
    id: Date.now().toString(),
    role: 'user',
    content: userInput.value
  })

  const input = userInput.value
  userInput.value = ''

  // 添加 AI 消息占位符
  const aiMessageId = (Date.now() + 1).toString()
  messages.value.push({
    id: aiMessageId,
    role: 'assistant',
    content: '',
    isGenerating: true
  })

  isGenerating.value = true

  // 模拟准备阶段
  await new Promise(resolve => setTimeout(resolve, 1000))

  // 模拟流式生成
  const response = \`这是对"\${input}"的回答。AI 正在分析您的问题并生成详细的回答内容。\`
  const aiMessage = messages.value.find(m => m.id === aiMessageId)

  if (aiMessage) {
    for (let i = 0; i < response.length; i++) {
      aiMessage.content += response[i]
      await new Promise(resolve => setTimeout(resolve, 30))
    }
    aiMessage.isGenerating = false
  }

  isGenerating.value = false
}
<\/script>

<template>
  <div class="flex flex-col h-full">
    <!-- 消息列表 -->
    <div class="flex-1 overflow-y-auto p-4 space-y-4">
      <div
        v-for="message in messages"
        :key="message.id"
        :class="[
          'p-3 rounded-lg',
          message.role === 'user' ? 'bg-blue-100 ml-auto max-w-[80%]' : 'bg-gray-100 mr-auto max-w-[80%]'
        ]"
      >
        <div v-if="message.isGenerating">
          <Shimmer>正在生成回答...</Shimmer>
        </div>
        <div v-else>{{ message.content }}</div>
      </div>
    </div>

    <!-- 输入框 -->
    <div class="p-4 border-t">
      <div class="flex gap-2">
        <input
          v-model="userInput"
          type="text"
          placeholder="输入您的问题..."
          class="flex-1 px-3 py-2 border rounded"
          :disabled="isGenerating"
          @keyup.enter="sendMessage"
        />
        <button
          @click="sendMessage"
          :disabled="isGenerating || !userInput.trim()"
          class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          发送
        </button>
      </div>
    </div>
  </div>
</template>
\`\`\`

---

## 样式自定义

Shimmer 组件支持通过 class 进行样式自定义：

\`\`\`vue
<!-- 自定义文本大小 -->
<Shimmer class="text-lg">
  正在生成...
</Shimmer>

<!-- 自定义文本颜色（覆盖默认颜色） -->
<Shimmer class="text-blue-400">
  正在处理...
</Shimmer>

<!-- 自定义字体粗细 -->
<Shimmer class="font-semibold">
  加载中...
</Shimmer>

<!-- 组合多个样式 -->
<Shimmer class="text-xl font-bold text-purple-400">
  AI 思考中...
</Shimmer>
\`\`\`

---

## 常见用法建议

1. **简洁明了**：提示文本应简短清晰，让用户快速了解当前状态
2. **状态切换**：使用 \`v-if\` 或 \`v-show\` 根据加载状态显示/隐藏 Shimmer
3. **配合其他组件**：可以与图标、进度条等组件组合使用，提供更丰富的反馈
4. **避免过度使用**：仅在必要的加载场景使用，避免影响用户体验
5. **语义化文本**：根据实际场景使用合适的提示文本（如"生成中"、"加载中"、"处理中"等）
6. **响应式设计**：在移动端考虑文本长度和显示位置
7. **无障碍支持**：为加载状态添加适当的 \`aria-live\` 属性，方便屏幕阅读器用户
8. **超时处理**：对于长时间加载，考虑添加超时提示或取消功能

---

## 与其他加载组件的对比

| 组件 | 适用场景 | 特点 |
| --- | --- | --- |
| \`Shimmer\` | 文本加载提示 | 轻量级，闪烁动画，适合短文本 |
| \`Skeleton\` | 内容骨架屏 | 模拟内容结构，适合复杂布局 |
| \`Spinner\` | 通用加载指示器 | 旋转动画，适合按钮或小区域 |
| \`ProgressBar\` | 进度展示 | 显示具体进度，适合可量化的任务 |

选择建议：
- 简单的文本提示 → 使用 \`Shimmer\`
- 复杂的内容加载 → 使用 \`Skeleton\`
- 按钮或小区域加载 → 使用 \`Spinner\`
- 需要显示进度 → 使用 \`ProgressBar\`
`
</script>

<style lang="scss" scoped>
.guide-container {
  min-width: 900px;
  padding: 0 16px;
}
</style>
