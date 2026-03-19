<template>
  <a-card title="使用说明" class="guide-card">
    <div class="guide-container markstream-vue">
      <Markdown :content="guideContent" class="ai-markdown-content" />
    </div>
  </a-card>
</template>

<script setup>
import { Markdown } from 'vue-stream-markdown'
import '@/assets/styles/markdown-stream.css'
import 'vue-stream-markdown/theme.css'

const guideContent = `
# Confirmation（确认）组件说明

本页说明基于示例页 \`example.vue\` 中的组合方式，覆盖每个组件的作用、主要 Props/Slots，以及推荐用法。

## 组件清单（示例里用到）

- \`Confirmation\`：确认对话框的容器组件，提供上下文
- \`ConfirmationTitle\`：确认对话框的标题区域
- \`ConfirmationRequest\`：显示待确认的请求内容（仅在请求状态显示）
- \`ConfirmationAccepted\`：显示已批准的状态（仅在批准后显示）
- \`ConfirmationRejected\`：显示已拒绝的状态（仅在拒绝后显示）
- \`ConfirmationActions\`：操作按钮容器（仅在请求状态显示）
- \`ConfirmationAction\`：单个操作按钮

## 组件关系与约束

- \`Confirmation\` 是最外层容器，通过上下文提供 \`approval\` 和 \`state\` 给子组件
- \`ConfirmationTitle\` 必须放在 \`Confirmation\` 内使用
- \`ConfirmationRequest\`、\`ConfirmationAccepted\`、\`ConfirmationRejected\` 根据状态自动显示/隐藏
- \`ConfirmationActions\` 和 \`ConfirmationAction\` 用于提供用户操作按钮

## 状态说明

组件根据 \`state\` 属性显示不同的内容：

- \`approval-requested\`：显示请求内容和操作按钮
- \`approval-responded\`：显示批准或拒绝的结果
- \`output-denied\`：显示拒绝的结果
- \`output-available\`：显示批准的结果

---

## Confirmation

**作用**

- 确认对话框的容器组件
- 提供上下文（approval 和 state）给子组件
- 基于 Alert 组件实现

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`approval\` | \`ToolUIPartApproval\` | 批准对象，包含 id 和 approved 状态 |
| \`state\` | \`ExtendedToolState\` | 必填，当前状态 |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<Confirmation :approval="approval" :state="state">
  <ConfirmationTitle>...</ConfirmationTitle>
  <ConfirmationActions>...</ConfirmationActions>
</Confirmation>
\`\`\`

---

## ConfirmationTitle

**作用**

- 确认对话框的标题区域
- 基于 AlertDescription 组件实现
- 包含请求内容和状态显示

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<ConfirmationTitle>
  <ConfirmationRequest>请求内容</ConfirmationRequest>
  <ConfirmationAccepted>已批准</ConfirmationAccepted>
  <ConfirmationRejected>已拒绝</ConfirmationRejected>
</ConfirmationTitle>
\`\`\`

---

## ConfirmationRequest

**作用**

- 显示待确认的请求内容
- 仅在 \`state === 'approval-requested'\` 时显示

**用法**

\`\`\`vue
<ConfirmationRequest>
  This tool wants to delete the file
  <code>/tmp/example.txt</code>.
  Do you approve this action?
</ConfirmationRequest>
\`\`\`

---

## ConfirmationAccepted

**作用**

- 显示已批准的状态信息
- 仅在 \`approval.approved === true\` 且状态为已响应时显示

**用法**

\`\`\`vue
<ConfirmationAccepted>
  <CheckIcon class="size-4 text-green-600" />
  <span>You approved this tool execution</span>
</ConfirmationAccepted>
\`\`\`

---

## ConfirmationRejected

**作用**

- 显示已拒绝的状态信息
- 仅在 \`approval.approved === false\` 且状态为已响应时显示

**用法**

\`\`\`vue
<ConfirmationRejected>
  <XIcon class="size-4 text-destructive" />
  <span>You rejected this tool execution</span>
</ConfirmationRejected>
\`\`\`

---

## ConfirmationActions

**作用**

- 操作按钮的容器
- 仅在 \`state === 'approval-requested'\` 时显示
- 提供右对齐的按钮布局

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<ConfirmationActions>
  <ConfirmationAction variant="outline" @click="handleReject">
    Reject
  </ConfirmationAction>
  <ConfirmationAction variant="default" @click="handleApprove">
    Approve
  </ConfirmationAction>
</ConfirmationActions>
\`\`\`

---

## ConfirmationAction

**作用**

- 单个操作按钮
- 基于 Button 组件封装
- 固定高度和文字大小

**Props**

继承 Button 组件的所有 props，常用的包括：

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`variant\` | \`'default' \\| 'outline' \\| ...\` | 按钮样式变体 |

**事件**

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| \`@click\` | - | 点击事件 |

**用法**

\`\`\`vue
<ConfirmationAction variant="outline" @click="handleReject">
  Reject
</ConfirmationAction>

<ConfirmationAction variant="default" @click="handleApprove">
  Approve
</ConfirmationAction>
\`\`\`

---

## 完整使用示例

\`\`\`vue
<script setup lang="ts">
import { ref } from 'vue'
import { nanoid } from 'nanoid'
import {
  Confirmation,
  ConfirmationAccepted,
  ConfirmationAction,
  ConfirmationActions,
  ConfirmationRejected,
  ConfirmationRequest,
  ConfirmationTitle,
} from '@/components/ai-elements/confirmation'
import { CheckIcon, XIcon } from 'lucide-vue-next'

// 创建批准对象
const approval = ref({ id: nanoid() })
// 设置初始状态为请求中
const state = ref('approval-requested')

// 拒绝处理
function handleReject() {
  approval.value.approved = false
  state.value = 'approval-responded'
  // 在生产环境中，调用 respondToConfirmationRequest({ approved: false })
}

// 批准处理
function handleApprove() {
  approval.value.approved = true
  state.value = 'approval-responded'
  // 在生产环境中，调用 respondToConfirmationRequest({ approved: true })
}
<\/script>

<template>
  <div class="w-full max-w-2xl">
    <Confirmation :approval="approval" :state="state">
      <ConfirmationTitle>
        <!-- 请求状态：显示待确认内容 -->
        <ConfirmationRequest>
          This tool wants to delete the file
          <code class="inline rounded bg-muted px-1.5 py-0.5 text-sm">
            /tmp/example.txt
          </code>.
          Do you approve this action?
        </ConfirmationRequest>

        <!-- 批准状态：显示批准信息 -->
        <ConfirmationAccepted>
          <CheckIcon class="size-4 text-green-600 dark:text-green-400" />
          <span>You approved this tool execution</span>
        </ConfirmationAccepted>

        <!-- 拒绝状态：显示拒绝信息 -->
        <ConfirmationRejected>
          <XIcon class="size-4 text-destructive" />
          <span>You rejected this tool execution</span>
        </ConfirmationRejected>
      </ConfirmationTitle>

      <!-- 操作按钮：仅在请求状态显示 -->
      <ConfirmationActions>
        <ConfirmationAction variant="outline" @click="handleReject">
          Reject
        </ConfirmationAction>
        <ConfirmationAction variant="default" @click="handleApprove">
          Approve
        </ConfirmationAction>
      </ConfirmationActions>
    </Confirmation>
  </div>
<\/template>
\`\`\`

---

## 与示例页的对应关系（推荐理解方式）

- **请求阶段**：显示 \`ConfirmationRequest\` 和 \`ConfirmationActions\`，用户可以选择批准或拒绝
- **响应阶段**：根据用户选择显示 \`ConfirmationAccepted\` 或 \`ConfirmationRejected\`
- **状态管理**：通过 \`state\` 控制显示内容，通过 \`approval.approved\` 记录用户选择

## 常见用法建议

- **状态流转**：\`approval-requested\` → \`approval-responded\`（用户操作后）
- **数据结构**：\`approval\` 对象至少包含 \`id\` 和 \`approved\` 属性
- **图标使用**：建议在 Accepted 和 Rejected 中使用图标，提供视觉反馈
- **按钮样式**：拒绝按钮通常使用 \`outline\` 样式，批准按钮使用 \`default\` 样式
- **代码高亮**：在请求内容中可以使用 \`<code>\` 标签高亮关键信息
- **响应处理**：在生产环境中，需要调用实际的 API 来处理批准/拒绝操作
- **无障碍支持**：基于 Alert 组件，自动提供无障碍访问支持
`
</script>

<style lang="scss" scoped>
.guide-container {
  min-width: 900px;
  padding: 0 16px;
}
</style>

