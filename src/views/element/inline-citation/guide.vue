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
# Inline Citation（内联引用）组件说明

本页说明基于示例页 \`example.vue\` 中的组合方式，覆盖每个组件的作用、主要 Props/Slots，以及推荐用法。

## 组件清单（示例里用到）

- \`InlineCitation\`：内联引用的容器组件
- \`InlineCitationText\`：引用的文本内容
- \`InlineCitationCard\`：引用卡片容器（基于 HoverCard）
- \`InlineCitationCardTrigger\`：触发器徽章，显示来源数量
- \`InlineCitationCardBody\`：卡片主体内容
- \`InlineCitationCarousel\`：轮播容器，用于多个来源
- \`InlineCitationCarouselHeader\`：轮播头部，包含导航和索引
- \`InlineCitationCarouselContent\`：轮播内容容器
- \`InlineCitationCarouselItem\`：单个轮播项
- \`InlineCitationCarouselPrev\`：上一个按钮
- \`InlineCitationCarouselNext\`：下一个按钮
- \`InlineCitationCarouselIndex\`：当前索引显示
- \`InlineCitationSource\`：来源信息显示
- \`InlineCitationQuote\`：引用文本显示（可选）

## 组件关系与约束

- \`InlineCitation\` 是最外层容器，用于包裹引用文本和卡片
- \`InlineCitationCard\` 基于 \`HoverCard\` 实现悬浮效果
- \`InlineCitationCarousel\` 用于展示多个来源，支持左右切换
- 所有 Carousel 相关组件必须在 \`InlineCitationCarousel\` 内使用

## 使用场景

内联引用组件适用于：

- AI 生成内容的来源标注
- 学术文章的引用展示
- 新闻报道的信息来源
- 研究报告的参考文献
- 任何需要标注信息来源的场景

---

## InlineCitation

**作用**

- 内联引用的容器组件
- 提供内联布局和分组样式

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<InlineCitation>
  <InlineCitationText>引用文本</InlineCitationText>
  <InlineCitationCard>...</InlineCitationCard>
</InlineCitation>
\`\`\`

---

## InlineCitationText

**作用**

- 显示被引用的文本内容
- 通常带有下划线或特殊样式标识

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<InlineCitationText>
  The technology continues to evolve rapidly
</InlineCitationText>
\`\`\`

---

## InlineCitationCard

**作用**

- 引用卡片容器
- 基于 HoverCard 实现悬浮显示效果

**Props**

继承 HoverCard 的所有 props

**用法**

\`\`\`vue
<InlineCitationCard>
  <InlineCitationCardTrigger :sources="sources" />
  <InlineCitationCardBody>...</InlineCitationCardBody>
</InlineCitationCard>
\`\`\`

---

## InlineCitationCardTrigger

**作用**

- 触发器徽章，显示来源信息
- 自动提取第一个来源的域名
- 显示额外来源数量（如 +3）

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`sources\` | \`string[]\` | 必填，来源 URL 数组 |
| \`class\` | \`string \\| any\` | 额外样式类 |

**显示逻辑**

- 单个来源：显示域名（如 \`example.com\`）
- 多个来源：显示域名 + 数量（如 \`example.com +5\`）
- 无效 URL：显示 \`unknown\`

**用法**

\`\`\`vue
<InlineCitationCardTrigger
  :sources="['https://example.com', 'https://other.com']"
/>
<!-- 显示: example.com +1 -->
\`\`\`

---

## InlineCitationCardBody

**作用**

- 卡片主体内容容器
- 基于 HoverCardContent 实现

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<InlineCitationCardBody>
  <InlineCitationCarousel>...</InlineCitationCarousel>
</InlineCitationCardBody>
\`\`\`

---

## InlineCitationCarousel

**作用**

- 轮播容器，用于展示多个来源
- 提供上下文给子组件

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<InlineCitationCarousel>
  <InlineCitationCarouselHeader>...</InlineCitationCarouselHeader>
  <InlineCitationCarouselContent>...</InlineCitationCarouselContent>
</InlineCitationCarousel>
\`\`\`

---

## InlineCitationCarouselHeader

**作用**

- 轮播头部，包含导航按钮和索引
- 提供统一的布局和样式

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<InlineCitationCarouselHeader>
  <InlineCitationCarouselPrev />
  <InlineCitationCarouselNext />
  <InlineCitationCarouselIndex />
</InlineCitationCarouselHeader>
\`\`\`

---

## InlineCitationCarouselContent

**作用**

- 轮播内容容器
- 包含所有轮播项

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<InlineCitationCarouselContent>
  <InlineCitationCarouselItem v-for="source in sources" :key="source.url">
    <InlineCitationSource v-bind="source" />
  </InlineCitationCarouselItem>
</InlineCitationCarouselContent>
\`\`\`

---

## InlineCitationCarouselItem

**作用**

- 单个轮播项容器
- 包含单个来源的信息

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<InlineCitationCarouselItem>
  <InlineCitationSource
    title="文章标题"
    url="https://example.com"
    description="文章描述"
  />
</InlineCitationCarouselItem>
\`\`\`

---

## InlineCitationCarouselPrev

**作用**

- 上一个按钮
- 切换到前一个来源

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<InlineCitationCarouselPrev />
\`\`\`

---

## InlineCitationCarouselNext

**作用**

- 下一个按钮
- 切换到后一个来源

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<InlineCitationCarouselNext />
\`\`\`

---

## InlineCitationCarouselIndex

**作用**

- 显示当前索引
- 格式：当前页/总页数（如 1/6）

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<InlineCitationCarouselIndex />
\`\`\`

---

## InlineCitationSource

**作用**

- 显示来源的详细信息
- 包含标题、URL 和描述

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`title\` | \`string\` | 必填，来源标题 |
| \`url\` | \`string\` | 必填，来源 URL |
| \`description\` | \`string\` | 可选，来源描述 |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<InlineCitationSource
  title="Advances in Natural Language Processing"
  url="https://example.com/nlp-advances"
  description="A comprehensive study on recent developments"
/>
\`\`\`

---

## InlineCitationQuote

**作用**

- 显示引用的原文
- 可选组件，用于展示完整引用

**Props**

| Prop | 类型 | 说明 |
| --- | --- | --- |
| \`class\` | \`string \\| any\` | 额外样式类 |

**用法**

\`\`\`vue
<InlineCitationQuote>
  原文引用内容
</InlineCitationQuote>
\`\`\`

---

## 完整使用示例

\`\`\`vue
<script setup lang="ts">
import {
  InlineCitation,
  InlineCitationCard,
  InlineCitationCardBody,
  InlineCitationCardTrigger,
  InlineCitationCarousel,
  InlineCitationCarouselContent,
  InlineCitationCarouselHeader,
  InlineCitationCarouselIndex,
  InlineCitationCarouselItem,
  InlineCitationCarouselNext,
  InlineCitationCarouselPrev,
  InlineCitationSource,
  InlineCitationText,
} from '@/components/ai-elements/inline-citation'

// 定义引用数据
const citation = {
  text: 'The technology continues to evolve rapidly',
  sources: [
    {
      title: 'Advances in Natural Language Processing',
      url: 'https://example.com/nlp-advances',
      description: 'A comprehensive study on recent developments',
    },
    {
      title: 'Breakthroughs in Machine Learning',
      url: 'https://mlnews.org/breakthroughs',
      description: 'An overview of significant breakthroughs',
    },
    // 更多来源...
  ],
}
<\/script>

<template>
  <p class="text-sm leading-relaxed">
    According to recent studies, artificial intelligence has shown
    remarkable progress in natural language processing.

    <!-- 内联引用 -->
    <InlineCitation>
      <!-- 引用文本 -->
      <InlineCitationText>{{ citation.text }}</InlineCitationText>

      <!-- 引用卡片 -->
      <InlineCitationCard>
        <!-- 触发器徽章 -->
        <InlineCitationCardTrigger
          :sources="citation.sources.map(s => s.url)"
        />

        <!-- 卡片内容 -->
        <InlineCitationCardBody>
          <InlineCitationCarousel>
            <!-- 轮播头部：导航和索引 -->
            <InlineCitationCarouselHeader>
              <InlineCitationCarouselPrev />
              <InlineCitationCarouselNext />
              <InlineCitationCarouselIndex />
            </InlineCitationCarouselHeader>

            <!-- 轮播内容：来源列表 -->
            <InlineCitationCarouselContent>
              <InlineCitationCarouselItem
                v-for="source in citation.sources"
                :key="source.url"
              >
                <InlineCitationSource
                  :title="source.title"
                  :url="source.url"
                  :description="source.description"
                />
              </InlineCitationCarouselItem>
            </InlineCitationCarouselContent>
          </InlineCitationCarousel>
        </InlineCitationCardBody>
      </InlineCitationCard>
    </InlineCitation>.
  </p>
</template>
\`\`\`

---

## 与示例页的对应关系（推荐理解方式）

- **文本标注**：\`InlineCitationText\` 标记被引用的文本，通常带有下划线
- **来源徽章**：\`InlineCitationCardTrigger\` 显示来源域名和数量，鼠标悬停显示详情
- **轮播展示**：多个来源通过轮播方式展示，用户可以左右切换查看
- **详细信息**：每个来源显示标题、URL 和描述，提供完整的引用信息

## 常见用法建议

- **数据结构**：建议将引用数据组织为包含 \`text\` 和 \`sources\` 的对象
- **来源数组**：每个来源应包含 \`title\`、\`url\` 和 \`description\` 字段
- **URL 格式**：确保 URL 格式正确，以便正确提取域名
- **单个来源**：即使只有一个来源，也可以使用轮播组件，导航按钮会自动禁用
- **悬浮交互**：基于 HoverCard，支持鼠标悬停和键盘导航
- **内联使用**：组件设计为内联使用，可以自然地嵌入到段落文本中
- **样式定制**：所有组件都支持通过 \`class\` prop 自定义样式
- **无障碍支持**：组件提供完整的键盘导航和屏幕阅读器支持
- **响应式**：轮播组件会根据内容自动调整高度
`
</script>

<style lang="scss" scoped>
.guide-container {
  min-width: 900px;
  padding: 0 16px;
}
</style>

