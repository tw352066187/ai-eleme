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
# Checkpoint（检查点）组件说明

本页说明基于示例页 \`example.vue\` 中的组合方式，覆盖每个组件的作用、主要 Props/Slots，以及推荐用法。

## 组件清单（示例里用到）

- \`Conversation\`：对话的最外层容器，提供滚动和自动定位功能
- \`ConversationContent\`：对话内容的直接容器，提供统一的布局和间距
- \`Message\`：单条消息的容器，根据角色自动调整布局
- \`MessageContent\`：消息的内容容器，提供样式和布局
- \`MessageResponse\`：渲染消息文本内容，支持 Markdown 格式
- \`Checkpoint\`：检查点的容器组件，提供布局和分隔线
- \`CheckpointIcon\`：显示检查点的图标标识
- \`CheckpointTrigger\`：可点击的按钮，用于触发检查点恢复操作

## 组件关系与约束

- \`Conversation\` 是最外层容器，基于 \`vue-stick-to-bottom\` 实现自动滚动到底部
- \`ConversationContent\` 必须作为 \`Conversation\` 的直接子组件使用
- \`Message\` 和 \`Checkpoint\` 通常作为 \`ConversationContent\` 的子内容使用
- \`CheckpointIcon\` 和 \`CheckpointTrigger\` 必须放在 \`Checkpoint\` 内使用

---

## Conversation

**作用**

- 对话的最外层容器，提供滚动和自动定位功能
- 基于 vue-stick-to-bottom 实现自动滚动到底部
- 支持平滑滚动动画配置

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`ariaLabel\` | \`string\` | 无障碍标签，默认 "Conversation" |
| \`initial\` | \`boolean \\| 'instant' \\| object\` | 初始滚动行为，默认 true |
| \`resize\` | \`'instant' \\| object\` | 窗口调整时的滚动行为 |
| \`damping\` | \`number\` | 阻尼系数，默认 0.7 |
| \`stiffness\` | \`number\` | 刚度系数，默认 0.05 |
| \`mass\` | \`number\` | 质量系数，默认 1.25 |
| \`anchor\` | \`'auto' \\| 'none'\` | 锚点模式，默认 'none' |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<Conversation :damping="0.7" :stiffness="0.05">
  <ConversationContent>
    <!-- 对话内容 -->
  </ConversationContent>
</Conversation>
\`\`\`

---

## ConversationContent

**作用**

- 对话内容的直接容器，提供统一的布局和间距
- 使用 Flexbox 纵向布局，默认提供 8 单位的间距

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<ConversationContent>
  <Message from="user">...</Message>
  <Message from="assistant">...</Message>
  <Checkpoint>...</Checkpoint>
</ConversationContent>
\`\`\`

---

## Message

**作用**

- 单条消息的容器，根据角色自动调整布局
- 用户消息右对齐，助手消息左对齐
- 最大宽度限制为 80%

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`from\` | \`'user' \\| 'assistant'\` | 必填，消息角色 |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<Message from="user">
  <MessageContent>
    <MessageResponse>用户消息内容</MessageResponse>
  </MessageContent>
</Message>

<Message from="assistant">
  <MessageContent>
    <MessageResponse>助手回复内容</MessageResponse>
  </MessageContent>
</Message>
\`\`\`

---

## MessageContent

**作用**

- 消息的内容容器，提供样式和布局
- 用户消息：带背景色的圆角卡片样式
- 助手消息：纯文本样式

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<MessageContent>
  <MessageResponse>消息文本</MessageResponse>
</MessageContent>
\`\`\`

---

## MessageResponse

**作用**

- 渲染消息文本内容，支持 Markdown 格式
- 基于 vue-stream-markdown 实现
- 支持代码高亮（Shiki）

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`content\` | \`string\` | 消息内容字符串（可选） |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<!-- 方式 1: 使用 slot -->
<MessageResponse>这是消息内容</MessageResponse>

<!-- 方式 2: 使用 content prop -->
<MessageResponse :content="messageText" />
\`\`\`

---

## Checkpoint

**作用**

- 检查点的容器组件，提供布局和分隔线
- 水平布局，居中对齐
- 自动添加分隔线（Separator）

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<Checkpoint>
  <CheckpointIcon />
  <CheckpointTrigger tooltip="恢复提示" @click="handleRestore">
    恢复检查点
  </CheckpointTrigger>
</Checkpoint>
\`\`\`

---

## CheckpointIcon

**作用**

- 显示检查点的图标标识
- 默认使用书签图标（BookmarkIcon）
- 支持通过 slot 自定义图标

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**Slots**

| 插槽 | 说明 |
| --- | --- |
| 默认插槽 | 自定义图标（不传则显示默认书签图标） |

**用法**

\`\`\`vue
<!-- 使用默认图标 -->
<CheckpointIcon />

<!-- 自定义图标 -->
<CheckpointIcon>
  <CustomIcon />
</CheckpointIcon>
\`\`\`

---

## CheckpointTrigger

**作用**

- 可点击的按钮，用于触发检查点恢复操作
- 基于 Button 组件封装
- 支持 Tooltip 提示

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`tooltip\` | \`string\` | 提示文本（可选） |
| \`variant\` | \`ButtonVariants['variant']\` | 按钮样式变体，默认 'ghost' |
| \`size\` | \`ButtonVariants['size']\` | 按钮尺寸，默认 'sm' |

**事件**

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| \`@click\` | - | 点击事件 |

**用法**

\`\`\`vue
<CheckpointTrigger
  tooltip="将工作区和聊天恢复到此时间点"
  @click="handleRestore(checkpoint.messageCount)"
>
  恢复检查点
</CheckpointTrigger>
\`\`\`

---

## 完整使用示例

参考示例页面 example.vue 的完整实现，主要包含以下步骤：

1. 定义消息类型接口
2. 创建初始消息列表和检查点数据
3. 使用计算属性合并消息和检查点
4. 实现恢复检查点的处理函数
5. 在模板中渲染对话和检查点

---

## 与示例页的对应关系（推荐理解方式）

- **消息展示**：使用 \`Message\` + \`MessageContent\` + \`MessageResponse\` 组合展示用户和助手的对话
- **检查点标记**：在特定消息后插入 \`Checkpoint\` 组件，标记可恢复的历史状态
- **恢复功能**：通过 \`CheckpointTrigger\` 的点击事件触发恢复逻辑，截取消息列表到指定位置

## 常见用法建议

- **数据结构设计**：建议使用计算属性将消息和检查点数据合并，便于在模板中统一渲染
- **检查点位置**：通常在关键对话节点后设置检查点，例如完成一个任务、得到重要结论等
- **恢复逻辑**：恢复检查点时，需要根据 \`messageCount\` 截取消息列表，保持数据一致性
- **滚动行为**：\`Conversation\` 组件会自动滚动到底部，可通过 \`damping\`、\`stiffness\` 等参数调整滚动动画
- **样式定制**：所有组件都支持通过 \`class\` prop 传入自定义样式类
- **Markdown 支持**：\`MessageResponse\` 自动支持 Markdown 渲染，可直接在消息内容中使用 Markdown 语法
`
</script>

<style lang="scss" scoped>
.guide-container {
  min-width: 900px;
  padding: 0 16px;
}
</style>
