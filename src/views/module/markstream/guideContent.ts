// setCustomComponents 使用说明内容
export const guideContent = `
# setCustomComponents 使用指南

## 函数签名

\`\`\`typescript
// 方式1：带作用域 ID（推荐）
setCustomComponents(id: string, mapping: Partial<CustomComponents>): void

// 方式2：全局设置
setCustomComponents(mapping: Partial<CustomComponents>): void
\`\`\`

## 可替换的节点类型

| 节点类型 | 说明 | 常用程度 |
|---------|------|---------|
| \`code_block\` | 代码块 | ⭐⭐⭐ |
| \`image\` | 图片 ![alt](src) | ⭐⭐⭐ |
| \`mermaid\` | Mermaid 图表 | ⭐⭐⭐ |
| \`link\` | 链接 [text](url) | ⭐⭐ |
| \`paragraph\` | 段落 | ⭐⭐ |
| \`heading\` | 标题 h1-h6 | ⭐⭐ |
| \`table\` | 表格 | ⭐⭐ |
| \`blockquote\` | 引用块 > | ⭐ |
| \`list\` | 列表 ul/ol | ⭐ |
| \`math_block\` | 块级公式 | ⭐ |
| \`math_inline\` | 行内公式 | ⭐ |

## 使用步骤

### 1. 创建自定义组件

自定义组件接收的 props：

\`\`\`typescript
interface Props {
  node: any        // 节点数据
  stream?: boolean // 是否流式模式
  loading?: boolean // 加载状态
}
\`\`\`

示例代码：

\`\`\`vue
// CustomCodeBlock.vue
import { CodeBlockNode } from 'markstream-vue'

// 使用 CodeBlockNode 的插槽自定义头部
// #header-left - 左侧头部插槽
// #header-right - 右侧头部插槽
\`\`\`

### 2. 注册自定义组件

\`\`\`typescript
import { setCustomComponents } from 'markstream-vue'
import CustomCodeBlock from './CustomCodeBlock.vue'

// 在 onMounted 中注册
onMounted(() => {
  setCustomComponents('my-scope-id', {
    code_block: CustomCodeBlock,
  })
})
\`\`\`

### 3. 在 MarkdownRender 中使用

\`\`\`typescript
// 通过 custom-id 关联自定义组件
// custom-id="my-scope-id"
// :content="content"
// :is-dark="isDark"
\`\`\`

## CodeBlockNode 插槽

| 插槽名 | 说明 |
|--------|------|
| \`header-left\` | 代码块头部左侧区域 |
| \`header-right\` | 代码块头部右侧区域 |

## CodeBlockNode Props

| Prop | 类型 | 说明 |
|------|------|------|
| \`node\` | Object | 代码块节点数据 |
| \`stream\` | Boolean | 是否流式模式 |
| \`loading\` | Boolean | 加载状态 |
| \`monacoOptions\` | Object | Monaco 编辑器配置 |

## CodeBlockNode 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| \`copy\` | code: string | 复制代码时触发 |
| \`previewCode\` | code, lang | 预览代码时触发 |

## 相关 API

| 函数 | 说明 |
|------|------|
| \`setCustomComponents(id, mapping)\` | 注册自定义组件（带作用域） |
| \`getCustomNodeComponents(id?)\` | 获取指定作用域的自定义组件 |
| \`removeCustomComponents(id)\` | 移除指定作用域的自定义组件 |
| \`clearGlobalCustomComponents()\` | 清除全局自定义组件 |

## 注意事项

1. **作用域隔离**：推荐使用带 id 的方式注册，避免影响其他 MarkdownRender 实例
2. **组件清理**：在组件卸载时可调用 removeCustomComponents(id) 清理
3. **外层容器**：单独使用节点组件时，需要包裹 .markstream-vue 容器
4. **Monaco Worker**：使用 CodeBlockNode 需要配置 Vite 的 Monaco Worker
`
