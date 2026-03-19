// 示例数据接口定义
export interface ExampleItem {
  // 示例名称
  name: string
  // 示例 Markdown 内容
  content: string
  // 示例描述
  description: string
}

// 预设示例数据
export const EXAMPLES: ExampleItem[] = [
  {
    name: '基础语法',
    description: '展示标题、列表、强调等基础 Markdown 语法',
    content: `# Markdown 基础语法演示

## 文本格式

这是一段普通文本，包含 **加粗**、*斜体* 和 ~~删除线~~ 效果。

还可以使用 \`行内代码\` 来标记代码片段。

## 列表

### 无序列表
- 第一项
- 第二项
  - 嵌套项 A
  - 嵌套项 B
- 第三项

### 有序列表
1. 步骤一
2. 步骤二
3. 步骤三

## 引用

> 这是一段引用文本
>
> 可以包含多行内容

## 链接和图片

[访问 GitHub](https://github.com)

## 分隔线

---

以上就是基础语法的演示。
`
  },
  {
    name: '代码高亮',
    description: '展示多种语言的代码块高亮',
    content: `# 代码高亮演示

## JavaScript 示例

\`\`\`javascript
// 计算斐波那契数列
const fibonacci = (n) => {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}

// 使用示例
console.log(fibonacci(10)) // 输出: 55
\`\`\`

## TypeScript 示例

\`\`\`typescript
interface User {
  id: number
  name: string
  email: string
}

const getUser = async (id: number): Promise<User> => {
  const response = await fetch(\`/api/users/\${id}\`)
  return response.json()
}
\`\`\`

## Python 示例

\`\`\`python
def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

# 使用示例
print(quicksort([3, 6, 8, 10, 1, 2, 1]))
\`\`\`

## Vue 组件示例

\`\`\`vue
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
const increment = () => count.value++
</script>

<template>
  <button @click="increment">
    点击次数: {{ count }}
  </button>
</template>
\`\`\`
`
  },
  {
    name: 'Mermaid 图表',
    description: '展示流程图、时序图等图表',
    content: `# Mermaid 图表演示

## 流程图

\`\`\`mermaid
graph TD
    A[开始] --> B{是否登录?}
    B -->|是| C[进入主页]
    B -->|否| D[跳转登录页]
    D --> E[输入账号密码]
    E --> F{验证通过?}
    F -->|是| C
    F -->|否| G[显示错误]
    G --> E
    C --> H[结束]
\`\`\`

## 时序图

\`\`\`mermaid
sequenceDiagram
    participant U as 用户
    participant F as 前端
    participant B as 后端
    participant D as 数据库

    U->>F: 点击登录
    F->>B: 发送登录请求
    B->>D: 查询用户信息
    D-->>B: 返回用户数据
    B-->>F: 返回登录结果
    F-->>U: 显示登录状态
\`\`\`

## 饼图

\`\`\`mermaid
pie title 项目时间分配
    "开发" : 45
    "测试" : 25
    "设计" : 15
    "文档" : 15
\`\`\`
`
  },
  {
    name: '表格展示',
    description: '展示 Markdown 表格渲染效果',
    content: `# 表格演示

## 基础表格

| 姓名 | 年龄 | 职位 |
|------|------|------|
| 张三 | 28 | 前端工程师 |
| 李四 | 32 | 后端工程师 |
| 王五 | 26 | UI 设计师 |

## 对齐方式

| 左对齐 | 居中对齐 | 右对齐 |
|:-------|:--------:|-------:|
| 内容 | 内容 | 内容 |
| 较长的内容 | 较长的内容 | 较长的内容 |
| 短 | 短 | 短 |

## 技术栈对比

| 特性 | Vue 3 | React 18 | Angular 17 |
|------|-------|----------|------------|
| 响应式 | Proxy | useState/useReducer | Zone.js |
| 模板语法 | SFC | JSX | HTML 模板 |
| 状态管理 | Pinia | Redux/Zustand | NgRx |
| 学习曲线 | 低 | 中 | 高 |
| 包大小 | 小 | 中 | 大 |

## 项目进度

| 模块 | 状态 | 负责人 | 预计完成 | 优先级 | 进度 | 工时 | 风险 | 依赖 | 测试 | 文档 | 部署 | 评审 | 验收 | 备注 |
|------|------|--------|----------|--------|------|------|------|------|------|------|------|------|------|------|
| 用户管理 | ✅ 完成 | 张三 | 01-15 | P0 | 100% | 40h | 低 | 无 | ✅ | ✅ | ✅ | ✅ | ✅ | 已上线 |
| 权限系统 | 🔄 进行 | 李四 | 01-20 | P0 | 75% | 60h | 中 | 用户 | 🔄 | 🔄 | ⏳ | ⏳ | ⏳ | 联调中 |
| 数据报表 | ⏳ 待开始 | 王五 | 01-30 | P1 | 0% | 80h | 高 | 权限 | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | 需求确认 |
| API 网关 | ✅ 完成 | 赵六 | 01-10 | P0 | 100% | 32h | 低 | 无 | ✅ | ✅ | ✅ | ✅ | ✅ | 已上线 |
| 消息中心 | ✅ 完成 | 张三 | 01-12 | P1 | 100% | 24h | 低 | 用户 | ✅ | ✅ | ✅ | ✅ | ✅ | 已上线 |
`
  }
]
