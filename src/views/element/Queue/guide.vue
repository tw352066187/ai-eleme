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
# Queue（队列）组件说明

本页说明基于示例页 \`example.vue\` 中的组合方式，覆盖每个组件的作用、主要 Props/Slots，以及推荐用法。

## 组件清单（示例里用到）

- \`Queue\`：队列容器，用于包裹多个队列分组
- \`QueueSection\`：可折叠的队列分组（基于 Collapsible）
- \`QueueSectionTrigger\`：分组折叠触发器
- \`QueueSectionLabel\`：分组标签（显示标题和数量）
- \`QueueSectionContent\`：分组内容区域
- \`QueueList\`：队列项列表容器
- \`QueueItem\`：单个队列项
- \`QueueItemIndicator\`：队列项状态指示器
- \`QueueItemContent\`：队列项主要内容
- \`QueueItemActions\`：队列项操作按钮组
- \`QueueItemAction\`：单个操作按钮
- \`QueueItemAttachment\`：附件容器
- \`QueueItemImage\`：图片附件
- \`QueueItemFile\`：文件附件
- \`QueueItemDescription\`：队列项描述文本

## 组件关系与约束

- \`QueueSection\` 必须放在 \`Queue\` 内使用
- \`QueueSectionTrigger\` 和 \`QueueSectionContent\` 必须放在 \`QueueSection\` 内使用
- \`QueueItem\` 通常放在 \`QueueList\` 内使用
- \`QueueItemIndicator\`、\`QueueItemContent\`、\`QueueItemActions\` 等子组件需要放在 \`QueueItem\` 内使用

---

## Queue

**作用**

- 作为队列的最外层容器，提供统一的样式和布局。

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<Queue v-if="hasQueue">
  <QueueSection>...</QueueSection>
  <QueueSection>...</QueueSection>
</Queue>
\`\`\`

---

## QueueSection

**作用**

- 提供可折叠的队列分组功能，基于 Collapsible 组件实现。
- 用于将不同类型的队列项分组展示（如"排队消息"和"待办事项"）。

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`defaultOpen\` | \`boolean\` | 默认是否展开（默认 \`true\`） |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<QueueSection>
  <QueueSectionTrigger>
    <QueueSectionLabel :count="messages.length" label="Queued" />
  </QueueSectionTrigger>
  <QueueSectionContent>
    <QueueList>...</QueueList>
  </QueueSectionContent>
</QueueSection>
\`\`\`

---

## QueueSectionTrigger

**作用**

- 作为分组的折叠触发器，点击可展开/收起分组内容。

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**Slots**

| 插槽 | 说明 |
| --- | --- |
| 默认插槽 | 触发器内容（通常放 QueueSectionLabel） |

**用法**

\`\`\`vue
<QueueSectionTrigger>
  <QueueSectionLabel :count="5" label="Queued" />
</QueueSectionTrigger>
\`\`\`

---

## QueueSectionLabel

**作用**

- 显示分组标签和数量，带有折叠箭头指示器。

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`label\` | \`string\` | 分组标签文本 |
| \`count\` | \`number\` | 队列项数量 |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<QueueSectionLabel :count="messages.length" label="Queued" />
<QueueSectionLabel :count="todos.length" label="Todo" />
\`\`\`

---

## QueueSectionContent

**作用**

- 分组的内容区域，与折叠状态联动。

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<QueueSectionContent>
  <QueueList>
    <QueueItem>...</QueueItem>
  </QueueList>
</QueueSectionContent>
\`\`\`

---

## QueueList

**作用**

- 队列项的列表容器，提供统一的间距和布局。

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<QueueList>
  <QueueItem v-for="item in items" :key="item.id">
    ...
  </QueueItem>
</QueueList>
\`\`\`

---

## QueueItem

**作用**

- 单个队列项的容器，提供悬停效果和布局。

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**Slots**

| 插槽 | 说明 |
| --- | --- |
| 默认插槽 | 队列项内容（通常包含指示器、内容、操作按钮等） |

**用法**

\`\`\`vue
<QueueItem>
  <div class="flex items-center gap-2">
    <QueueItemIndicator />
    <QueueItemContent>消息内容</QueueItemContent>
    <QueueItemActions>...</QueueItemActions>
  </div>
</QueueItem>
\`\`\`

---

## QueueItemIndicator

**作用**

- 显示队列项的状态指示器（圆点），支持完成状态的样式变化。

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`completed\` | \`boolean\` | 是否已完成（完成时显示对勾图标） |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<QueueItemIndicator />
<QueueItemIndicator :completed="todo.status === 'completed'" />
\`\`\`

---

## QueueItemContent

**作用**

- 显示队列项的主要内容文本，支持完成状态的删除线样式。

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`completed\` | \`boolean\` | 是否已完成（完成时显示删除线） |
| \`class\` | \`string \\| any\` | 额外样式类 |

**Slots**

| 插槽 | 说明 |
| --- | --- |
| 默认插槽 | 内容文本 |

**用法**

\`\`\`vue
<QueueItemContent>如何设置项目？</QueueItemContent>
<QueueItemContent :completed="todo.status === 'completed'">
  {{ todo.title }}
</QueueItemContent>
\`\`\`

---

## QueueItemActions

**作用**

- 队列项操作按钮组的容器，提供统一的布局和间距。

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<QueueItemActions>
  <QueueItemAction @click="handleRemove">
    <Trash2 :size="12" />
  </QueueItemAction>
  <QueueItemAction @click="handleSend">
    <ArrowUp :size="14" />
  </QueueItemAction>
</QueueItemActions>
\`\`\`

---

## QueueItemAction

**作用**

- 单个操作按钮，提供悬停效果和点击事件。

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**事件**

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| \`click\` | \`(event: MouseEvent)\` | 点击事件 |

**Slots**

| 插槽 | 说明 |
| --- | --- |
| 默认插槽 | 按钮内容（通常是图标） |

**用法**

\`\`\`vue
<QueueItemAction
  aria-label="从队列中移除"
  title="从队列中移除"
  @click.stop="handleRemove(id)"
>
  <Trash2 :size="12" />
</QueueItemAction>
\`\`\`

---

## QueueItemAttachment

**作用**

- 附件容器，用于显示队列项关联的文件或图片。

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<QueueItemAttachment v-if="message.parts.some(p => p.type === 'file')">
  <QueueItemImage :src="imageUrl" alt="附件" />
  <QueueItemFile>文档.pdf</QueueItemFile>
</QueueItemAttachment>
\`\`\`

---

## QueueItemImage

**作用**

- 显示图片类型的附件，提供固定尺寸和圆角样式。

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`src\` | \`string\` | 图片 URL |
| \`alt\` | \`string\` | 图片描述 |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<QueueItemImage
  :src="file.url"
  :alt="file.filename || 'attachment'"
/>
\`\`\`

---

## QueueItemFile

**作用**

- 显示文件类型的附件，提供文件名展示。

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**Slots**

| 插槽 | 说明 |
| --- | --- |
| 默认插槽 | 文件名 |

**用法**

\`\`\`vue
<QueueItemFile>
  {{ file.filename || 'file' }}
</QueueItemFile>
\`\`\`

---

## QueueItemDescription

**作用**

- 显示队列项的描述文本，支持完成状态的样式变化。

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`completed\` | \`boolean\` | 是否已完成 |
| \`class\` | \`string \\| any\` | 额外样式类 |

**Slots**

| 插槽 | 说明 |
| --- | --- |
| 默认插槽 | 描述文本 |

**用法**

\`\`\`vue
<QueueItemDescription
  v-if="todo.description"
  :completed="todo.status === 'completed'"
>
  {{ todo.description }}
</QueueItemDescription>
\`\`\`

---

## 数据结构说明

### QueueMessage（排队消息）

\`\`\`ts
interface QueueMessagePart {
  type: string              // 'text' | 'file'
  text?: string            // 文本内容
  url?: string             // 文件 URL
  filename?: string        // 文件名
  mediaType?: string       // MIME 类型
}

interface QueueMessage {
  id: string
  parts: QueueMessagePart[]
}
\`\`\`

### QueueTodo（待办事项）

\`\`\`ts
interface QueueTodo {
  id: string
  title: string
  description?: string
  status?: 'pending' | 'completed'
}
\`\`\`

---

## 使用场景

### 场景 1：排队消息列表

用于显示等待发送的消息队列，支持附件预览和快速操作。

\`\`\`vue
<QueueSection v-if="messages.length > 0">
  <QueueSectionTrigger>
    <QueueSectionLabel :count="messages.length" label="Queued" />
  </QueueSectionTrigger>

  <QueueSectionContent>
    <QueueList>
      <QueueItem v-for="message in messages" :key="message.id">
        <div class="flex items-center gap-2">
          <QueueItemIndicator />
          <QueueItemContent>
            {{ getMessageText(message) }}
          </QueueItemContent>

          <QueueItemActions>
            <QueueItemAction
              aria-label="从队列中移除"
              @click="handleRemove(message.id)"
            >
              <Trash2 :size="12" />
            </QueueItemAction>
            <QueueItemAction
              aria-label="立即发送"
              @click="handleSendNow(message.id)"
            >
              <ArrowUp :size="14" />
            </QueueItemAction>
          </QueueItemActions>
        </div>

        <!-- 附件预览 -->
        <QueueItemAttachment v-if="hasAttachments(message)">
          <template v-for="file in getFiles(message)" :key="file.url">
            <QueueItemImage
              v-if="file.mediaType?.startsWith('image/')"
              :src="file.url"
              :alt="file.filename"
            />
            <QueueItemFile v-else>
              {{ file.filename }}
            </QueueItemFile>
          </template>
        </QueueItemAttachment>
      </QueueItem>
    </QueueList>
  </QueueSectionContent>
</QueueSection>
\`\`\`

### 场景 2：待办事项列表

用于显示任务列表，支持完成状态和描述信息。

\`\`\`vue
<QueueSection v-if="todos.length > 0">
  <QueueSectionTrigger>
    <QueueSectionLabel :count="todos.length" label="Todo" />
  </QueueSectionTrigger>

  <QueueSectionContent>
    <QueueList>
      <QueueItem v-for="todo in todos" :key="todo.id">
        <div class="flex items-center gap-2">
          <QueueItemIndicator :completed="todo.status === 'completed'" />
          <QueueItemContent :completed="todo.status === 'completed'">
            {{ todo.title }}
          </QueueItemContent>

          <QueueItemActions>
            <QueueItemAction
              aria-label="移除待办"
              @click="handleRemoveTodo(todo.id)"
            >
              <Trash2 :size="12" />
            </QueueItemAction>
          </QueueItemActions>
        </div>

        <QueueItemDescription
          v-if="todo.description"
          :completed="todo.status === 'completed'"
        >
          {{ todo.description }}
        </QueueItemDescription>
      </QueueItem>
    </QueueList>
  </QueueSectionContent>
</QueueSection>
\`\`\`

---

## 常见用法建议

1. **条件渲染**：使用 \`v-if\` 根据队列是否为空来显示/隐藏整个 Queue 组件
2. **分组管理**：使用多个 \`QueueSection\` 将不同类型的队列项分组展示
3. **状态管理**：通过 \`completed\` prop 统一控制指示器、内容和描述的完成状态样式
4. **附件处理**：根据 \`mediaType\` 判断使用 \`QueueItemImage\` 还是 \`QueueItemFile\`
5. **操作按钮**：使用 \`@click.stop\` 防止事件冒泡，避免触发父元素的点击事件
6. **无障碍支持**：为操作按钮添加 \`aria-label\` 和 \`title\` 属性提升可访问性
7. **响应式计数**：使用 \`computed\` 计算队列项数量，自动更新 \`QueueSectionLabel\` 的 \`count\`
`
</script>

<style lang="scss" scoped>
.guide-container {
  min-width: 900px;
  padding: 0 16px;
}
</style>
