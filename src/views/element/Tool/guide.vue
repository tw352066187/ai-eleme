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
# Tool（工具调用）组件说明

本页说明基于示例页 \`example.vue\` 中的组合方式，覆盖每个组件的作用、主要 Props/Slots，以及推荐用法。

## 组件清单（示例里用到）

- \`Tool\`：工具调用容器，提供折叠状态管理
- \`ToolHeader\`：工具头部，显示工具名称、类型和状态
- \`ToolContent\`：工具内容区域，包含输入、输出和确认信息
- \`ToolInput\`：工具输入参数展示
- \`ToolOutput\`：工具输出结果展示

## 组件关系与约束

- \`ToolHeader\` 和 \`ToolContent\` 必须放在 \`Tool\` 内使用
- \`ToolInput\` 和 \`ToolOutput\` 通常放在 \`ToolContent\` 内使用
- 工具调用通常配合 \`Confirmation\` 组件使用，用于需要用户确认的操作

---

## Tool

**作用**

- 作为工具调用的容器组件，提供折叠状态管理
- 支持展开/收起工具详情
- 提供上下文给子组件使用

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`defaultOpen\` | \`boolean\` | 默认是否展开（默认 \`false\`） |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<Tool default-open>
  <ToolHeader state="output-available" type="tool-database_query" />
  <ToolContent>
    <ToolInput :input="inputData" />
    <ToolOutput :output="outputData" />
  </ToolContent>
</Tool>
\`\`\`

---

## ToolHeader

**作用**

- 显示工具的名称、类型和当前状态
- 作为折叠触发器，点击可展开/收起工具详情
- 根据状态显示不同的图标和样式

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`state\` | \`ExtendedToolState\` | 工具状态（必填） |
| \`type\` | \`string\` | 工具类型标识（必填） |
| \`title\` | \`string\` | 工具显示名称（可选，不传则从 type 提取） |
| \`class\` | \`string \\| any\` | 额外样式类 |

**工具状态（ExtendedToolState）**

| 状态 | 说明 |
| --- | --- |
| \`input-streaming\` | 输入参数流式传输中 |
| \`input-available\` | 输入参数已就绪 |
| \`approval-requested\` | 等待用户确认 |
| \`approval-responded\` | 用户已确认 |
| \`output-streaming\` | 输出结果流式传输中 |
| \`output-available\` | 输出结果已就绪 |
| \`output-error\` | 执行出错 |
| \`output-denied\` | 用户拒绝执行 |

**用法**

\`\`\`vue
<!-- 使用 title prop -->
<ToolHeader
  state="output-available"
  title="数据库查询"
  type="tool-database_query"
/>

<!-- 自动从 type 提取名称 -->
<ToolHeader
  state="input-streaming"
  type="tool-database_query"
/>
\`\`\`

---

## ToolContent

**作用**

- 工具详情的内容区域，与折叠状态联动
- 展开时显示，收起时隐藏
- 包含工具的输入参数、输出结果和确认信息

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<ToolContent>
  <ToolInput :input="inputData" />
  <Confirmation>...</Confirmation>
  <ToolOutput :output="outputData" />
</ToolContent>
\`\`\`

---

## ToolInput

**作用**

- 显示工具调用的输入参数
- 支持 JSON 格式化展示
- 自动处理空对象和复杂数据结构

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`input\` | \`Record<string, any>\` | 输入参数对象（必填） |
| \`class\` | \`string \\| any\` | 额外样式类 |

**显示特性**

- 自动 JSON 格式化，缩进 2 个空格
- 空对象时显示提示信息
- 支持语法高亮（如果配置）
- 代码块样式，易于阅读

**用法**

\`\`\`vue
<ToolInput
  :input="{
    query: 'SELECT * FROM users',
    params: ['2024-01-01'],
    database: 'analytics'
  }"
/>
\`\`\`

---

## ToolOutput

**作用**

- 显示工具执行的输出结果
- 支持成功结果和错误信息展示
- 自动处理不同类型的输出数据

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`output\` | \`string \\| undefined\` | 输出结果（可选） |
| \`errorText\` | \`string \\| undefined\` | 错误信息（可选） |
| \`class\` | \`string \\| any\` | 额外样式类 |

**显示逻辑**

- 如果有 \`errorText\`，显示错误信息（红色样式）
- 如果有 \`output\`，显示输出结果
- 支持 Markdown 格式的输出（如表格）
- 代码块样式，易于阅读

**用法**

\`\`\`vue
<!-- 成功输出 -->
<ToolOutput
  :output="'Query executed successfully. 5 rows returned.'"
/>

<!-- 错误输出 -->
<ToolOutput
  :output="undefined"
  error-text="Connection timeout: Unable to reach database server"
/>
\`\`\`

---

## 数据结构说明

### ToolUIPart（工具调用数据）

\`\`\`ts
interface ToolUIPart {
  type: string                    // 工具类型，如 'tool-database_query'
  toolCallId: string              // 工具调用唯一标识
  state: ExtendedToolState        // 工具状态
  input: Record<string, any>      // 输入参数
  output?: string                 // 输出结果
  errorText?: string              // 错误信息
}
\`\`\`

---

## 使用场景

### 场景 1：数据库查询工具

展示数据库查询工具的完整流程，包括输入、确认和输出。

\`\`\`vue
<script setup lang="ts">
import type { ToolUIPart } from 'ai'
import {
  Confirmation,
  ConfirmationAccepted,
  ConfirmationAction,
  ConfirmationActions,
  ConfirmationRejected,
  ConfirmationRequest,
  ConfirmationTitle,
} from '@/components/ai-elements/confirmation'
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from '@/components/ai-elements/tool'
import { CheckIcon, XIcon } from 'lucide-vue-next'
import { nanoid } from 'nanoid'
import { ref } from 'vue'

const toolCall = ref<ToolUIPart>({
  type: 'tool-database_query',
  toolCallId: nanoid(),
  state: 'output-available',
  input: {
    query: 'SELECT COUNT(*) FROM users WHERE created_at >= ?',
    params: ['2024-01-01'],
    database: 'analytics',
  },
  output: \`| User ID | Name | Email | Created At |
|---------|------|-------|------------|
| 1 | John Doe | john@example.com | 2024-01-15 |
| 2 | Jane Smith | jane@example.com | 2024-01-20 |\`,
  errorText: undefined,
})
<\/script>

<template>
  <Tool>
    <ToolHeader :state="toolCall.state" :type="toolCall.type" />
    <ToolContent>
      <ToolInput :input="toolCall.input" />
      <Confirmation
        :approval="{ id: nanoid(), approved: true }"
        state="output-available"
      >
        <ConfirmationTitle>
          <ConfirmationRequest>
            此工具将在生产数据库上执行查询。
          </ConfirmationRequest>
          <ConfirmationAccepted>
            <CheckIcon class="size-4 text-green-600" />
            <span>已接受</span>
          </ConfirmationAccepted>
          <ConfirmationRejected>
            <XIcon class="size-4 text-red-600" />
            <span>已拒绝</span>
          </ConfirmationRejected>
        </ConfirmationTitle>
      </Confirmation>
      <ToolOutput
        v-if="toolCall.state === 'output-available'"
        :output="toolCall.output"
      />
    </ToolContent>
  </Tool>
</template>
\`\`\`

### 场景 2：工具状态流转

展示工具从输入到输出的完整状态流转过程。

\`\`\`vue
<script setup lang="ts">
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from '@/components/ai-elements/tool'
import { ref } from 'vue'

const toolStates = [
  { state: 'input-streaming', title: '输入流式传输中' },
  { state: 'input-available', title: '输入已就绪' },
  { state: 'approval-requested', title: '等待用户确认' },
  { state: 'approval-responded', title: '用户已确认' },
  { state: 'output-streaming', title: '输出流式传输中' },
  { state: 'output-available', title: '输出已就绪' },
]

const currentStateIndex = ref(0)

const toolInput = {
  action: 'search',
  query: 'Vue 3 composition API',
  limit: 10
}

const toolOutput = '找到 10 个相关结果...'
<\/script>

<template>
  <div class="space-y-4">
    <div class="flex gap-2">
      <button
        v-for="(item, index) in toolStates"
        :key="index"
        @click="currentStateIndex = index"
        :class="[
          'px-3 py-1 text-sm rounded',
          currentStateIndex === index
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200'
        ]"
      >
        {{ item.title }}
      </button>
    </div>

    <Tool default-open>
      <ToolHeader
        :state="toolStates[currentStateIndex].state"
        type="tool-search"
      />
      <ToolContent>
        <ToolInput :input="toolInput" />
        <ToolOutput
          v-if="currentStateIndex >= 5"
          :output="toolOutput"
        />
      </ToolContent>
    </Tool>
  </div>
</template>
\`\`\`

### 场景 3：错误处理

展示工具执行失败时的错误信息展示。

\`\`\`vue
<script setup lang="ts">
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from '@/components/ai-elements/tool'

const toolInput = {
  endpoint: 'https://api.example.com/data',
  method: 'GET',
  timeout: 5000
}

const errorText = '连接超时：无法访问服务器'
<\/script>

<template>
  <Tool default-open>
    <ToolHeader
      state="output-error"
      title="API 请求"
      type="tool-api_request"
    />
    <ToolContent>
      <ToolInput :input="toolInput" />
      <ToolOutput
        :output="undefined"
        :error-text="errorText"
      />
    </ToolContent>
  </Tool>
</template>
\`\`\`

### 场景 4：多工具调用

展示 AI 连续调用多个工具的场景。

\`\`\`vue
<script setup lang="ts">
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from '@/components/ai-elements/tool'
import { ref } from 'vue'

const tools = ref([
  {
    id: '1',
    type: 'tool-search',
    state: 'output-available',
    input: { query: 'Vue 3 新特性' },
    output: '找到 15 个相关结果'
  },
  {
    id: '2',
    type: 'tool-read_file',
    state: 'output-available',
    input: { path: 'docs/vue3.md' },
    output: '# Vue 3 新特性\\n\\n1. Composition API...'
  },
  {
    id: '3',
    type: 'tool-summarize',
    state: 'output-streaming',
    input: { text: '...', maxLength: 200 },
    output: undefined
  }
])
<\/script>

<template>
  <div class="space-y-4">
    <Tool
      v-for="tool in tools"
      :key="tool.id"
    >
      <ToolHeader :state="tool.state" :type="tool.type" />
      <ToolContent>
        <ToolInput :input="tool.input" />
        <ToolOutput
          v-if="tool.output"
          :output="tool.output"
        />
      </ToolContent>
    </Tool>
  </div>
</template>
\`\`\`

### 场景 5：需要确认的工具

展示需要用户确认才能执行的工具。

\`\`\`vue
<script setup lang="ts">
import {
  Confirmation,
  ConfirmationAccepted,
  ConfirmationAction,
  ConfirmationActions,
  ConfirmationRejected,
  ConfirmationRequest,
  ConfirmationTitle,
} from '@/components/ai-elements/confirmation'
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
} from '@/components/ai-elements/tool'
import { CheckIcon, XIcon } from 'lucide-vue-next'
import { nanoid } from 'nanoid'
import { ref } from 'vue'

const approval = ref({
  id: nanoid(),
  approved: undefined as boolean | undefined,
  reason: undefined as string | undefined
})

const state = ref<'approval-requested' | 'approval-responded'>('approval-requested')

const toolInput = {
  command: 'rm -rf /data/temp/*',
  directory: '/data/temp'
}

function handleApprove() {
  approval.value.approved = true
  state.value = 'approval-responded'
}

function handleReject() {
  approval.value.approved = false
  approval.value.reason = '操作风险过高'
  state.value = 'approval-responded'
}
<\/script>

<template>
  <Tool default-open>
    <ToolHeader
      :state="state"
      title="文件删除"
      type="tool-delete_files"
    />
    <ToolContent>
      <ToolInput :input="toolInput" />
      <Confirmation :approval="approval" :state="state">
        <ConfirmationTitle>
          <ConfirmationRequest>
            此操作将删除临时目录中的所有文件，是否继续？
          </ConfirmationRequest>
          <ConfirmationAccepted>
            <CheckIcon class="size-4 text-green-600" />
            <span>已批准</span>
          </ConfirmationAccepted>
          <ConfirmationRejected>
            <XIcon class="size-4 text-red-600" />
            <span>已拒绝：{{ approval.reason }}</span>
          </ConfirmationRejected>
        </ConfirmationTitle>

        <ConfirmationActions v-if="state === 'approval-requested'">
          <ConfirmationAction variant="outline" @click="handleReject">
            拒绝
          </ConfirmationAction>
          <ConfirmationAction variant="default" @click="handleApprove">
            批准
          </ConfirmationAction>
        </ConfirmationActions>
      </Confirmation>
    </ToolContent>
  </Tool>
</template>
\`\`\`

---

## 完整示例

以下是一个完整的 AI 工具调用场景示例：

\`\`\`vue
<script setup lang="ts">
import type { ToolUIPart } from 'ai'
import {
  Confirmation,
  ConfirmationAccepted,
  ConfirmationAction,
  ConfirmationActions,
  ConfirmationRejected,
  ConfirmationRequest,
  ConfirmationTitle,
} from '@/components/ai-elements/confirmation'
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from '@/components/ai-elements/tool'
import { CheckIcon, XIcon } from 'lucide-vue-next'
import { nanoid } from 'nanoid'
import { ref } from 'vue'

const tools = ref<ToolUIPart[]>([])
const isExecuting = ref(false)

async function executeTool() {
  isExecuting.value = true

  // 1. 输入流式传输
  const toolId = nanoid()
  const tool: ToolUIPart = {
    type: 'tool-database_query',
    toolCallId: toolId,
    state: 'input-streaming',
    input: {},
  }
  tools.value.push(tool)

  await new Promise(resolve => setTimeout(resolve, 500))

  // 2. 输入完成
  tool.input = {
    query: 'SELECT * FROM users WHERE active = true',
    database: 'production'
  }
  tool.state = 'input-available'

  await new Promise(resolve => setTimeout(resolve, 500))

  // 3. 请求确认
  tool.state = 'approval-requested'

  // 等待用户确认（这里自动确认）
  await new Promise(resolve => setTimeout(resolve, 2000))

  // 4. 用户确认
  tool.state = 'approval-responded'

  await new Promise(resolve => setTimeout(resolve, 500))

  // 5. 输出流式传输
  tool.state = 'output-streaming'

  await new Promise(resolve => setTimeout(resolve, 1000))

  // 6. 输出完成
  tool.output = '查询成功，返回 42 条记录'
  tool.state = 'output-available'

  isExecuting.value = false
}
<\/script>

<template>
  <div class="space-y-4">
    <button
      @click="executeTool"
      :disabled="isExecuting"
      class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
    >
      {{ isExecuting ? '执行中...' : '执行工具' }}
    </button>

    <Tool
      v-for="tool in tools"
      :key="tool.toolCallId"
      default-open
    >
      <ToolHeader :state="tool.state" :type="tool.type" />
      <ToolContent>
        <ToolInput :input="tool.input" />

        <Confirmation
          v-if="['approval-requested', 'approval-responded'].includes(tool.state)"
          :approval="{ id: nanoid(), approved: true }"
          :state="tool.state"
        >
          <ConfirmationTitle>
            <ConfirmationRequest>
              此工具将在生产数据库上执行查询。
            </ConfirmationRequest>
            <ConfirmationAccepted>
              <CheckIcon class="size-4 text-green-600" />
              <span>已接受</span>
            </ConfirmationAccepted>
            <ConfirmationRejected>
              <XIcon class="size-4 text-red-600" />
              <span>已拒绝</span>
            </ConfirmationRejected>
          </ConfirmationTitle>
        </Confirmation>

        <ToolOutput
          v-if="tool.state === 'output-available'"
          :output="tool.output"
          :error-text="tool.errorText"
        />
      </ToolContent>
    </Tool>
  </div>
</template>
\`\`\`

---

## 常见用法建议

1. **状态管理**：使用 \`ref\` 管理工具状态，根据执行流程更新状态
2. **唯一标识**：为每个工具调用生成唯一的 \`toolCallId\`，使用 \`nanoid\` 或 \`uuid\`
3. **默认展开**：对于重要的工具调用，使用 \`default-open\` 属性默认展开
4. **错误处理**：使用 \`ToolOutput\` 的 \`error-text\` prop 展示错误信息
5. **确认流程**：对于危险操作，配合 \`Confirmation\` 组件实现确认流程
6. **流式更新**：支持输入和输出的流式传输，提供更好的用户体验
7. **类型安全**：使用 TypeScript 类型定义确保数据结构正确
8. **视觉反馈**：根据不同状态提供不同的视觉反馈（图标、颜色等）
9. **输入格式化**：\`ToolInput\` 自动格式化 JSON，无需手动处理
10. **输出渲染**：\`ToolOutput\` 支持 Markdown 格式，可以展示表格等复杂内容

---

## 最佳实践

### 工具设计

- **清晰命名**：工具类型使用 \`tool-\` 前缀，如 \`tool-database_query\`
- **参数验证**：在执行前验证输入参数的完整性和有效性
- **错误信息**：提供清晰、具体的错误信息，帮助用户理解问题
- **输出格式**：统一输出格式，便于解析和展示

### 状态流转

- **顺序执行**：按照标准流程执行：输入 → 确认 → 输出
- **状态同步**：确保 UI 状态与实际执行状态同步
- **异常处理**：在任何阶段都要处理可能的异常情况
- **超时控制**：为长时间运行的工具设置超时机制

### 用户体验

- **即时反馈**：状态变化时立即更新 UI
- **进度提示**：对于耗时操作，提供进度提示
- **可撤销性**：对于危险操作，提供确认和撤销机制
- **历史记录**：保留工具调用历史，方便用户查看

### 性能优化

- **懒加载**：对于大量工具调用，使用虚拟滚动或分页
- **缓存结果**：缓存工具执行结果，避免重复调用
- **批量处理**：对于多个相似工具调用，考虑批量处理
- **资源清理**：及时清理不再需要的工具调用数据
`
</script>

<style lang="scss" scoped>
.guide-container {
  min-width: 900px;
  padding: 0 16px;
}
</style>
