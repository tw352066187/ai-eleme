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
# Message（消息）组件说明

本页说明基于示例页 \`example.vue\` 中的组合方式，覆盖每个组件的作用、主要 Props/Slots，以及推荐用法。

## 组件清单（示例里用到）

- \`Message\`：消息的容器组件，根据角色自动调整布局
- \`MessageContent\`：消息内容容器，提供样式和布局
- \`MessageResponse\`：渲染消息文本，支持 Markdown 和代码高亮
- \`MessageAttachments\`：附件列表容器
- \`MessageAttachment\`：单个附件显示
- \`MessageBranch\`：分支容器，用于多版本消息
- \`MessageBranchContent\`：分支内容容器
- \`MessageBranchSelector\`：分支选择器，包含导航按钮
- \`MessageBranchPrevious\`：上一个版本按钮
- \`MessageBranchNext\`：下一个版本按钮
- \`MessageBranchPage\`：当前版本索引显示
- \`MessageToolbar\`：工具栏容器
- \`MessageActions\`：操作按钮组容器
- \`MessageAction\`：单个操作按钮

## 组件关系与约束

- \`Message\` 是最外层容器，根据 \`from\` 属性区分用户和助手消息
- \`MessageBranch\` 用于支持多版本消息，提供版本切换功能
- \`MessageToolbar\` 通常放在消息底部，包含分支选择器和操作按钮
- 所有 Branch 相关组件必须在 \`MessageBranch\` 内使用

## 使用场景

Message 组件适用于：

- AI 对话界面
- 聊天应用
- 客服系统
- 协作工具
- 任何需要展示对话消息的场景

---

## Message

**作用**

- 消息的容器组件
- 根据角色自动调整布局（用户消息右对齐，助手消息左对齐）
- 最大宽度限制为 80%

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`from\` | \`'user' \\| 'assistant'\` | 必填，消息角色 |
| \`class\` | \`string \\| any\` | 额外样式类 |

**样式特点**

- 用户消息：右对齐（\`ml-auto justify-end\`）
- 助手消息：左对齐
- 自动添加 \`group\` 类，支持组内样式

**用法**

\`\`\`vue
<Message from="user">
  <MessageContent>用户消息</MessageContent>
</Message>

<Message from="assistant">
  <MessageContent>助手回复</MessageContent>
</Message>
\`\`\`

---

## MessageContent

**作用**

- 消息内容容器
- 提供样式和布局
- 用户消息带背景色，助手消息纯文本

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**样式特点**

- 用户消息：圆角卡片样式（\`bg-secondary\`）
- 助手消息：纯文本样式
- 自动适应内容宽度（\`w-fit\`）

**用法**

\`\`\`vue
<MessageContent>
  <MessageResponse :content="text" />
</MessageContent>
\`\`\`

---

## MessageResponse

**作用**

- 渲染消息文本内容
- 支持 Markdown 语法
- 支持代码高亮（Shiki）
- 基于 vue-stream-markdown 实现

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`content\` | \`string\` | 消息内容字符串（可选） |
| \`shikiOptions\` | \`object\` | Shiki 配置选项（可选） |
| \`class\` | \`string \\| any\` | 额外样式类 |

**Shiki 配置**

\`shikiOptions\` 可以配置：
- \`langs\`：支持的语言列表
- \`theme\`：代码主题

**用法**

\`\`\`vue
<!-- 使用 content prop -->
<MessageResponse :content="messageText" />

<!-- 使用 slot -->
<MessageResponse>消息内容</MessageResponse>

<!-- 配置代码高亮 -->
<MessageResponse
  :content="code"
  :shiki-options="{ langs: ['vue', 'typescript'] }"
/>
\`\`\`

---

## MessageAttachments

**作用**

- 附件列表容器
- 提供统一的布局和间距

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<MessageAttachments>
  <MessageAttachment v-for="file in files" :key="file.url" :data="file" />
</MessageAttachments>
\`\`\`

---

## MessageAttachment

**作用**

- 显示单个附件
- 支持图片预览
- 支持文件下载

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`data\` | \`Attachment\` | 必填，附件数据对象 |
| \`class\` | \`string \\| any\` | 额外样式类 |

**Attachment 数据结构**

\`\`\`typescript
interface Attachment {
  type: 'file'
  url: string
  mediaType?: string
  filename?: string
}
\`\`\`

**用法**

\`\`\`vue
<MessageAttachment
  :data="{
    type: 'file',
    url: 'https://example.com/image.jpg',
    mediaType: 'image/jpeg',
    filename: 'photo.jpg'
  }"
/>
\`\`\`

---

## MessageBranch

**作用**

- 分支容器，用于多版本消息
- 提供版本切换功能
- 通过上下文管理当前版本

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`defaultBranch\` | \`number\` | 默认显示的版本索引，默认 0 |
| \`class\` | \`string \\| any\` | 额外样式类 |

**事件**

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| \`branch-change\` | \`(index: number)\` | 版本切换时触发 |

**用法**

\`\`\`vue
<MessageBranch
  :default-branch="0"
  @branch-change="handleBranchChange"
>
  <MessageBranchContent>...</MessageBranchContent>
  <MessageToolbar>...</MessageToolbar>
</MessageBranch>
\`\`\`

---

## MessageBranchContent

**作用**

- 分支内容容器
- 包含所有版本的内容
- 根据当前索引显示对应版本

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<MessageBranchContent>
  <MessageContent v-for="version in versions" :key="version.id"></MessageContent>
geResponse :content="version.content" />
  </MessageContent>
</MessageBranchContent>
\`\`\`

---

## MessageBranchSelector

**作用**

- 分支选择器容器
- 包含导航按钮和索引显示
- 提供统一的布局

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`from\` | \`'user' \\| 'assistant'\` | 消息角色 |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<MessageBranchSelector from="assistant">
  <MessageBranchPrevious />
  <MessageBranchPage />
  <MessageBranchNext />
</MessageBranchSelector>
\`\`\`

---

## MessageBranchPrevious

**作用**

- 上一个版本按钮
- 自动禁用在第一个版本时

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<MessageBranchPrevious />
\`\`\`

---

## MessageBranchNext

**作用**

- 下一个版本按钮
- 自动禁用在最后一个版本时

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<MessageBranchNext />
\`\`\`

---

## MessageBranchPage

**作用**

- 显示当前版本索引
- 格式：当前/总数（如 1/3）

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<MessageBranchPage />
\`\`\`

---

## MessageToolbar

**作用**

- 工具栏容器
- 通常包含分支选择器和操作按钮
- 提供统一的布局和样式

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<MessageToolbar>
  <MessageBranchSelector>...</MessageBranchSelector>
  <MessageActions>...</MessageActions>
</MessageToolbar>
\`\`\`

---

## MessageActions

**作用**

- 操作按钮组容器
- 提供统一的布局和间距

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<MessageActions>
  <MessageAction label="Copy" @click="handleCopy">
    <CopyIcon />
  </MessageAction>
  <MessageAction label="Like" @click="handleLike">
    <ThumbsUpIcon />
  </MessageAction>
</MessageActions>
\`\`\`

---

## MessageAction

**作用**

- 单个操作按钮
- 支持图标和文本
- 支持 Tooltip 提示

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`label\` | \`string\` | 按钮标签（必填） |
| \`tooltip\` | \`string\` | 提示文本（可选） |
| \`class\` | \`string \\| any\` | 额外样式类 |

**事件**

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| \`@click\` | - | 点击事件 |

**用法**

\`\`\`vue
<MessageAction
  label="Copy"
  tooltip="Copy to clipboard"
  @click="handleCopy"
>
  <CopyIcon class="size-4" />
</MessageAction>
\`\`\`

---

## 完整使用示例

参考示例页面 example.vue 的完整实现，主要包含以下场景：

### 场景 1：带附件的用户消息

\`\`\`vue
<Message from="user">
  <MessageAttachments>
    <MessageAttachment :data="attachment" />
  </MessageAttachments>
  <MessageContent>
    {{ message.content }}
  </MessageContent>
</Message>
\`\`\`

### 场景 2：多版本的助手消息

\`\`\`vue
<Message from="assistant">
  <MessageBranch :default-branch="0" @branch-change="handleBranchChange">
    <MessageBranchContent>
      <MessageContent v-for="version in versions" :key="version.id">
        <MessageResponse :content="version.content" />
      </MessageContent>
    </MessageBranchContent>

    <MessageToolbar>
      <MessageBranchSelector from="assistant">
        <MessageBranchPrevious />
        <MessageBranchPage />
        <MessageBranchNext />
      </MessageBranchSelector>

      <MessageActions>
        <MessageAction label="Copy" @click="handleCopy">
          <CopyIcon />
        </MessageAction>
        <MessageAction label="Like" @click="handleLike">
          <ThumbsUpIcon />
        </MessageAction>
      </MessageActions>
    </MessageToolbar>
  </MessageBranch>
</Message>
\`\`\`

### 场景 3：单版本的助手消息

\`\`\`vue
<Message from="assistant">
  <MessageContent>
    <MessageResponse :content="message.content" />
  </MessageContent>

  <MessageActions>
    <MessageAction label="Retry" @click="handleRetry">
      <RefreshCcwIcon />
    </MessageAction>
    <MessageAction label="Copy" @click="handleCopy">
      <CopyIcon />
    </MessageAction>
  </MessageActions>
</Message>
\`\`\`

---

## 与示例页的对应关系（推荐理解方式）

- **用户消息**：右对齐，带附件支持，简洁样式
- **助手消息**：左对齐，支持 Markdown 渲染，支持多版本
- **版本切换**：通过分支选择器在多个版本之间切换
- **操作按钮**：提供复制、点赞、重试等常用操作

## 常见用法建议

- **角色区分**：始终明确指定 \`from\` 属性，确保正确的布局
- **版本管理**：使用 \`MessageBranch\` 支持 AI 生成的多个回复版本
- **附件处理**：图片附件会自动预览，其他文件显示下载链接
- **Markdown 支持**：\`MessageResponse\` 自动渲染 Markdown，包括代码块
- **代码高亮**：通过 \`shikiOptions\` 配置支持的编程语言
- **操作反馈**：使用 \`MessageAction\` 提供用户交互，如复制、点赞等
- **工具栏布局**：\`MessageToolbar\` 自动处理分支选择器和操作按钮的布局
- **响应式设计**：消息宽度自动适应内容，最大 80%
- **无障碍支持**：所有交互元素都提供键盘导航和屏幕阅读器支持
- **状态管理**：建议使用 ref 管理点赞、点踩等状态
`
</script>

<style lang="scss" scoped>
.guide-container {
  min-width: 900px;
  padding: 0 16px;
}
</style>
