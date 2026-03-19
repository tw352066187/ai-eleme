# markstream-vue 自定义组件使用指南

## setCustomComponents 详解

`setCustomComponents` 是 markstream-vue 提供的核心 API，用于替换默认的节点渲染组件。

### 函数签名

```ts
// 方式1：带作用域 ID（推荐）
setCustomComponents(id: string, mapping: Partial<CustomComponents>): void

// 方式2：全局设置（不推荐，会影响所有 MarkdownRender）
setCustomComponents(mapping: Partial<CustomComponents>): void
```

### 可替换的节点类型

```ts
interface CustomComponents {
  text: Component           // 文本节点
  paragraph: Component      // 段落 <p>
  heading: Component        // 标题 h1-h6
  code_block: Component     // 代码块 ```code``` ⭐常用
  list: Component           // 列表 ul/ol
  blockquote: Component     // 引用块 >
  table: Component          // 表格
  definition_list: Component // 定义列表
  footnote: Component       // 脚注
  footnote_reference: Component
  admonition: Component     // 提示框 :::tip
  hardbreak: Component      // 硬换行
  link: Component           // 链接 [text](url)
  image: Component          // 图片 ![alt](src) ⭐常用
  thematic_break: Component // 分割线 ---
  math_inline: Component    // 行内公式 $x$
  math_block: Component     // 块级公式 $$x$$
  strong: Component         // 粗体 **text**
  emphasis: Component       // 斜体 *text*
  strikethrough: Component  // 删除线 ~~text~~
  highlight: Component      // 高亮 ==text==
  insert: Component         // 插入 ++text++
  subscript: Component      // 下标 ~text~
  superscript: Component    // 上标 ^text^
  emoji: Component          // 表情 :smile:
  checkbox: Component       // 复选框 [ ] / [x]
  inline_code: Component    // 行内代码 `code`
  html_inline: Component    // 内联 HTML
  reference: Component      // 引用
  mermaid: Component        // Mermaid 图表 ⭐常用
}
```

---

## 使用步骤

### 1. 创建自定义组件

自定义组件会接收以下 props：

```ts
interface NodeProps {
  node: {
    type: string      // 节点类型
    content?: string  // 内容
    lang?: string     // 语言（代码块）
    children?: any[]  // 子节点
    // ... 其他属性
  }
  stream?: boolean    // 是否流式模式
  loading?: boolean   // 加载状态
}
```

### 2. 注册自定义组件

```ts
import { setCustomComponents } from 'markstream-vue'
import MyCodeBlock from './MyCodeBlock.vue'

// 在 onMounted 或 setup 中注册
setCustomComponents('my-custom-id', {
  code_block: MyCodeBlock,
})
```

### 3. 在 MarkdownRender 中使用

```vue
<MarkdownRender 
  custom-id="my-custom-id"
  :content="content" 
/>
```

---

## 代码块自定义示例

### CustomCodeBlock.vue

```vue
<script setup lang="ts">
import { CodeBlockNode } from 'markstream-vue'

defineProps<{
  node: any
  stream?: boolean
  loading?: boolean
}>()

const emit = defineEmits<{
  copy: [code: string]
}>()
</script>

<template>
  <CodeBlockNode
    :node="node"
    :stream="stream"
    :loading="loading"
    @copy="(code) => emit('copy', code)"
  >
    <!-- 左侧头部插槽 -->
    <template #header-left>
      <span class="lang-tag">{{ node.lang || 'text' }}</span>
    </template>

    <!-- 右侧头部插槽 -->
    <template #header-right>
      <button @click="emit('copy', node.content)">复制</button>
      <button>运行</button>
    </template>
  </CodeBlockNode>
</template>
```

### CodeBlockNode 可用插槽

| 插槽名 | 说明 |
|--------|------|
| `header-left` | 代码块头部左侧区域 |
| `header-right` | 代码块头部右侧区域 |

### CodeBlockNode Props

| Prop | 类型 | 说明 |
|------|------|------|
| `node` | Object | 代码块节点数据 |
| `stream` | Boolean | 是否流式模式 |
| `loading` | Boolean | 加载状态 |
| `monacoOptions` | Object | Monaco 编辑器配置 |

### CodeBlockNode 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `copy` | code: string | 复制代码时触发 |
| `previewCode` | code, lang | 预览代码时触发 |

---

## 图片自定义示例

```vue
<script setup lang="ts">
import { ImageNode } from 'markstream-vue'

defineProps<{ node: any }>()

const handleClick = (e: Event) => {
  // 打开 lightbox 预览
  console.log('图片被点击', e)
}
</script>

<template>
  <ImageNode :node="node" @click="handleClick" />
</template>
```

---

## 相关 API

| 函数 | 说明 |
|------|------|
| `setCustomComponents(id, mapping)` | 注册自定义组件（带作用域） |
| `setCustomComponents(mapping)` | 注册全局自定义组件 |
| `getCustomNodeComponents(id?)` | 获取指定作用域的自定义组件 |
| `removeCustomComponents(id)` | 移除指定作用域的自定义组件 |
| `clearGlobalCustomComponents()` | 清除全局自定义组件 |

---

## 注意事项

1. **作用域隔离**：推荐使用带 `id` 的方式注册，避免影响其他 MarkdownRender 实例
2. **组件清理**：在组件卸载时可调用 `removeCustomComponents(id)` 清理
3. **外层容器**：单独使用节点组件时，需要包裹 `.markstream-vue` 容器
4. **Monaco Worker**：使用 CodeBlockNode 需要配置 Vite 的 Monaco Worker
