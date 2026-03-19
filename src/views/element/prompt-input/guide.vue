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
# Prompt Input（提示输入）组件说明

本页说明基于示例页 \`example.vue\` 中的组合方式，覆盖每个组件的作用、主要 Props/Slots，以及推荐用法。

## 组件清单（示例里用到）

- \`PromptInputProvider\`：提供输入上下文的容器组件
- \`PromptInput\`：输入框的主容器
- \`PromptInputAttachments\`：附件列表容器
- \`PromptInputAttachment\`：单个附件显示
- \`PromptInputBody\`：输入框主体容器
- \`PromptInputTextarea\`：文本输入区域
- \`PromptInputFooter\`：底部工具栏
- \`PromptInputTools\`：工具按钮组容器
- \`PromptInputActionMenu\`：操作菜单容器
- \`PromptInputActionMenuTrigger\`：菜单触发器
- \`PromptInputActionMenuContent\`：菜单内容
- \`PromptInputActionAddAttachments\`：添加附件操作
- \`PromptInputSpeechButton\`：语音输入按钮
- \`PromptInputButton\`：通用工具按钮
- \`PromptInputSubmit\`：提交按钮

## 组件关系与约束

- \`PromptInputProvider\` 是最外层容器，提供上下文和事件处理
- \`PromptInput\` 必须在 \`PromptInputProvider\` 内使用
- 所有子组件必须在 \`PromptInput\` 内使用
- \`PromptInputFooter\` 包含工具栏和提交按钮

## 使用场景

Prompt Input 组件适用于：

- AI 对话输入框
- 聊天应用
- 搜索框
- 命令输入
- 任何需要富文本输入和附件支持的场景

---

## PromptInputProvider

**作用**

- 提供输入上下文的容器组件
- 管理输入状态和事件
- 处理提交逻辑

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**事件**

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| \`submit\` | \`(message: PromptInputMessage)\` | 提交消息时触发 |

**PromptInputMessage 结构**

\`\`\`typescript
interface PromptInputMessage {
  text: string
  files?: File[]
}
\`\`\`

**用法**

\`\`\`vue
<PromptInputProvider @submit="handleSubmit">
  <PromptInput>...</PromptInput>
</PromptInputProvider>
\`\`\`

---

## PromptInput

**作用**

- 输入框的主容器
- 支持附件拖放
- 支持多文件上传

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`multiple\` | \`boolean\` | 是否支持多文件上传 |
| \`globalDrop\` | \`boolean\` | 是否启用全局拖放 |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<PromptInput multiple global-drop class="w-full">
  <PromptInputAttachments>...</PromptInputAttachments>
  <PromptInputBody>...</PromptInputBody>
  <PromptInputFooter>...</PromptInputFooter>
</PromptInput>
\`\`\`

---

## PromptInputAttachments

**作用**

- 附件列表容器
- 显示已上传的文件
- 支持自定义附件渲染

**Slots**

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| \`default\` | \`{ file: File }\` | 自定义附件显示 |

**用法**

\`\`\`vue
<PromptInputAttachments>
  <template #default="{ file }">
    <PromptInputAttachment :file="file" />
  </template>
</PromptInputAttachments>
\`\`\`

---

## PromptInputAttachment

**作用**

- 显示单个附件
- 支持图片预览
- 支持删除操作

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`file\` | \`File\` | 必填，文件对象 |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<PromptInputAttachment :file="file" />
\`\`\`

---

## PromptInputBody

**作用**

- 输入框主体容器
- 包含文本输入区域
- 提供统一的布局

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<PromptInputBody>
  <PromptInputTextarea />
</PromptInputBody>
\`\`\`

---

## PromptInputTextarea

**作用**

- 文本输入区域
- 支持多行输入
- 自动调整高度
- 支持快捷键（Enter 提交，Shift+Enter 换行）

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`placeholder\` | \`string\` | 占位符文本 |
| \`class\` | \`string \\| any\` | 额外样式类 |

**快捷键**

- \`Enter\`：提交消息
- \`Shift + Enter\`：换行
- \`Cmd/Ctrl + Enter\`：强制提交

**用法**

\`\`\`vue
<PromptInputTextarea placeholder="Type a message..." />
\`\`\`

---

## PromptInputFooter

**作用**

- 底部工具栏容器
- 包含工具按钮和提交按钮
- 提供统一的布局

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<PromptInputFooter>
  <PromptInputTools>...</PromptInputTools>
  <PromptInputSubmit />
</PromptInputFooter>
\`\`\`

---

## PromptInputTools

**作用**

- 工具按钮组容器
- 提供统一的布局和间距
- 支持多个工具按钮

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<PromptInputTools>
  <PromptInputActionMenu>...</PromptInputActionMenu>
  <PromptInputSpeechButton />
  <PromptInputButton>...</PromptInputButton>
</PromptInputTools>
\`\`\`

---

## PromptInputActionMenu

**作用**

- 操作菜单容器
- 提供下拉菜单功能
- 包含多个操作选项

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<PromptInputActionMenu>
  <PromptInputActionMenuTrigger />
  <PromptInputActionMenuContent>
    <PromptInputActionAddAttachments />
  </PromptInputActionMenuContent>
</PromptInputActionMenu>
\`\`\`

---

## PromptInputActionMenuTrigger

**作用**

- 菜单触发器按钮
- 显示加号图标
- 点击打开菜单

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<PromptInputActionMenuTrigger />
\`\`\`

---

## PromptInputActionMenuContent

**作用**

- 菜单内容容器
- 包含菜单项
- 自动处理定位

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<PromptInputActionMenuContent>
  <PromptInputActionAddAttachments />
</PromptInputActionMenuContent>
\`\`\`

---

## PromptInputActionAddAttachments

**作用**

- 添加附件操作
- 打开文件选择对话框
- 支持多文件选择

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<PromptInputActionAddAttachments />
\`\`\`

---

## PromptInputSpeechButton

**作用**

- 语音输入按钮
- 启动语音识别
- 显示麦克风图标

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<PromptInputSpeechButton />
\`\`\`

---

## PromptInputButton

**作用**

- 通用工具按钮
- 支持图标和文本
- 可自定义内容

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<PromptInputButton>
  <GlobeIcon :size="16" />
  <span>Search</span>
</PromptInputButton>
\`\`\`

---

## PromptInputSubmit

**作用**

- 提交按钮
- 显示不同状态（就绪、提交中、流式传输）
- 自动禁用空消息

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`status\` | \`'ready' \\| 'submitted' \\| 'streaming' \\| 'error'\` | 当前状态 |
| \`class\` | \`string \\| any\` | 额外样式类 |

**状态说明**

- \`ready\`：就绪状态，显示发送图标
- \`submitted\`：提交中，显示加载动画
- \`streaming\`：流式传输中，显示停止图标
- \`error\`：错误状态

**用法**

\`\`\`vue
<PromptInputSubmit :status="status" />
\`\`\`

---

## 完整使用示例

参考示例页面 example.vue 的完整实现，主要包含以下功能：

1. **文本输入**：支持多行文本和自动高度调整
2. **附件上传**：支持拖放和多文件上传
3. **工具按钮**：添加附件、语音输入、搜索等
4. **模型选择**：集成 ModelSelector 组件
5. **状态管理**：处理提交、流式传输等状态

---

## 与示例页的对应关系（推荐理解方式）

- **输入区域**：\`PromptInputTextarea\` 提供多行文本输入
- **附件管理**：\`PromptInputAttachments\` 显示已上传文件
- **工具栏**：\`PromptInputTools\` 包含各种操作按钮
- **模型选择**：集成 \`ModelSelector\` 选择 AI 模型
- **提交控制**：\`PromptInputSubmit\` 根据状态显示不同图标

## 常见用法建议

- **状态管理**：使用 ref 管理提交状态（ready/submitted/streaming）
- **提交处理**：在 \`@submit\` 事件中处理消息发送逻辑
- **附件支持**：设置 \`multiple\` 允许多文件上传
- **拖放功能**：设置 \`global-drop\` 启用全局拖放区域
- **快捷键**：默认支持 Enter 提交，Shift+Enter 换行
- **空消息检查**：提交前检查是否有文本或附件
- **加载状态**：使用 \`status\` prop 显示不同的提交状态
- **工具集成**：可以添加自定义工具按钮（搜索、模型选择等）
- **响应式**：组件会自动适应容器宽度
- **无障碍支持**：提供完整的键盘导航和屏幕阅读器支持
`
</script>

<style lang="scss" scoped>
.guide-container {
  min-width: 900px;
  padding: 0 16px;
}
</style>

