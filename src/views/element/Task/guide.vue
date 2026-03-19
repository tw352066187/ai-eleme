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
# Task（任务列表）组件说明

本页说明基于示例页 \`example.vue\` 中的组合方式，覆盖每个组件的作用、主要 Props/Slots，以及推荐用法。

## 组件清单（示例里用到）

- \`Task\`：任务列表容器，提供折叠状态管理
- \`TaskTrigger\`：折叠触发器，显示任务标题和展开/收起控制
- \`TaskContent\`：任务内容区域，与折叠状态联动
- \`TaskItem\`：单个任务项
- \`TaskItemFile\`：任务项中的文件引用组件

## 组件关系与约束

- \`TaskTrigger\` 和 \`TaskContent\` 必须放在 \`Task\` 内使用，依赖其提供的折叠状态上下文
- \`TaskItem\` 通常放在 \`TaskContent\` 内使用
- \`TaskItemFile\` 用于在任务项中显示文件引用，通常放在 \`TaskItem\` 内使用

---

## Task

**作用**

- 作为任务列表的容器组件，提供折叠状态管理
- 提供上下文给子组件使用
- 支持展开/收起任务列表

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`defaultOpen\` | \`boolean\` | 默认是否展开（默认 \`false\`） |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<Task default-open>
  <TaskTrigger title="任务列表" />
  <TaskContent>
    <TaskItem>任务 1</TaskItem>
    <TaskItem>任务 2</TaskItem>
  </TaskContent>
</Task>
\`\`\`

---

## TaskTrigger

**作用**

- 作为折叠触发器，显示任务标题
- 点击可切换展开/收起状态
- 显示展开/收起箭头指示器

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`title\` | \`string\` | 任务标题文本 |
| \`class\` | \`string \\| any\` | 额外样式类 |

**Slots**

| 插槽 | 说明 |
| --- | --- |
| 默认插槽 | 自定义触发器内容（不传则使用 \`title\` prop） |

**用法**

\`\`\`vue
<!-- 使用 title prop -->
<TaskTrigger title="找到项目文件" />

<!-- 使用插槽自定义内容 -->
<TaskTrigger>
  <div class="flex items-center gap-2">
    <Icon name="folder" />
    <span>找到项目文件</span>
  </div>
</TaskTrigger>
\`\`\`

---

## TaskContent

**作用**

- 任务列表的内容区域，与折叠状态联动
- 展开时显示，收起时隐藏
- 提供任务项的容器和布局

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<TaskContent>
  <TaskItem>扫描文件中...</TaskItem>
  <TaskItem>读取配置文件</TaskItem>
  <TaskItem>分析依赖关系</TaskItem>
</TaskContent>
\`\`\`

---

## TaskItem

**作用**

- 显示单个任务项
- 支持纯文本或包含文件引用的复杂内容
- 提供统一的样式和布局

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**Slots**

| 插槽 | 说明 |
| --- | --- |
| 默认插槽 | 任务项内容（可以是文本或包含 TaskItemFile 的复杂内容） |

**用法**

\`\`\`vue
<!-- 纯文本任务 -->
<TaskItem>正在扫描 52 个文件</TaskItem>

<!-- 包含文件引用的任务 -->
<TaskItem>
  <span class="inline-flex items-center gap-1">
    读取
    <TaskItemFile>
      <Icon name="vue" />
      <span>index.vue</span>
    </TaskItemFile>
  </span>
</TaskItem>
\`\`\`

---

## TaskItemFile

**作用**

- 在任务项中显示文件引用
- 提供文件图标和文件名的容器
- 带有特殊的样式（背景色、圆角等）

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**Slots**

| 插槽 | 说明 |
| --- | --- |
| 默认插槽 | 文件图标和文件名 |

**样式特性**

- 带有背景色和边框
- 圆角样式
- 内联显示，与文本对齐
- 支持图标和文本组合

**用法**

\`\`\`vue
<TaskItemFile>
  <svg viewBox="0 0 32 32" class="size-4">
    <!-- Vue logo SVG -->
  </svg>
  <span>index.vue</span>
</TaskItemFile>
\`\`\`

---

## 数据结构说明

### TaskEntry（任务项数据）

\`\`\`ts
interface TaskEntry {
  key: string              // 唯一标识
  type?: 'text' | 'file'  // 任务类型
  text?: string           // 任务文本
  filename?: string       // 文件名（当 type 为 'file' 时）
}
\`\`\`

---

## 使用场景

### 场景 1：文件扫描任务

显示 AI 扫描和读取项目文件的过程。

\`\`\`vue
<script setup lang="ts">
import { Task, TaskContent, TaskItem, TaskItemFile, TaskTrigger } from '@/components/ai-elements/task'
import { nanoid } from 'nanoid'
import { ref } from 'vue'

interface TaskEntry {
  key: string
  type?: 'text' | 'file'
  text?: string
  filename?: string
}

const tasks = ref<TaskEntry[]>([
  { key: nanoid(), text: '搜索 "app/page.tsx, components structure"' },
  { key: nanoid(), type: 'file', text: '读取', filename: 'index.vue' },
  { key: nanoid(), text: '扫描 52 个文件' },
  { key: nanoid(), text: '扫描 2 个文件' },
  { key: nanoid(), type: 'file', text: '读取文件', filename: 'layout.vue' },
])
<\/script>

<template>
  <Task class="w-full">
    <TaskTrigger title="找到项目文件" />
    <TaskContent>
      <TaskItem v-for="task in tasks" :key="task.key">
        <!-- 纯文本任务 -->
        <template v-if="!task.type">
          {{ task.text }}
        </template>

        <!-- 包含文件的任务 -->
        <template v-else>
          <span class="inline-flex items-center gap-1">
            {{ task.text }}
            <TaskItemFile>
              <svg viewBox="0 0 32 32" class="size-4">
                <path d="M2 4L16 28L30 4H24.5L16 18.5L7.5 4H2Z" fill="#41B883" />
                <path d="M7.5 4L16 18.5L24.5 4H19.5L16.0653 10.0126L12.5 4H7.5Z" fill="#35495E" />
              </svg>
              <span>{{ task.filename }}</span>
            </TaskItemFile>
          </span>
        </template>
      </TaskItem>
    </TaskContent>
  </Task>
</template>
\`\`\`

### 场景 2：流式任务更新

动态添加任务项，模拟实时任务执行过程。

\`\`\`vue
<script setup lang="ts">
import { Task, TaskContent, TaskItem, TaskTrigger } from '@/components/ai-elements/task'
import { nanoid } from 'nanoid'
import { ref } from 'vue'

interface TaskEntry {
  key: string
  text: string
  status: 'pending' | 'running' | 'completed'
}

const tasks = ref<TaskEntry[]>([])
const isRunning = ref(false)

async function startTasks() {
  isRunning.value = true
  tasks.value = []

  const taskList = [
    '初始化项目环境',
    '安装依赖包',
    '编译 TypeScript',
    '生成构建文件',
    '优化资源',
    '完成构建'
  ]

  for (const taskText of taskList) {
    const task: TaskEntry = {
      key: nanoid(),
      text: taskText,
      status: 'running'
    }

    tasks.value.push(task)

    // 模拟任务执行时间
    await new Promise(resolve => setTimeout(resolve, 800))

    task.status = 'completed'
  }

  isRunning.value = false
}
<\/script>

<template>
  <div>
    <Task default-open>
      <TaskTrigger title="构建任务" />
      <TaskContent>
        <TaskItem
          v-for="task in tasks"
          :key="task.key"
          :class="{
            'text-gray-400': task.status === 'completed',
            'text-blue-600': task.status === 'running'
          }"
        >
          <span class="flex items-center gap-2">
            <span v-if="task.status === 'running'">⏳</span>
            <span v-else-if="task.status === 'completed'">✓</span>
            {{ task.text }}
          </span>
        </TaskItem>

        <TaskItem v-if="tasks.length === 0">
          暂无任务
        </TaskItem>
      </TaskContent>
    </Task>

    <button
      @click="startTasks"
      :disabled="isRunning"
      class="mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
    >
      {{ isRunning ? '执行中...' : '开始构建' }}
    </button>
  </div>
</template>
\`\`\`

### 场景 3：多类型任务

展示不同类型的任务项，包括文件、命令、网络请求等。

\`\`\`vue
<script setup lang="ts">
import { Task, TaskContent, TaskItem, TaskItemFile, TaskTrigger } from '@/components/ai-elements/task'
import { File, Terminal, Globe } from 'lucide-vue-next'
import { nanoid } from 'nanoid'
import { ref } from 'vue'

interface TaskEntry {
  key: string
  type: 'file' | 'command' | 'network'
  text: string
  detail?: string
}

const tasks = ref<TaskEntry[]>([
  { key: nanoid(), type: 'file', text: '读取配置文件', detail: 'config.json' },
  { key: nanoid(), type: 'command', text: '执行命令', detail: 'npm install' },
  { key: nanoid(), type: 'network', text: '请求 API', detail: 'https://api.example.com' },
  { key: nanoid(), type: 'file', text: '写入日志', detail: 'build.log' },
])

const iconMap = {
  file: File,
  command: Terminal,
  network: Globe
}
<\/script>

<template>
  <Task default-open>
    <TaskTrigger title="执行任务" />
    <TaskContent>
      <TaskItem v-for="task in tasks" :key="task.key">
        <span class="inline-flex items-center gap-1">
          {{ task.text }}
          <TaskItemFile>
            <component :is="iconMap[task.type]" class="size-3" />
            <span>{{ task.detail }}</span>
          </TaskItemFile>
        </span>
      </TaskItem>
    </TaskContent>
  </Task>
</template>
\`\`\`

### 场景 4：嵌套任务组

使用多个 Task 组件展示不同阶段的任务。

\`\`\`vue
<script setup lang="ts">
import { Task, TaskContent, TaskItem, TaskTrigger } from '@/components/ai-elements/task'
import { ref } from 'vue'

const prepareTasks = ref([
  '检查环境变量',
  '验证配置文件',
  '初始化数据库连接'
])

const buildTasks = ref([
  '编译 TypeScript',
  '打包资源文件',
  '生成 source map'
])

const deployTasks = ref([
  '上传到服务器',
  '更新配置',
  '重启服务'
])
<\/script>

<template>
  <div class="space-y-4">
    <Task default-open>
      <TaskTrigger title="准备阶段" />
      <TaskContent>
        <TaskItem v-for="(task, index) in prepareTasks" :key="index">
          {{ task }}
        </TaskItem>
      </TaskContent>
    </Task>

    <Task>
      <TaskTrigger title="构建阶段" />
      <TaskContent>
        <TaskItem v-for="(task, index) in buildTasks" :key="index">
          {{ task }}
        </TaskItem>
      </TaskContent>
    </Task>

    <Task>
      <TaskTrigger title="部署阶段" />
      <TaskContent>
        <TaskItem v-for="(task, index) in deployTasks" :key="index">
          {{ task }}
        </TaskItem>
      </TaskContent>
    </Task>
  </div>
</template>
\`\`\`

### 场景 5：带进度的任务列表

显示任务执行进度和统计信息。

\`\`\`vue
<script setup lang="ts">
import { Task, TaskContent, TaskItem, TaskTrigger } from '@/components/ai-elements/task'
import { computed, ref } from 'vue'

interface TaskEntry {
  id: string
  text: string
  completed: boolean
}

const tasks = ref<TaskEntry[]>([
  { id: '1', text: '分析代码结构', completed: true },
  { id: '2', text: '生成文档', completed: true },
  { id: '3', text: '运行测试', completed: false },
  { id: '4', text: '生成报告', completed: false },
])

const completedCount = computed(() => tasks.value.filter(t => t.completed).length)
const totalCount = computed(() => tasks.value.length)
const progress = computed(() => Math.round((completedCount.value / totalCount.value) * 100))
<\/script>

<template>
  <Task default-open>
    <TaskTrigger>
      <div class="flex items-center justify-between w-full">
        <span>任务进度</span>
        <span class="text-sm text-gray-500">
          {{ completedCount }}/{{ totalCount }} ({{ progress }}%)
        </span>
      </div>
    </TaskTrigger>
    <TaskContent>
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :class="task.completed ? 'text-gray-400 line-through' : ''"
      >
        <span class="flex items-center gap-2">
          <span>{{ task.completed ? '✓' : '○' }}</span>
          {{ task.text }}
        </span>
      </TaskItem>
    </TaskContent>
  </Task>
</template>
\`\`\`

---

## 完整示例

以下是一个完整的 AI 代码分析场景示例：

\`\`\`vue
<script setup lang="ts">
import { Task, TaskContent, TaskItem, TaskItemFile, TaskTrigger } from '@/components/ai-elements/task'
import { nanoid } from 'nanoid'
import { onMounted, ref } from 'vue'

interface TaskEntry {
  key: string
  type?: 'text' | 'file'
  text?: string
  filename?: string
  icon?: string
}

const tasks = ref<TaskEntry[]>([])
const isAnalyzing = ref(false)

async function startAnalysis() {
  isAnalyzing.value = true
  tasks.value = []

  const taskSequence: TaskEntry[] = [
    { key: nanoid(), text: '搜索项目文件...' },
    { key: nanoid(), text: '找到 127 个文件' },
    { key: nanoid(), type: 'file', text: '读取', filename: 'package.json' },
    { key: nanoid(), type: 'file', text: '读取', filename: 'tsconfig.json' },
    { key: nanoid(), text: '分析依赖关系' },
    { key: nanoid(), type: 'file', text: '扫描', filename: 'src/main.ts' },
    { key: nanoid(), type: 'file', text: '扫描', filename: 'src/App.vue' },
    { key: nanoid(), text: '生成组件树' },
    { key: nanoid(), text: '分析完成' },
  ]

  for (const task of taskSequence) {
    tasks.value.push(task)
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  isAnalyzing.value = false
}

onMounted(() => {
  startAnalysis()
})
<\/script>

<template>
  <div class="p-4 space-y-4">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-bold">AI 代码分析</h2>
      <button
        @click="startAnalysis"
        :disabled="isAnalyzing"
        class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {{ isAnalyzing ? '分析中...' : '重新分析' }}
      </button>
    </div>

    <Task default-open class="w-full">
      <TaskTrigger title="项目分析任务" />
      <TaskContent>
        <TaskItem v-for="task in tasks" :key="task.key">
          <template v-if="!task.type">
            {{ task.text }}
          </template>

          <template v-else>
            <span class="inline-flex items-center gap-1">
              {{ task.text }}
              <TaskItemFile>
                <svg viewBox="0 0 32 32" class="size-4">
                  <path d="M2 4L16 28L30 4H24.5L16 18.5L7.5 4H2Z" fill="#41B883" />
                  <path d="M7.5 4L16 18.5L24.5 4H19.5L16.0653 10.0126L12.5 4H7.5Z" fill="#35495E" />
                </svg>
                <span>{{ task.filename }}</span>
              </TaskItemFile>
            </span>
          </template>
        </TaskItem>

        <TaskItem v-if="tasks.length === 0">
          等待开始分析...
        </TaskItem>
      </TaskContent>
    </Task>
  </div>
</template>
\`\`\`

---

## 常见用法建议

1. **唯一标识**：为每个任务项提供唯一的 \`key\`，使用 \`nanoid\` 或 \`uuid\` 生成
2. **流式更新**：使用 \`ref\` 和数组操作动态添加任务项，模拟实时执行
3. **状态管理**：为任务项添加状态字段（pending/running/completed），提供视觉反馈
4. **文件引用**：使用 \`TaskItemFile\` 组件突出显示文件名，提升可读性
5. **默认展开**：对于重要的任务列表，使用 \`default-open\` 属性默认展开
6. **嵌套组织**：使用多个 \`Task\` 组件组织不同阶段或类型的任务
7. **进度显示**：在 \`TaskTrigger\` 中显示完成进度，让用户了解整体状态
8. **空状态处理**：当没有任务时，显示友好的提示信息
9. **性能优化**：对于大量任务项，考虑使用虚拟滚动或分页
10. **无障碍支持**：为任务项添加适当的 \`aria-label\`，方便屏幕阅读器用户

---

## 最佳实践

### 任务内容设计

- **简洁明了**：任务描述应简短清晰，避免冗长的文本
- **动词开头**：使用动词开头，如"读取"、"扫描"、"分析"等
- **具体信息**：提供具体的文件名、数量等信息
- **状态指示**：使用图标或颜色表示任务状态

### 交互设计

- **默认状态**：根据场景选择合适的默认展开/收起状态
- **即时反馈**：任务状态变化时提供即时的视觉反馈
- **流畅动画**：使用过渡动画使任务添加和状态变化更流畅
- **可操作性**：考虑添加任务操作按钮（如取消、重试等）

### 性能优化

- **虚拟滚动**：对于大量任务项，使用虚拟滚动优化渲染性能
- **懒加载**：延迟加载非关键任务项
- **批量更新**：使用批量更新减少重渲染次数
- **防抖处理**：对于频繁更新的任务，使用防抖避免过度渲染
`
</script>

<style lang="scss" scoped>
.guide-container {
  min-width: 900px;
  padding: 0 16px;
}
</style>
