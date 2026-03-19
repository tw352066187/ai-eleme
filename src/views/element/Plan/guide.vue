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
# Plan（计划）组件说明

本页说明基于示例页 \`example.vue\` 中的组合方式，覆盖每个组件的作用、主要 Props/Slots，以及推荐用法。

## 组件清单（示例里用到）

- \`Plan\`：计划卡片的容器组件，支持折叠/展开
- \`PlanHeader\`：计划头部，包含标题和触发器
- \`PlanTitle\`：计划标题
- \`PlanDescription\`：计划描述
- \`PlanTrigger\`：折叠/展开触发器按钮
- \`PlanContent\`：计划内容区域，可折叠
- \`PlanFooter\`：计划底部，通常包含操作按钮
- \`PlanAction\`：操作按钮容器

## 组件关系与约束

- \`Plan\` 是最外层容器，基于 \`Collapsible\` 和 \`Card\` 实现
- \`PlanHeader\` 始终可见，包含标题和折叠触发器
- \`PlanContent\` 是可折叠的内容区域
- \`PlanFooter\` 通常放在最底部，包含操作按钮
- 所有子组件必须在 \`Plan\` 内使用

## 使用场景

Plan 组件适用于：

- AI 生成的执行计划展示
- 任务分解和步骤说明
- 项目规划和里程碑
- 工作流程说明
- 任何需要展示结构化计划的场景

---

## Plan

**作用**

- 计划卡片的容器组件
- 基于 Collapsible 实现折叠/展开功能
- 基于 Card 提供卡片样式

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`isStreaming\` | \`boolean\` | 是否正在流式传输，默认 false |
| \`defaultOpen\` | \`boolean\` | 默认是否展开 |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<Plan :default-open="false">
  <PlanHeader>...</PlanHeader>
  <PlanContent>...</PlanContent>
  <PlanFooter>...</PlanFooter>
</Plan>
\`\`\`

---

## PlanHeader

**作用**

- 计划头部容器
- 始终可见，不受折叠影响
- 通常包含标题、描述和触发器

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**布局建议**

- 使用 flex 布局，标题和触发器分别在两侧
- 标题和描述垂直排列
- 触发器通常放在右上角

**用法**

\`\`\`vue
<PlanHeader>
  <div>
    <div class="mb-4 flex items-center gap-2">
      <FileText class="size-4" />
      <PlanTitle>计划标题</PlanTitle>
    </div>
    <PlanDescription>计划描述</PlanDescription>
  </div>
  <PlanTrigger />
</PlanHeader>
\`\`\`

---

## PlanTitle

**作用**

- 显示计划标题
- 提供统一的标题样式
- 支持与图标组合使用

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<PlanTitle>Rewrite AI Elements to VueJS</PlanTitle>
\`\`\`

---

## PlanDescription

**作用**

- 显示计划描述
- 提供次要文本样式
- 支持多行文本

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<PlanDescription>
  Rewrite the AI Elements component library from React to VueJS
  while maintaining compatibility with existing components.
</PlanDescription>
\`\`\`

---

## PlanTrigger

**作用**

- 折叠/展开触发器按钮
- 显示双向箭头图标
- 自动处理折叠状态

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**样式特点**

- 图标按钮样式（size-8）
- Ghost 变体（透明背景）
- 包含无障碍文本（"Toggle plan"）

**用法**

\`\`\`vue
<PlanTrigger />
\`\`\`

---

## PlanContent

**作用**

- 计划内容区域
- 可折叠/展开
- 包含详细的计划信息

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**内容建议**

- 使用标题和段落组织内容
- 使用列表展示步骤
- 保持内容结构清晰

**用法**

\`\`\`vue
<PlanContent>
  <div class="space-y-4 text-sm">
    <div>
      <h3 class="mb-2 font-semibold">Overview</h3>
      <p>计划概述...</p>
    </div>
    <div>
      <h3 class="mb-2 font-semibold">Key Steps</h3>
      <ul class="list-inside list-disc space-y-1">
        <li>步骤 1</li>
        <li>步骤 2</li>
      </ul>
    </div>
  </div>
</PlanContent>
\`\`\`

---

## PlanFooter

**作用**

- 计划底部容器
- 通常包含操作按钮
- 提供统一的布局

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**布局建议**

- 使用 \`justify-end\` 右对齐按钮
- 使用 \`justify-between\` 分散对齐
- 使用 \`justify-center\` 居中对齐

**用法**

\`\`\`vue
<PlanFooter class="justify-end">
  <PlanAction>...</PlanAction>
</PlanFooter>
\`\`\`

---

## PlanAction

**作用**

- 操作按钮容器
- 提供统一的按钮样式
- 支持键盘快捷键提示

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<PlanAction>
  <Button size="sm">
    Build
    <!-- 可选：添加键盘快捷键提示 -->
  </Button>
</PlanAction>
\`\`\`

---

## 完整使用示例

\`\`\`vue
<script setup lang="ts">
import {
  Plan,
  PlanAction,
  PlanContent,
  PlanDescription,
  PlanFooter,
  PlanHeader,
  PlanTitle,
  PlanTrigger,
} from '@/components/ai-elements/plan'
import { Button } from '@/components/ui/button'
import { FileText } from 'lucide-vue-next'
<\/script>

<template>
  <Plan :default-open="false">
    <!-- 头部：标题和描述 -->
    <PlanHeader>
      <div>
        <div class="mb-4 flex items-center gap-2">
          <FileText class="size-4" />
          <PlanTitle>Rewrite AI Elements to VueJS</PlanTitle>
        </div>
        <PlanDescription>
          Rewrite the AI Elements component library from React to VueJS
          while maintaining compatibility with existing React-based
          shadcn/ui components.
        </PlanDescription>
      </div>
      <PlanTrigger />
    </PlanHeader>

    <!-- 内容：详细信息 -->
    <PlanContent>
      <div class="space-y-4 text-sm">
        <div>
          <h3 class="mb-2 font-semibold">Overview</h3>
          <p>
            This plan outlines the migration strategy for converting
            the AI Elements library from React to VueJS.
          </p>
        </div>

        <div>
          <h3 class="mb-2 font-semibold">Key Steps</h3>
          <ul class="list-inside list-disc space-y-1">
            <li>Set up VueJS project structure</li>
            <li>Install vue-js/compat for React compatibility</li>
            <li>Migrate components one by one</li>
            <li>Update test suite for each component</li>
            <li>Verify compatibility with shadcn/ui</li>
          </ul>
        </div>
      </div>
    </PlanContent>

    <!-- 底部：操作按钮 -->
    <PlanFooter class="justify-end">
      <PlanAction>
        <Button size="sm">Build</Button>
      </PlanAction>
    </PlanFooter>
  </Plan>
</template>
\`\`\`

---

## 与示例页的对应关系（推荐理解方式）

- **卡片样式**：使用 Card 组件提供统一的卡片外观
- **折叠功能**：通过 PlanTrigger 控制内容的展开/收起
- **结构化内容**：使用标题、段落、列表组织计划信息
- **操作按钮**：在底部提供执行计划的操作入口

## 常见用法建议

- **默认状态**：使用 \`default-open\` 控制初始展开状态
- **流式传输**：设置 \`isStreaming\` 为 true 时可以显示加载状态
- **图标使用**：在标题旁添加图标可以增强视觉识别
- **内容组织**：使用标题和列表清晰地组织计划步骤
- **按钮位置**：通常将主要操作按钮放在右下角
- **响应式**：组件会自动适应容器宽度
- **无障碍支持**：触发器包含屏幕阅读器文本
- **键盘导航**：支持 Enter/Space 键切换折叠状态
- **动画效果**：折叠/展开有平滑的过渡动画
- **嵌套使用**：可以在对话流中嵌入多个计划卡片
`
</script>

<style lang="scss" scoped>
.guide-container {
  min-width: 900px;
  padding: 0 16px;
}
</style>

