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
# Suggestion（建议提示）组件说明

本页说明基于示例页 \`example.vue\` 中的组合方式，覆盖每个组件的作用、主要 Props/Slots，以及推荐用法。

## 组件清单（示例里用到）

- \`Suggestions\`：建议列表容器，提供网格布局和滚动支持
- \`Suggestion\`：单个建议项，可点击的卡片样式

## 组件关系与约束

- \`Suggestion\` 通常放在 \`Suggestions\` 容器内使用
- \`Suggestions\` 提供响应式网格布局，自动适配不同屏幕尺寸
- 建议项支持点击事件，用于触发相应的操作

---

## Suggestions

**作用**

- 作为建议列表的容器组件，提供网格布局
- 支持响应式设计，自动调整列数
- 提供垂直滚动支持，适合展示多个建议项

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**布局特性**

- 默认使用网格布局（Grid）
- 响应式列数：
  - 小屏幕：1 列
  - 中等屏幕：2 列
  - 大屏幕：3-4 列
- 自动间距和对齐
- 支持垂直滚动

**用法**

\`\`\`vue
<Suggestions>
  <Suggestion
    v-for="item in suggestions"
    :key="item"
    :suggestion="item"
    @click="handleClick"
  />
</Suggestions>
\`\`\`

---

## Suggestion

**作用**

- 显示单个建议项，提供卡片样式和悬停效果
- 支持点击交互，触发相应的操作
- 自动处理文本溢出和换行

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`suggestion\` | \`string\` | 建议文本内容 |
| \`class\` | \`string \\| any\` | 额外样式类 |

**事件**

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| \`click\` | \`(suggestion: string)\` | 点击建议项时触发，传递建议文本 |

**Slots**

| 插槽 | 说明 |
| --- | --- |
| 默认插槽 | 自定义建议项内容（不传则使用 \`suggestion\` prop） |

**样式特性**

- 卡片样式，带边框和圆角
- 悬停时显示阴影效果
- 点击时有视觉反馈
- 文本自动换行，支持多行显示

**用法**

\`\`\`vue
<!-- 使用 suggestion prop -->
<Suggestion
  suggestion="什么是人工智能？"
  @click="handleSuggestionClick"
/>

<!-- 使用插槽自定义内容 -->
<Suggestion @click="handleSuggestionClick">
  <div class="flex items-center gap-2">
    <Icon name="sparkles" />
    <span>什么是人工智能？</span>
  </div>
</Suggestion>
\`\`\`

---

## 使用场景

### 场景 1：AI 对话启动建议

在对话开始前，展示常见问题建议，帮助用户快速开始对话。

\`\`\`vue
<script setup lang="ts">
import { Suggestion, Suggestions } from '@/components/ai-elements/suggestion'
import { ref } from 'vue'

const suggestions = [
  '什么是人工智能的最新趋势？',
  '机器学习是如何工作的？',
  '解释量子计算',
  'React 开发的最佳实践',
  '告诉我 TypeScript 的优势',
  '如何优化数据库查询？',
]

const messages = ref<Array<{ role: string; content: string }>>([])
const showSuggestions = ref(true)

function handleSuggestionClick(suggestion: string) {
  // 添加用户消息
  messages.value.push({
    role: 'user',
    content: suggestion
  })

  // 隐藏建议
  showSuggestions.value = false

  // 开始生成 AI 回答
  generateResponse(suggestion)
}

async function generateResponse(question: string) {
  // 模拟 AI 响应
  await new Promise(resolve => setTimeout(resolve, 1000))
  messages.value.push({
    role: 'assistant',
    content: \`这是对"\${question}"的回答...\`
  })
}
<\/script>

<template>
  <div>
    <!-- 建议列表 -->
    <Suggestions v-if="showSuggestions && messages.length === 0">
      <Suggestion
        v-for="suggestion in suggestions"
        :key="suggestion"
        :suggestion="suggestion"
        @click="handleSuggestionClick"
      />
    </Suggestions>

    <!-- 对话消息 -->
    <div v-else class="space-y-4">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="message.role === 'user' ? 'text-right' : 'text-left'"
      >
        {{ message.content }}
      </div>
    </div>
  </div>
</template>
\`\`\`

### 场景 2：分类建议

根据不同类别展示建议，帮助用户按主题浏览。

\`\`\`vue
<script setup lang="ts">
import { Suggestion, Suggestions } from '@/components/ai-elements/suggestion'
import { ref } from 'vue'

const categories = [
  {
    title: '技术问题',
    suggestions: [
      '如何学习 Vue 3？',
      'TypeScript 和 JavaScript 的区别',
      '什么是响应式编程？'
    ]
  },
  {
    title: '产品咨询',
    suggestions: [
      '如何使用这个功能？',
      '有哪些定价方案？',
      '如何联系客服？'
    ]
  },
  {
    title: '常见问题',
    suggestions: [
      '如何重置密码？',
      '如何导出数据？',
      '支持哪些浏览器？'
    ]
  }
]

const selectedCategory = ref(0)

function handleSuggestionClick(suggestion: string) {
  console.log('选择了建议:', suggestion)
}
<\/script>

<template>
  <div class="space-y-4">
    <!-- 分类标签 -->
    <div class="flex gap-2">
      <button
        v-for="(category, index) in categories"
        :key="index"
        @click="selectedCategory = index"
        :class="[
          'px-4 py-2 rounded',
          selectedCategory === index
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700'
        ]"
      >
        {{ category.title }}
      </button>
    </div>

    <!-- 建议列表 -->
    <Suggestions>
      <Suggestion
        v-for="suggestion in categories[selectedCategory].suggestions"
        :key="suggestion"
        :suggestion="suggestion"
        @click="handleSuggestionClick"
      />
    </Suggestions>
  </div>
</template>
\`\`\`

### 场景 3：动态建议

根据用户输入或上下文动态生成建议。

\`\`\`vue
<script setup lang="ts">
import { Suggestion, Suggestions } from '@/components/ai-elements/suggestion'
import { ref, computed } from 'vue'

const userInput = ref('')

const allSuggestions = [
  '什么是 Vue 3 的 Composition API？',
  '如何使用 Vue Router？',
  'Vue 和 React 的区别',
  'TypeScript 类型系统',
  'JavaScript 异步编程',
  'Node.js 最佳实践',
]

// 根据输入过滤建议
const filteredSuggestions = computed(() => {
  if (!userInput.value) return allSuggestions

  return allSuggestions.filter(s =>
    s.toLowerCase().includes(userInput.value.toLowerCase())
  )
})

function handleSuggestionClick(suggestion: string) {
  userInput.value = suggestion
  // 提交查询
  submitQuery(suggestion)
}

function submitQuery(query: string) {
  console.log('提交查询:', query)
}
<\/script>

<template>
  <div class="space-y-4">
    <!-- 输入框 -->
    <input
      v-model="userInput"
      type="text"
      placeholder="输入您的问题..."
      class="w-full px-4 py-2 border rounded"
    />

    <!-- 动态建议 -->
    <Suggestions v-if="filteredSuggestions.length > 0">
      <Suggestion
        v-for="suggestion in filteredSuggestions"
        :key="suggestion"
        :suggestion="suggestion"
        @click="handleSuggestionClick"
      />
    </Suggestions>

    <div v-else class="text-gray-500 text-center py-4">
      没有找到相关建议
    </div>
  </div>
</template>
\`\`\`

### 场景 4：带图标的建议

为建议项添加图标，提供更丰富的视觉效果。

\`\`\`vue
<script setup lang="ts">
import { Suggestion, Suggestions } from '@/components/ai-elements/suggestion'
import { Sparkles, Code, Database, Cloud } from 'lucide-vue-next'

const suggestions = [
  { text: '什么是人工智能？', icon: Sparkles },
  { text: '如何学习编程？', icon: Code },
  { text: '数据库优化技巧', icon: Database },
  { text: '云计算基础知识', icon: Cloud },
]

function handleSuggestionClick(suggestion: string) {
  console.log('选择了:', suggestion)
}
<\/script>

<template>
  <Suggestions>
    <Suggestion
      v-for="item in suggestions"
      :key="item.text"
      @click="() => handleSuggestionClick(item.text)"
    >
      <div class="flex items-center gap-2">
        <component :is="item.icon" class="size-4 text-blue-500" />
        <span>{{ item.text }}</span>
      </div>
    </Suggestion>
  </Suggestions>
</template>
\`\`\`

### 场景 5：空状态建议

在没有内容时显示建议，引导用户开始使用。

\`\`\`vue
<script setup lang="ts">
import { Suggestion, Suggestions } from '@/components/ai-elements/suggestion'
import { ref } from 'vue'

const hasContent = ref(false)

const suggestions = [
  '创建第一个项目',
  '导入现有数据',
  '查看使用教程',
  '浏览示例模板',
]

function handleSuggestionClick(suggestion: string) {
  console.log('开始:', suggestion)
  hasContent.value = true
}
<\/script>

<template>
  <div>
    <div v-if="!hasContent" class="flex flex-col items-center justify-center min-h-[400px] space-y-6">
      <div class="text-center">
        <h2 class="text-2xl font-bold mb-2">欢迎使用</h2>
        <p class="text-gray-600">选择一个选项开始</p>
      </div>

      <Suggestions class="max-w-2xl">
        <Suggestion
          v-for="suggestion in suggestions"
          :key="suggestion"
          :suggestion="suggestion"
          @click="handleSuggestionClick"
        />
      </Suggestions>
    </div>

    <div v-else>
      <!-- 内容区域 -->
      <p>已开始使用...</p>
    </div>
  </div>
</template>
\`\`\`

---

## 完整示例

以下是一个完整的 AI 助手场景示例，展示建议组件的实际应用：

\`\`\`vue
<script setup lang="ts">
import { Suggestion, Suggestions } from '@/components/ai-elements/suggestion'
import { ref, computed } from 'vue'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const messages = ref<Message[]>([])
const isGenerating = ref(false)

const suggestions = [
  '什么是人工智能的最新趋势？',
  '机器学习是如何工作的？',
  '解释量子计算',
  'React 开发的最佳实践',
  '告诉我 TypeScript 的优势',
  '如何优化数据库查询？',
  'SQL 和 NoSQL 的区别是什么？',
  '解释云计算基础知识',
]

// 只在没有消息时显示建议
const showSuggestions = computed(() => messages.value.length === 0 && !isGenerating.value)

async function handleSuggestionClick(suggestion: string) {
  // 添加用户消息
  messages.value.push({
    id: Date.now().toString(),
    role: 'user',
    content: suggestion
  })

  isGenerating.value = true

  // 模拟 AI 生成延迟
  await new Promise(resolve => setTimeout(resolve, 1000))

  // 添加 AI 回答
  messages.value.push({
    id: (Date.now() + 1).toString(),
    role: 'assistant',
    content: \`这是对"\${suggestion}"的详细回答。AI 会根据问题提供相关的信息和建议。\`
  })

  isGenerating.value = false
}

function resetChat() {
  messages.value = []
  isGenerating.value = false
}
<\/script>

<template>
  <div class="flex flex-col h-full">
    <!-- 标题栏 -->
    <div class="p-4 border-b flex items-center justify-between">
      <h1 class="text-xl font-bold">AI 助手</h1>
      <button
        v-if="messages.length > 0"
        @click="resetChat"
        class="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
      >
        重新开始
      </button>
    </div>

    <!-- 内容区域 -->
    <div class="flex-1 overflow-y-auto p-4">
      <!-- 欢迎页和建议 -->
      <div v-if="showSuggestions" class="flex flex-col items-center justify-center min-h-full space-y-6">
        <div class="text-center">
          <h2 class="text-2xl font-bold mb-2">👋 你好！</h2>
          <p class="text-gray-600">我是 AI 助手，选择一个问题开始对话</p>
        </div>

        <Suggestions class="max-w-3xl w-full">
          <Suggestion
            v-for="suggestion in suggestions"
            :key="suggestion"
            :suggestion="suggestion"
            @click="handleSuggestionClick"
          />
        </Suggestions>
      </div>

      <!-- 消息列表 -->
      <div v-else class="space-y-4">
        <div
          v-for="message in messages"
          :key="message.id"
          :class="[
            'p-4 rounded-lg max-w-[80%]',
            message.role === 'user'
              ? 'bg-blue-100 ml-auto'
              : 'bg-gray-100 mr-auto'
          ]"
        >
          {{ message.content }}
        </div>

        <div v-if="isGenerating" class="p-4 rounded-lg bg-gray-100 max-w-[80%]">
          <div class="flex items-center gap-2">
            <div class="animate-pulse">正在生成回答...</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
\`\`\`

---

## 样式自定义

Suggestion 组件支持通过 class 进行样式自定义：

\`\`\`vue
<!-- 自定义建议项大小 -->
<Suggestion
  suggestion="问题"
  class="p-6 text-lg"
  @click="handleClick"
/>

<!-- 自定义颜色主题 -->
<Suggestion
  suggestion="问题"
  class="bg-blue-50 border-blue-200 hover:bg-blue-100"
  @click="handleClick"
/>

<!-- 自定义圆角 -->
<Suggestion
  suggestion="问题"
  class="rounded-xl"
  @click="handleClick"
/>

<!-- 自定义容器布局 -->
<Suggestions class="grid-cols-2 gap-4">
  <Suggestion
    v-for="item in items"
    :key="item"
    :suggestion="item"
    @click="handleClick"
  />
</Suggestions>
\`\`\`

---

## 常见用法建议

1. **合理数量**：建议项数量控制在 4-8 个，避免选择困难
2. **清晰文案**：建议文本应简洁明了，让用户快速理解
3. **分类组织**：对于大量建议，使用分类或标签进行组织
4. **响应式设计**：确保在不同屏幕尺寸下都有良好的显示效果
5. **视觉反馈**：点击时提供明确的视觉反馈，让用户知道操作已触发
6. **动态更新**：根据上下文或用户行为动态更新建议内容
7. **无障碍支持**：为建议项添加适当的 \`aria-label\`，方便屏幕阅读器用户
8. **加载状态**：如果建议需要异步加载，提供加载状态提示
9. **空状态处理**：当没有建议时，显示友好的空状态提示
10. **键盘导航**：考虑添加键盘导航支持，提升可访问性

---

## 最佳实践

### 建议内容设计

- **具体明确**：避免模糊的建议，如"了解更多"，应该是"了解 Vue 3 新特性"
- **行动导向**：使用动词开头，如"查看"、"学习"、"创建"等
- **用户视角**：从用户需求出发，提供真正有价值的建议
- **多样性**：提供不同类型和难度的建议，满足不同用户需求

### 交互设计

- **即时反馈**：点击后立即响应，避免延迟
- **状态保持**：记住用户的选择，避免重复显示相同建议
- **渐进式展示**：对于大量建议，考虑分页或懒加载
- **智能推荐**：基于用户历史行为推荐相关建议

### 性能优化

- **虚拟滚动**：对于大量建议项，使用虚拟滚动优化性能
- **懒加载**：延迟加载非首屏建议项
- **缓存策略**：缓存常用建议，减少重复请求
- **防抖处理**：对于动态搜索建议，使用防抖避免频繁请求
`
</script>

<style lang="scss" scoped>
.guide-container {
  min-width: 900px;
  padding: 0 16px;
}
</style>
