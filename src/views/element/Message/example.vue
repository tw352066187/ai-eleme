<!-- eslint-disable no-console -->
<script setup lang="ts">
import {
  Message,
  MessageAction,
  MessageActions,
  MessageAttachment,
  MessageAttachments,
  MessageBranch,
  MessageBranchContent,
  MessageBranchNext,
  MessageBranchPage,
  MessageBranchPrevious,
  MessageBranchSelector,
  MessageContent,
  MessageResponse,
  MessageToolbar,
} from '@/components/ai-elements/message'
import {
  CopyIcon,
  RefreshCcwIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from 'lucide-vue-next'
import { nanoid } from 'nanoid'
import { ref } from 'vue'

interface Attachment {
  type: 'file'
  url: string
  mediaType?: string
  filename?: string
}

interface Version {
  id: string
  content: string
}

interface MessageType {
  key: string
  from: 'user' | 'assistant'
  versions?: Version[]
  content?: string
  attachments?: Attachment[]
}

const messages: {
  key: string
  from: 'user' | 'assistant'
  versions?: { id: string, content: string }[]
  content?: string
  attachments?: {
    type: 'file'
    url: string
    mediaType?: string
    filename?: string
  }[]
}[] = [
  {
    key: nanoid(),
    from: 'user',
    content: 'Vue 组合式 API 是如何工作的，我应该在什么时候使用它们？',
    attachments: [
      {
        type: 'file',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
        mediaType: 'image/jpeg',
        filename: '艺术宫.jpg',
      },
      {
        type: 'file',
        url: '',
        mediaType: 'application/pdf',
        filename: 'vue组合式API指南.pdf',
      },
    ],
  },
  {
    key: nanoid(),
    from: 'assistant',
    versions: [
      {
        id: nanoid(),
        content: `# Vue 组合式 API 指南

Vue 组合式 API 是一组函数，让你可以在组件的 \`setup()\` 函数中使用 Vue 的响应式和生命周期特性。以下是你需要了解的内容：

## 核心组合式函数

### ref()
创建响应式的基本类型值：

\`\`\`vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
<\/script>

<template>
  <button @click="count++">计数：{{ count }}</button>
</template>
\`\`\`

### watch()
当响应式值变化时运行副作用：

\`\`\`vue
<script setup>
import { ref, watch } from 'vue'

const count = ref(0)

watch(count, (newVal, oldVal) => {
  console.log(\`计数从 \${oldVal} 变为 \${newVal}\`)
})
<\/script>
\`\`\`

## 何时使用组合式 API

- ✅ **处理复杂逻辑** — 更容易组织和复用响应式状态
- ✅ **编写可复用代码** — 创建你自己的组合式函数（类似自定义钩子）
- ✅ **TypeScript 支持** — 比选项式 API 更友好的类型支持
- ❌ **简单组件** — 选项式 API 可能就足够了

## 组合式 API 的规则

1. 只在 **\`setup()\` 内部**或其他组合式函数中使用 Vue 组合式函数
2. 始终从 \`setup()\` 返回你想在模板中使用的内容

你想了解更多高级组合式函数，比如 \`computed\` 或 \`onMounted\` 吗？`,
      },
      {
        id: nanoid(),
        content: `Vue 组合式 API 是在 Vue 3 中编写组件的现代方式。它用单个 \`setup()\` 函数替代了选项式 API 的 data、methods 和 computed 属性。

以下是最常用的组合式函数：

- **ref()** — 创建响应式的基本类型值
- **reactive()** — 使整个对象变为响应式
- **computed()** — 创建派生的响应式值
- **watch()** — 在数据变化时运行副作用
- **onMounted()** — 组件挂载时的生命周期钩子

这是一个简单的例子：

\`\`\`vue
<script setup>
import { ref, onMounted } from 'vue'

const count = ref(0)

onMounted(() => {
  console.log('组件已挂载！')
})
<\/script>

<template>
  <button @click="count++">点击了 {{ count }} 次</button>
</template>
\`\`\`

你想深入了解哪个具体的组合式函数？`,
      },
      {
        id: nanoid(),
        content: `当然可以！Vue 组合式 API 为 Vue 组件中的逻辑和响应式管理带来了一种新的、更灵活的方式。

## 主要优势

1. **更清晰的代码组织** — 按功能特性分组相关逻辑
2. **可复用的逻辑** — 构建和共享你自己的组合式函数
3. **更好的 TypeScript 支持** — 比选项式 API 更强的类型支持

## 最常用的组合式函数

| 组合式函数 | 用途 |
|-------------|----------|
| ref | 响应式基本类型值 |
| reactive | 响应式对象 |
| computed | 派生的响应式值 |
| watch | 响应数据变化 |
| onMounted | 组件挂载时运行代码 |
| onUnmounted | 销毁时的清理逻辑 |

组合式 API 的美妙之处在于，它让你可以复用有状态的逻辑，而无需改变组件结构。想深入了解某个特定的组合式函数吗？`,
      },
    ],
  },
]

const liked = ref<Record<string, boolean>>({})
const disliked = ref<Record<string, boolean>>({})

function handleCopy(content: string) {
  navigator.clipboard.writeText(content)
}

function handleRetry() {
  console.log('重试中...')
}

function toggleLike(key: string) {
  liked.value = {
    ...liked.value,
    [key]: !liked.value[key],
  }
}

function toggleDislike(key: string) {
  disliked.value = {
    ...disliked.value,
    [key]: !disliked.value[key],
  }
}

function hasMultipleVersions(message: MessageType) {
  return message.versions && message.versions.length > 1
}

function handleBranchChange(index: number) {
  console.log('分支切换到：', index)
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <Message
      v-for="message in messages"
      :key="message.key"
      :from="message.from"
    >
      <!-- Multiple versions with branch selector -->
      <MessageBranch
        v-if="hasMultipleVersions(message)"
        :default-branch="0"
        @branch-change="handleBranchChange"
      >
        <MessageBranchContent>
          <MessageContent
            v-for="version in message.versions"
            :key="version.id"
          >
            <MessageResponse
              :content="version.content"
              :shiki-options="{
                langs: ['vue'],
              }"
            />
          </MessageContent>
        </MessageBranchContent>

        <MessageToolbar v-if="message.from === 'assistant'">
          <MessageBranchSelector :from="message.from">
            <MessageBranchPrevious />
            <MessageBranchPage />
            <MessageBranchNext />
          </MessageBranchSelector>

          <MessageActions>
            <MessageAction
              label="重试"
              tooltip="重新生成回复"
              @click="handleRetry"
            >
              <RefreshCcwIcon class="size-4" />
            </MessageAction>

            <MessageAction
              label="喜欢"
              tooltip="喜欢这个回复"
              @click="toggleLike(message.key)"
            >
              <ThumbsUpIcon
                class="size-4"
                :fill="liked[message.key] ? 'currentColor' : 'none'"
              />
            </MessageAction>

            <MessageAction
              label="不喜欢"
              tooltip="不喜欢这个回复"
              @click="toggleDislike(message.key)"
            >
              <ThumbsDownIcon
                class="size-4"
                :fill="disliked[message.key] ? 'currentColor' : 'none'"
              />
            </MessageAction>

            <MessageAction
              label="复制"
              tooltip="复制到剪贴板"
              @click="handleCopy(message.versions?.find((v) => v.id)?.content || '')"
            >
              <CopyIcon class="size-4" />
            </MessageAction>
          </MessageActions>
        </MessageToolbar>
      </MessageBranch>

      <!-- Single version without branch selector -->
      <div v-else>
        <MessageAttachments
          v-if="message.attachments && message.attachments.length > 0"
          class="mb-2"
        >
          <MessageAttachment
            v-for="attachment in message.attachments"
            :key="attachment.url"
            :data="{ ...attachment, mediaType: attachment.mediaType ?? 'application/octet-stream' }"
          />
        </MessageAttachments>

        <MessageContent>
          <MessageResponse v-if="message.from === 'assistant'" :content="message.content" />
          <template v-else>
            {{ message.content }}
          </template>
        </MessageContent>

        <MessageActions v-if="message.from === 'assistant' && message.versions">
          <MessageAction
            label="重试"
            tooltip="重新生成回复"
            @click="handleRetry"
          >
            <RefreshCcwIcon class="size-4" />
          </MessageAction>

          <MessageAction
            label="喜欢"
            tooltip="喜欢这个回复"
            @click="toggleLike(message.key)"
          >
            <ThumbsUpIcon
              class="size-4"
              :fill="liked[message.key] ? 'currentColor' : 'none'"
            />
          </MessageAction>

          <MessageAction
            label="不喜欢"
            tooltip="不喜欢这个回复"
            @click="toggleDislike(message.key)"
          >
            <ThumbsDownIcon
              class="size-4"
              :fill="disliked[message.key] ? 'currentColor' : 'none'"
            />
          </MessageAction>

          <MessageAction
            label="复制"
            tooltip="复制到剪贴板"
            @click="handleCopy(message.content || '')"
          >
            <CopyIcon class="size-4" />
          </MessageAction>
        </MessageActions>
      </div>
    </Message>
  </div>
</template>
