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
# Model Selector（模型选择器）组件说明

本页说明基于示例页 \`example.vue\` 中的组合方式，覆盖每个组件的作用、主要 Props/Slots，以及推荐用法。

## 组件清单（示例里用到）

- \`ModelSelector\`：模型选择器的容器组件
- \`ModelSelectorTrigger\`：触发器按钮
- \`ModelSelectorContent\`：下拉内容容器
- \`ModelSelectorInput\`：搜索输入框
- \`ModelSelectorList\`：模型列表容器
- \`ModelSelectorEmpty\`：空状态显示
- \`ModelSelectorGroup\`：模型分组容器
- \`ModelSelectorItem\`：单个模型项
- \`ModelSelectorLogo\`：模型/提供商 Logo
- \`ModelSelectorLogoGroup\`：Logo 组容器
- \`ModelSelectorName\`：模型名称显示

## 组件关系与约束

- \`ModelSelector\` 是最外层容器，管理打开/关闭状态
- \`ModelSelectorTrigger\` 和 \`ModelSelectorContent\` 必须作为 \`ModelSelector\` 的直接子组件
- \`ModelSelectorGroup\` 用于按提供商或类别分组模型
- \`ModelSelectorItem\` 必须在 \`ModelSelectorList\` 内使用

## 使用场景

Model Selector 组件适用于：

- AI 应用的模型切换
- 多模型对比工具
- API 配置界面
- 开发者工具
- 任何需要选择 AI 模型的场景

---

## ModelSelector

**作用**

- 模型选择器的容器组件
- 管理打开/关闭状态
- 提供上下文给子组件

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`open\` | \`boolean\` | 控制打开/关闭状态（支持 v-model） |
| \`class\` | \`string \\| any\` | 额外样式类 |

**事件**

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| \`update:open\` | \`(value: boolean)\` | 状态变化时触发 |

**用法**

\`\`\`vue
<ModelSelector v-model:open="open">
  <ModelSelectorTrigger>...</ModelSelectorTrigger>
  <ModelSelectorContent>...</ModelSelectorContent>
</ModelSelector>
\`\`\`

---

## ModelSelectorTrigger

**作用**

- 触发器按钮
- 点击打开/关闭选择器
- 通常显示当前选中的模型

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<ModelSelectorTrigger>
  <Button variant="outline">
    <ModelSelectorLogo :provider="currentModel.provider" />
    <ModelSelectorName>{{ currentModel.name }}</ModelSelectorName>
  </Button>
</ModelSelectorTrigger>
\`\`\`

---

## ModelSelectorContent

**作用**

- 下拉内容容器
- 包含搜索框和模型列表
- 自动处理定位和动画

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<ModelSelectorContent>
  <ModelSelectorInput placeholder="Search models..." />
  <ModelSelectorList>...</ModelSelectorList>
</ModelSelectorContent>
\`\`\`

---

## ModelSelectorInput

**作用**

- 搜索输入框
- 支持实时过滤模型列表
- 自动聚焦

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`placeholder\` | \`string\` | 占位符文本 |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<ModelSelectorInput placeholder="Search models..." />
\`\`\`

---

## ModelSelectorList

**作用**

- 模型列表容器
- 提供滚动和布局
- 支持键盘导航

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<ModelSelectorList>
  <ModelSelectorEmpty>No models found.</ModelSelectorEmpty>
  <ModelSelectorGroup>...</ModelSelectorGroup>
</ModelSelectorList>
\`\`\`

---

## ModelSelectorEmpty

**作用**

- 空状态显示
- 当搜索无结果时显示
- 提供友好的提示信息

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<ModelSelectorEmpty>
  No models found.
</ModelSelectorEmpty>
\`\`\`

---

## ModelSelectorGroup

**作用**

- 模型分组容器
- 按提供商或类别分组
- 显示分组标题

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`heading\` | \`string\` | 分组标题 |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<ModelSelectorGroup heading="OpenAI">
  <ModelSelectorItem v-for="model in openaiModels" :key="model.id">
    ...
  </ModelSelectorItem>
</ModelSelectorGroup>
\`\`\`

---

## ModelSelectorItem

**作用**

- 单个模型项
- 可点击选择
- 显示选中状态

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`value\` | \`string\` | 模型 ID |
| \`class\` | \`string \\| any\` | 额外样式类 |

**事件**

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| \`select\` | \`(value: string)\` | 选择时触发 |

**用法**

\`\`\`vue
<ModelSelectorItem
  :value="model.id"
  @select="handleSelect(model.id)"
>
  <ModelSelectorLogo :provider="model.provider" />
  <ModelSelectorName>{{ model.name }}</ModelSelectorName>
  <Check v-if="isSelected" class="ml-auto size-4" />
</ModelSelectorItem>
\`\`\`

---

## ModelSelectorLogo

**作用**

- 显示模型或提供商的 Logo
- 自动根据 provider 加载对应图标
- 支持多种提供商

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`provider\` | \`string\` | 提供商标识（如 'openai', 'anthropic'） |
| \`class\` | \`string \\| any\` | 额外样式类 |

**支持的提供商**

- \`openai\` - OpenAI
- \`anthropic\` - Anthropic
- \`google\` - Google
- \`llama\` - Meta Llama
- \`deepseek\` - DeepSeek
- \`mistral\` - Mistral AI
- \`alibaba\` - Alibaba
- \`cohere\` - Cohere
- \`xai\` - xAI
- \`moonshotai\` - Moonshot AI
- \`perplexity\` - Perplexity
- \`v0\` - Vercel
- \`amazon-bedrock\` - Amazon Bedrock
- 等等...

**用法**

\`\`\`vue
<ModelSelectorLogo provider="openai" />
<ModelSelectorLogo provider="anthropic" />
\`\`\`

---

## ModelSelectorLogoGroup

**作用**

- Logo 组容器
- 用于显示模型支持的多个提供商
- 提供统一的布局和间距

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<ModelSelectorLogoGroup>
  <ModelSelectorLogo
    v-for="provider in model.providers"
    :key="provider"
    :provider="provider"
  />
</ModelSelectorLogoGroup>
\`\`\`

---

## ModelSelectorName

**作用**

- 显示模型名称
- 提供统一的文本样式
- 支持截断和省略

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<ModelSelectorName>GPT-4o</ModelSelectorName>
\`\`\`

---

## 完整使用示例

\`\`\`vue
<script setup lang="ts">
import {
  ModelSelector,
  ModelSelectorContent,
  ModelSelectorEmpty,
  ModelSelectorGroup,
  ModelSelectorInput,
  ModelSelectorItem,
  ModelSelectorList,
  ModelSelectorLogo,
  ModelSelectorLogoGroup,
  ModelSelectorName,
  ModelSelectorTrigger,
} from '@/components/ai-elements/model-selector'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-vue-next'
import { computed, ref } from 'vue'

// 定义模型数据结构
interface Model {
  id: string
  name: string
  chef: string
  chefSlug: string
  providers: string[]
}

// 模型列表
const models: Model[] = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    chef: 'OpenAI',
    chefSlug: 'openai',
    providers: ['openai', 'azure'],
  },
  {
    id: 'claude-opus-4',
    name: 'Claude 4 Opus',
    chef: 'Anthropic',
    chefSlug: 'anthropic',
    providers: ['anthropic', 'azure'],
  },
  // 更多模型...
]

// 状态管理
const open = ref(false)
const selectedModel = ref<string>('gpt-4o')

// 计算属性
const selectedModelData = computed(() =>
  models.find(m => m.id === selectedModel.value)
)
const chefs = Array.from(new Set(models.map(m => m.chef)))

// 选择处理
function handleSelect(id: string) {
  selectedModel.value = id
  open.value = false
}
<\/script>

<template>
  <ModelSelector v-model:open="open">
    <!-- 触发器 -->
    <ModelSelectorTrigger>
      <Button class="w-[200px] justify-between" variant="outline">
        <ModelSelectorLogo
          v-if="selectedModelData?.chefSlug"
          :provider="selectedModelData.chefSlug"
        />
        <ModelSelectorName>
          {{ selectedModelData?.name }}
        </ModelSelectorName>
      </Button>
    </ModelSelectorTrigger>

    <!-- 下拉内容 -->
    <ModelSelectorContent>
      <!-- 搜索框 -->
      <ModelSelectorInput placeholder="Search models..." />

      <!-- 模型列表 -->
      <ModelSelectorList>
        <!-- 空状态 -->
        <ModelSelectorEmpty>No models found.</ModelSelectorEmpty>

        <!-- 按提供商分组 -->
        <ModelSelectorGroup
          v-for="chef in chefs"
          :key="chef"
          :heading="chef"
        >
          <!-- 模型项 -->
          <ModelSelectorItem
            v-for="model in models.filter(m => m.chef === chef)"
            :key="model.id"
            :value="model.id"
            @select="handleSelect(model.id)"
          >
            <ModelSelectorLogo :provider="model.chefSlug" />
            <ModelSelectorName>{{ model.name }}</ModelSelectorName>

            <!-- 支持的提供商 -->
            <ModelSelectorLogoGroup>
              <ModelSelectorLogo
                v-for="provider in model.providers"
                :key="provider"
                :provider="provider"
              />
            </ModelSelectorLogoGroup>

            <!-- 选中标记 -->
            <Check v-if="selectedModel === model.id" class="ml-auto size-4" />
            <div v-else class="ml-auto size-4" />
          </ModelSelectorItem>
        </ModelSelectorGroup>
      </ModelSelectorList>
    </ModelSelectorContent>
  </ModelSelector>
</template>
\`\`\`

---

## 与示例页的对应关系（推荐理解方式）

- **触发器显示**：显示当前选中模型的 Logo 和名称
- **搜索功能**：实时过滤模型列表
- **分组展示**：按提供商（OpenAI、Anthropic 等）分组
- **多提供商支持**：显示每个模型支持的所有提供商
- **选中状态**：使用 Check 图标标记当前选中的模型

## 常见用法建议

- **数据结构**：建议使用包含 id、name、chef、providers 的模型对象
- **状态管理**：使用 \`v-model:open\` 控制打开/关闭状态
- **选择处理**：在 \`@select\` 事件中更新选中模型并关闭选择器
- **分组策略**：可以按提供商、模型类型或其他维度分组
- **搜索优化**：搜索框会自动过滤列表，无需额外处理
- **Logo 显示**：确保 provider 标识与组件支持的提供商匹配
- **键盘导航**：组件自动支持上下键导航和回车选择
- **无障碍支持**：提供完整的 ARIA 标签和键盘支持
- **响应式**：组件会自动适应容器宽度
- **性能优化**：大量模型时建议使用虚拟滚动或分页
`
</script>

<style lang="scss" scoped>
.guide-container {
  min-width: 900px;
  padding: 0 16px;
}
</style>
