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
# Reasoning（推理过程）组件说明

本页说明基于示例页 \`example.vue\` 中的组合方式，覆盖每个组件的作用、主要 Props/Slots，以及推荐用法。

## 组件清单（示例里用到）

- \`Reasoning\`：推理过程容器，提供折叠状态管理和流式状态控制
- \`ReasoningTrigger\`：折叠触发器，显示"思考中"或"查看推理过程"
- \`ReasoningContent\`：推理内容展示区域，支持流式内容渲染

## 组件关系与约束

- \`ReasoningTrigger\` 和 \`ReasoningContent\` 必须放在 \`Reasoning\` 内使用，依赖其提供的折叠状态上下文
- \`Reasoning\` 组件会根据 \`isStreaming\` prop 自动控制展开/收起状态
- 流式传输时自动展开，传输结束后自动收起

---

## Reasoning

**作用**

- 作为推理过程的容器组件，提供折叠状态管理
- 根据流式状态（\`isStreaming\`）自动控制展开/收起
- 提供上下文给子组件使用

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`isStreaming\` | \`boolean\` | 是否正在流式传输（控制自动展开/收起） |
| \`defaultOpen\` | \`boolean\` | 默认是否展开（非流式状态下的初始状态） |
| \`class\` | \`string \\| any\` | 额外样式类 |

**行为特性**

- 当 \`isStreaming\` 为 \`true\` 时，组件自动展开
- 当 \`isStreaming\` 从 \`true\` 变为 \`false\` 时，组件自动收起
- 用户可以手动点击触发器来展开/收起内容

**用法**

\`\`\`vue
<Reasoning :is-streaming="isStreaming">
  <ReasoningTrigger />
  <ReasoningContent :content="content" />
</Reasoning>
\`\`\`

---

## ReasoningTrigger

**作用**

- 作为折叠触发器，显示当前状态的提示文本
- 流式传输时显示"思考中..."
- 非流式状态时显示"查看推理过程"
- 点击可切换展开/收起状态

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**Slots**

| 插槽 | 说明 |
| --- | --- |
| 默认插槽 | 自定义触发器内容（不传则使用默认文本） |

**默认行为**

- 流式传输中：显示"思考中..."和旋转图标
- 已完成：显示"查看推理过程"和展开/收起箭头

**用法**

\`\`\`vue
<!-- 使用默认样式 -->
<ReasoningTrigger />

<!-- 自定义内容 -->
<ReasoningTrigger>
  <span>AI 正在分析...</span>
</ReasoningTrigger>
\`\`\`

---

## ReasoningContent

**作用**

- 展示推理过程的内容区域
- 支持流式内容渲染
- 与折叠状态联动，展开时显示，收起时隐藏

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`content\` | \`string\` | 推理过程的文本内容 |
| \`class\` | \`string \\| any\` | 额外样式类 |

**Slots**

| 插槽 | 说明 |
| --- | --- |
| 默认插槽 | 自定义内容渲染（不传则使用 \`content\` prop） |

**用法**

\`\`\`vue
<!-- 使用 content prop -->
<ReasoningContent :content="reasoningText" />

<!-- 使用插槽自定义渲染 -->
<ReasoningContent>
  <div v-html="formattedContent"></div>
</ReasoningContent>
\`\`\`

---

## 使用场景

### 场景 1：AI 推理过程展示

在 AI 生成回答时，展示其推理过程，让用户了解 AI 的思考步骤。

\`\`\`vue
<script setup lang="ts">
import { Reasoning, ReasoningContent, ReasoningTrigger } from '@/components/ai-elements/reasoning'
import { ref } from 'vue'

const reasoningContent = ref('')
const isStreaming = ref(false)

async function generateResponse() {
  isStreaming.value = true
  reasoningContent.value = ''

  // 模拟流式推理过程
  const steps = [
    '让我逐步思考这个问题。',
    '\\n\\n首先，我需要理解用户的需求。',
    '\\n\\n然后，我会分析可能的解决方案。',
    '\\n\\n最后，我会给出最佳建议。'
  ]

  for (const step of steps) {
    await new Promise(resolve => setTimeout(resolve, 500))
    reasoningContent.value += step
  }

  isStreaming.value = false
}
<\/script>

<template>
  <Reasoning :is-streaming="isStreaming">
    <ReasoningTrigger />
    <ReasoningContent :content="reasoningContent" />
  </Reasoning>

  <button @click="generateResponse">开始生成</button>
</template>
\`\`\`

### 场景 2：逐字符流式渲染

模拟真实的 AI 流式输出效果，逐字符或逐词渲染推理内容。

\`\`\`vue
<script setup lang="ts">
import { Reasoning, ReasoningContent, ReasoningTrigger } from '@/components/ai-elements/reasoning'
import { ref } from 'vue'

const content = ref('')
const isStreaming = ref(false)
const tokens = ref<string[]>([])
const currentIndex = ref(0)

// 将文本分割成 token
function chunkIntoTokens(text: string): string[] {
  const tokenArray: string[] = []
  let i = 0
  while (i < text.length) {
    const chunkSize = Math.floor(Math.random() * 2) + 3
    tokenArray.push(text.slice(i, i + chunkSize))
    i += chunkSize
  }
  return tokenArray
}

// 流式渲染 token
function streamToken() {
  if (!isStreaming.value || currentIndex.value >= tokens.value.length) {
    if (isStreaming.value) {
      isStreaming.value = false
    }
    return
  }

  content.value += tokens.value[currentIndex.value]
  currentIndex.value++

  setTimeout(streamToken, 25)
}

function startStreaming(text: string) {
  tokens.value = chunkIntoTokens(text)
  content.value = ''
  currentIndex.value = 0
  isStreaming.value = true
  streamToken()
}
<\/script>

<template>
  <Reasoning :is-streaming="isStreaming">
    <ReasoningTrigger />
    <ReasoningContent :content="content" />
  </Reasoning>
</template>
\`\`\`

### 场景 3：自定义触发器和内容样式

根据业务需求自定义触发器文本和内容渲染方式。

\`\`\`vue
<script setup lang="ts">
import { Reasoning, ReasoningContent, ReasoningTrigger } from '@/components/ai-elements/reasoning'
import { ref, computed } from 'vue'

const reasoningSteps = ref([
  { step: 1, text: '分析问题背景' },
  { step: 2, text: '收集相关信息' },
  { step: 3, text: '评估可行方案' },
  { step: 4, text: '得出结论' }
])
const isStreaming = ref(false)
const currentStep = ref(0)

const formattedContent = computed(() => {
  return reasoningSteps.value
    .slice(0, currentStep.value)
    .map(s => \`步骤 \${s.step}: \${s.text}\`)
    .join('\\n\\n')
})
<\/script>

<template>
  <Reasoning :is-streaming="isStreaming">
    <ReasoningTrigger>
      <span v-if="isStreaming">🤔 AI 正在深度思考...</span>
      <span v-else>💡 查看思考过程</span>
    </ReasoningTrigger>

    <ReasoningContent>
      <div class="space-y-2"></div>      <div
          v-for="step in reasoningSteps.slice(0, currentStep)"
          :key="step.step"
          class="p-2 bg-gray-50 rounded"
        >
          <strong>步骤 {{ step.step }}:</strong> {{ step.text }}
        </div>
      </div>
    </ReasoningContent>
  </Reasoning>
</template>
\`\`\`

---

## 完整示例

以下是一个完整的推理过程展示示例，包含流式渲染和状态管理：

\`\`\`vue
<script setup lang="ts">
import { Reasoning, ReasoningContent, ReasoningTrigger } from '@/components/ai-elements/reasoning'
import { onMounted, ref } from 'vue'

const reasoningSteps = [
  '让我逐步思考这个问题。',
  '\\n\\n首先，我需要理解用户的具体需求。',
  '\\n\\n用户希望有一个推理组件，能在流式传输开始时自动展开，结束时自动收起。',
  '\\n\\n这个组件应该是可组合的，并遵循代码库中的现有模式。',
  '\\n\\n看起来使用带有状态管理的可折叠组件是正确的方法。',
].join('')

const content = ref('')
const isStreaming = ref(false)
const currentTokenIndex = ref(0)
const tokens = ref<string[]>([])

// 将文本分割成随机大小的 token
function chunkIntoTokens(text: string): string[] {
  const tokenArray: string[] = []
  let i = 0
  while (i < text.length) {
    const chunkSize = Math.floor(Math.random() * 2) + 3
    tokenArray.push(text.slice(i, i + chunkSize))
    i += chunkSize
  }
  return tokenArray
}

// 流式渲染单个 token
function streamToken() {
  if (!isStreaming.value || currentTokenIndex.value >= tokens.value.length) {
    if (isStreaming.value) {
      isStreaming.value = false
    }
    return
  }

  content.value += tokens.value[currentTokenIndex.value]
  currentTokenIndex.value++

  setTimeout(streamToken, 25)
}

// 开始模拟流式传输
function startSimulation() {
  tokens.value = chunkIntoTokens(reasoningSteps)
  content.value = ''
  currentTokenIndex.value = 0
  isStreaming.value = true
  streamToken()
}

onMounted(() => {
  startSimulation()
})
<\/script>

<template>
  <div class="w-full p-4">
    <Reasoning class="w-full" :is-streaming="isStreaming">
      <ReasoningTrigger />
      <ReasoningContent :content="content" />
    </Reasoning>

    <button
      @click="startSimulation"
      class="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
    >
      重新开始
    </button>
  </div>
</template>
\`\`\`

---

## 常见用法建议

1. **自动状态管理**：利用 \`isStreaming\` prop 实现自动展开/收起，无需手动控制折叠状态
2. **流式渲染优化**：使用 \`setTimeout\` 或 \`requestAnimationFrame\` 控制渲染频率，避免性能问题
3. **Token 分割策略**：根据实际需求选择合适的 token 分割方式（按字符、按词、按句子等）
4. **内容格式化**：推理内容通常包含换行和段落，注意保留格式或使用 Markdown 渲染
5. **用户体验**：流式传输时禁用触发器点击，避免用户误操作打断流程
6. **错误处理**：在流式传输失败时，确保 \`isStreaming\` 状态正确重置
7. **可访问性**：为触发器添加适当的 \`aria-label\`，说明当前状态和操作
8. **性能考虑**：对于长文本推理过程，考虑使用虚拟滚动或分页展示
`
</script>

<style lang="scss" scoped>
.guide-container {
  min-width: 900px;
  padding: 0 16px;
}
</style>
