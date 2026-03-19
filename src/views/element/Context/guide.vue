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
# Context（上下文）组件说明

本页说明基于示例页 \`example.vue\` 中的组合方式，覆盖每个组件的作用、主要 Props/Slots，以及推荐用法。

## 组件清单（示例里用到）

- \`Context\`：上下文信息的容器组件，提供 Token 使用情况的上下文
- \`ContextTrigger\`：触发器按钮，显示 Token 使用百分比
- \`ContextContent\`：悬浮卡片内容容器
- \`ContextContentHeader\`：内容头部，显示进度条和总体使用情况
- \`ContextContentBody\`：内容主体，包含详细的 Token 使用信息
- \`ContextContentFooter\`：内容底部
- \`ContextInputUsage\`：输入 Token 使用情况
- \`ContextOutputUsage\`：输出 Token 使用情况
- \`ContextReasoningUsage\`：推理 Token 使用情况
- \`ContextCacheUsage\`：缓存 Token 使用情况
- \`TokensWithCost\`：显示 Token 数量和成本

## 组件关系与约束

- \`Context\` 是最外层容器，基于 \`HoverCard\` 实现，提供上下文给子组件
- \`ContextTrigger\` 必须作为 \`Context\` 的直接子组件
- \`ContextContent\` 必须作为 \`Context\` 的直接子组件
- 所有 Usage 组件（Input/Output/Reasoning/Cache）必须在 \`Context\` 内使用，以访问上下文数据

## 数据说明

组件需要以下数据：

- \`usedTokens\`：已使用的 Token 数量
- \`maxTokens\`：最大 Token 限制
- \`usage\`：详细的使用情况对象，包含：
  - \`inputTokens\`：输入 Token 数量
  - \`outputTokens\`：输出 Token 数量
  - \`reasoningTokens\`：推理 Token 数量（可选）
  - \`cachedInputTokens\`：缓存输入 Token 数量（可选）
- \`modelId\`：模型 ID，用于计算成本（可选）

---

## Context

**作用**

- 上下文信息的容器组件
- 基于 HoverCard 实现悬浮卡片效果
- 通过上下文提供 Token 使用数据给子组件

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`usedTokens\` | \`number\` | 必填，已使用的 Token 数量 |
| \`maxTokens\` | \`number\` | 必填，最大 Token 限制 |
| \`usage\` | \`LanguageModelUsage\` | 可选，详细的使用情况 |
| \`modelId\` | \`ModelId\` | 可选，模型 ID（用于成本计算） |

**用法**

\`\`\`vue
<Context
  :used-tokens="40000"
  :max-tokens="128000"
  :usage="usageData"
  model-id="openai:gpt-5"
>
  <ContextTrigger />
  <ContextContent>...</ContextContent>
</Context>
\`\`\`

---

## ContextTrigger

**作用**

- 触发器按钮，显示 Token 使用百分比
- 鼠标悬停时显示详细信息
- 自动计算并格式化百分比

**Slots**

| 插槽 | 说明 |
| --- | --- |
| 默认插槽 | 自定义触发器内容（不传则显示默认按钮） |

**用法**

\`\`\`vue
<!-- 使用默认样式 -->
<ContextTrigger />

<!-- 自定义触发器 -->
<ContextTrigger>
  <Button>自定义按钮</Button>
</ContextTrigger>
\`\`\`

---

## ContextContent

**作用**

- 悬浮卡片的内容容器
- 基于 HoverCardContent 实现
- 提供分隔线和内边距样式

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<ContextContent>
  <ContextContentHeader />
  <ContextContentBody>...</ContextContentBody>
  <ContextContentFooter />
</ContextContent>
\`\`\`

---

## ContextContentHeader

**作用**

- 显示总体 Token 使用情况
- 包含进度条和百分比显示
- 显示已使用/总量的紧凑格式

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**Slots**

| 插槽 | 说明 |
| --- | --- |
| 默认插槽 | 自定义头部内容（不传则显示默认进度条） |

**用法**

\`\`\`vue
<!-- 使用默认样式 -->
<ContextContentHeader />

<!-- 自定义头部 -->
<ContextContentHeader>
  <div>自定义内容</div>
</ContextContentHeader>
\`\`\`

---

## ContextContentBody

**作用**

- 内容主体容器
- 包含详细的 Token 使用信息列表

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<ContextContentBody>
  <ContextInputUsage />
  <ContextOutputUsage />
  <ContextReasoningUsage />
  <ContextCacheUsage />
</ContextContentBody>
\`\`\`

---

## ContextContentFooter

**作用**

- 内容底部容器
- 可用于显示额外信息或操作

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<ContextContentFooter>
  <div>额外信息</div>
</ContextContentFooter>
\`\`\`

---

## ContextInputUsage

**作用**

- 显示输入 Token 使用情况
- 自动计算成本（如果提供了 modelId）
- 仅在有输入 Token 时显示

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**Slots**

| 插槽 | 说明 |
| --- | --- |
| 默认插槽 | 自定义显示内容 |

**用法**

\`\`\`vue
<!-- 使用默认样式 -->
<ContextInputUsage />

<!-- 自定义显示 -->
<ContextInputUsage>
  <div>自定义输入信息</div>
</ContextInputUsage>
\`\`\`

---

## ContextOutputUsage

**作用**

- 显示输出 Token 使用情况
- 自动计算成本（如果提供了 modelId）
- 仅在有输出 Token 时显示

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**Slots**

| 插槽 | 说明 |
| --- | --- |
| 默认插槽 | 自定义显示内容 |

**用法**

\`\`\`vue
<ContextOutputUsage />
\`\`\`

---

## ContextReasoningUsage

**作用**

- 显示推理 Token 使用情况
- 用于支持推理功能的模型（如 o1）
- 仅在有推理 Token 时显示

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<ContextReasoningUsage />
\`\`\`

---

## ContextCacheUsage

**作用**

- 显示缓存 Token 使用情况
- 用于支持提示缓存的模型
- 仅在有缓存 Token 时显示

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<ContextCacheUsage />
\`\`\`

---

## TokensWithCost

**作用**

- 显示 Token 数量和成本
- 自动格式化数字和货币
- 内部组件，通常不直接使用

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`tokens\` | \`number\` | Token 数量 |
| \`costText\` | \`string\` | 成本文本（可选） |

---

## 完整使用示例

\`\`\`vue
<script setup lang="ts">
import {
  Context,
  ContextCacheUsage,
  ContextContent,
  ContextContentBody,
  ContextContentFooter,
  ContextContentHeader,
  ContextInputUsage,
  ContextOutputUsage,
  ContextReasoningUsage,
  ContextTrigger
} from '@/components/ai-elements/context'

// 定义使用数据
const usageData = {
  inputTokens: 32000,
  outputTokens: 8000,
  totalTokens: 40000,
  cachedInputTokens: 0,
  reasoningTokens: 0
}

// 定义上下文属性
const contextProps = {
  usedTokens: 40000,
  maxTokens: 128000,
  modelId: 'openai:gpt-5',
  usage: usageData
}
<\/script>

<template>
  <div class="flex items-center justify-center p-8">
    <Context v-bind="contextProps">
      <!-- 触发器：显示百分比 -->
      <ContextTrigger />

      <!-- 悬浮内容 -->
      <ContextContent>
        <!-- 头部：进度条和总量 -->
        <ContextContentHeader />

        <!-- 主体：详细使用情况 -->
        <ContextContentBody>
          <ContextInputUsage />
          <ContextOutputUsage />
          <ContextReasoningUsage />
          <ContextCacheUsage />
        </ContextContentBody>

        <!-- 底部：额外信息 -->
        <ContextContentFooter />
      </ContextContent>
    </Context>
  </div>
</template>
\`\`\`

---

## 与示例页的对应关系（推荐理解方式）

- **触发器**：\`ContextTrigger\` 显示 Token 使用百分比，鼠标悬停时显示详情
- **进度显示**：\`ContextContentHeader\` 显示总体使用进度和百分比
- **详细信息**：各个 Usage 组件显示输入、输出、推理、缓存的具体使用情况
- **成本计算**：如果提供 \`modelId\`，会自动计算并显示每种类型的成本

## 常见用法建议

- **数据准备**：确保提供准确的 \`usedTokens\` 和 \`maxTokens\` 数据
- **模型 ID**：提供 \`modelId\` 可以自动计算成本，格式如 \`"openai:gpt-4"\`
- **使用情况**：\`usage\` 对象应包含详细的 Token 分类数据
- **条件显示**：各个 Usage 组件会自动判断是否有数据，无数据时不显示
- **格式化**：Token 数量和百分比会自动格式化为易读的紧凑格式
- **成本显示**：成本会自动格式化为美元货币格式
- **悬浮交互**：基于 HoverCard，支持鼠标悬停和键盘导航
- **响应式**：组件会根据数据变化自动更新显示
- **国际化**：数字和货币格式使用 \`Intl\` API，支持本地化
`
</script>

<style lang="scss" scoped>
.guide-container {
  min-width: 900px;
  padding: 0 16px;
}
</style>
