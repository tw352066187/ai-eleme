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
# Chain Of Thought（思维链）组件说明

本页说明基于示例页 \`example.vue\` 中的组合方式，覆盖每个组件的作用、主要 Props/Slots，以及推荐用法。

## 组件清单（示例里用到）

- \`ChainOfThought\`：提供折叠开关状态的容器（上下文提供者）
- \`ChainOfThoughtHeader\`：折叠触发头部（标题 + 箭头）
- \`ChainOfThoughtContent\`：与折叠状态联动的内容容器
- \`ChainOfThoughtStep\`：单条步骤（支持状态与图标插槽）
- \`ChainOfThoughtSearchResults\`：搜索结果容器（水平排列）
- \`ChainOfThoughtSearchResult\`：搜索结果项（Badge 外观）
- \`ChainOfThoughtImage\`：图片展示容器（内容区 + caption）
- \`Image\`：通用图片组件（渲染 AI base64 图片）

## 组件关系与约束

- \`ChainOfThoughtHeader\` / \`ChainOfThoughtContent\` 依赖 \`ChainOfThought\` 提供的上下文：必须放在 \`<ChainOfThought>\` 内使用，否则会在运行时抛错（注入不到折叠状态）。
- \`ChainOfThoughtStep\` 通常作为 \`ChainOfThoughtContent\` 的直接子内容使用，用于逐条展示过程/结果。

---

## ChainOfThought

**作用**

- 作为容器提供“展开/收起”状态（open/close），并把状态通过上下文给 Header 和 Content 使用。

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`modelValue\` | \`boolean\` | 受控模式开合状态（配合 \`v-model\`） |
| \`defaultOpen\` | \`boolean\` | 非受控模式的默认展开状态 |
| \`class\` | \`string \\| any\` | 额外样式类 |

**事件**

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| \`update:modelValue\` | \`(value: boolean)\` | 受控模式同步开合状态 |

**用法**

\`\`\`vue
<ChainOfThought default-open>
  <ChainOfThoughtHeader />
  <ChainOfThoughtContent>
    ...
  </ChainOfThoughtContent>
</ChainOfThought>
\`\`\`

受控模式：

\`\`\`vue
<ChainOfThought v-model="open">
  <ChainOfThoughtHeader />
  <ChainOfThoughtContent>...</ChainOfThoughtContent>
</ChainOfThought>
\`\`\`

---

## ChainOfThoughtHeader

**作用**

- 作为触发器展示“思维链标题区域”，点击后切换展开/收起。

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**Slots**

| 插槽 | 说明 |
| --- | --- |
| 默认插槽 | 自定义标题文案（不传则显示默认文案） |

**用法**

\`\`\`vue
<ChainOfThoughtHeader>Chain of Thought</ChainOfThoughtHeader>
\`\`\`

---

## ChainOfThoughtContent

**作用**

- 与 Header 同步开合的内容区域：展开显示，收起隐藏。

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<ChainOfThoughtContent>
  <ChainOfThoughtStep ... />
</ChainOfThoughtContent>
\`\`\`

---

## ChainOfThoughtStep

**作用**

- 展示单条步骤的“状态 + 文案 + 额外内容”。
- 常用于：搜索、调用工具、生成图片、总结结论等过程的逐条展示。

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`label\` | \`string\` | 必填，步骤主文案 |
| \`description\` | \`string\` | 可选，次级说明（更小字号） |
| \`status\` | \`'complete' \\| 'active' \\| 'pending'\` | 状态样式（默认 \`complete\`） |
| \`class\` | \`string \\| any\` | 额外样式类 |

**Slots**

| 插槽 | 说明 |
| --- | --- |
| \`#icon\` | 左侧图标区域（示例里放 lucide 图标） |
| 默认插槽 | 放置补充内容，例如搜索结果列表、图片区等 |

**用法**

\`\`\`vue
<ChainOfThoughtStep label="Searching..." :status="isActive ? 'active' : 'complete'">
  <template #icon>
    <SearchIcon class="size-4" />
  </template>
  <ChainOfThoughtSearchResults>
    <ChainOfThoughtSearchResult>github.com</ChainOfThoughtSearchResult>
  </ChainOfThoughtSearchResults>
</ChainOfThoughtStep>
\`\`\`

---

## ChainOfThoughtSearchResults / ChainOfThoughtSearchResult

**作用**

- \`ChainOfThoughtSearchResults\`：结果容器，负责横向排列与间距。
- \`ChainOfThoughtSearchResult\`：结果项，Badge 外观，内容完全由插槽决定（可放 img + 文本）。

**用法**

\`\`\`vue
<ChainOfThoughtSearchResults>
  <ChainOfThoughtSearchResult>
    <img :src="logo" class="size-4" alt="" />
    github.com
  </ChainOfThoughtSearchResult>
</ChainOfThoughtSearchResults>
\`\`\`

---

## ChainOfThoughtImage

**作用**

- 用于承载图片类内容：提供居中、最大高度、背景与圆角，并可选显示 caption。

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`caption\` | \`string\` | 可选，图片说明文字 |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<ChainOfThoughtImage caption="Profile photo from x.com">
  <Image v-bind="exampleImage" alt="profile" class="aspect-square h-[150px] border" />
</ChainOfThoughtImage>
\`\`\`

---

## Image

**作用**

- 渲染 AI 生成的 base64 图片（内部通过 \`data:\${mediaType};base64,\${base64}\` 拼出 img 的 src）。

**Props（示例里常用）**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`base64\` | \`string\` | 图片 base64 内容（不含 dataURL 头） |
| \`mediaType\` | \`string\` | MIME 类型，例如 \`image/jpeg\` |
| \`uint8Array\` | \`Uint8Array\` | 可选，原始二进制（部分场景可能用） |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`ts
const exampleImage = {
  base64: '...base64...',
  mediaType: 'image/jpeg',
  uint8Array: new Uint8Array([]),
}
\`\`\`

\`\`\`vue
<Image v-bind="exampleImage" alt="Example generated image" class="aspect-square h-[150px] border" />
\`\`\`

---

## 与示例页的对应关系（推荐理解方式）

- 步骤 1：\`ChainOfThoughtStep\` + \`ChainOfThoughtSearchResults\` 展示“搜索中 + 结果列表”
- 步骤 2：\`ChainOfThoughtStep\` + \`ChainOfThoughtImage\` + \`Image\` 展示“找到图片 + 图片预览 + caption”
- 步骤 3：仅用 \`ChainOfThoughtStep\` 的 \`label\` 展示“文本结论”
- 步骤 4：再次使用“搜索中 + 结果列表”的组合方式

## 常见用法建议

- **步骤逐条出现**：用 \`v-if\` 或 \`v-show\` 控制每个 Step 是否渲染（示例用定时器逐秒增加 \`visibleSteps\`）。
- **状态切换**：当前步骤用 \`active\`，已完成步骤用 \`complete\`，未开始用 \`pending\`，便于视觉表达进度。
- **图标可替换**：\`#icon\` 插槽可以放任意图标组件，不限定 lucide。
`
</script>

<style lang="scss" scoped>
.guide-container {
  min-width: 900px;
  padding: 0 16px;
}
</style>
