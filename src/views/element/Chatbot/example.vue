<script setup lang="ts">
import type { PromptInputMessage } from '@/components/ai-elements/prompt-input'
import type { ChatStatus, ToolUIPart } from 'ai'
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton
} from '@/components/ai-elements/conversation'
import {
  Message,
  MessageBranch,
  MessageBranchContent,
  MessageBranchNext,
  MessageBranchPage,
  MessageBranchPrevious,
  MessageBranchSelector,
  MessageContent,
  MessageResponse
} from '@/components/ai-elements/message'
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
  ModelSelectorTrigger
} from '@/components/ai-elements/model-selector'
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputButton,
  PromptInputFooter,
  PromptInputHeader,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools
} from '@/components/ai-elements/prompt-input'
import { Reasoning, ReasoningContent, ReasoningTrigger } from '@/components/ai-elements/reasoning'
import { Source, Sources, SourcesContent, SourcesTrigger } from '@/components/ai-elements/sources'
import { Suggestion, Suggestions } from '@/components/ai-elements/suggestion'
import { CheckIcon, GlobeIcon, MicIcon } from 'lucide-vue-next'
import { nanoid } from 'nanoid'
import { computed, ref } from 'vue'

interface MessageVersion {
  id: string
  content: string
}

interface MessageSource {
  href: string
  title: string
}

interface MessageReasoning {
  content: string
  duration: number
}

interface MessageTool {
  name: string
  description: string
  status: ToolUIPart['state']
  parameters: Record<string, unknown>
  result?: string
  error?: string
}

interface MessageType {
  key: string
  from: 'user' | 'assistant'
  sources?: MessageSource[]
  versions: MessageVersion[]
  reasoning?: MessageReasoning
  tools?: MessageTool[]
}

const initialMessages: MessageType[] = [
  {
    key: nanoid(),
    from: 'user',
    versions: [
      {
        id: nanoid(),
        content: '你能解释一下如何有效使用 Vue 3 组合式 API 吗？'
      }
    ]
  },
  {
    key: nanoid(),
    from: 'assistant',
    sources: [
      {
        href: 'https://vuejs.org/guide/introduction.html',
        title: 'Vue 3 文档 - 简介'
      },
      {
        href: 'https://vuejs.org/guide/essentials/reactivity-fundamentals.html',
        title: 'Vue 3 响应式基础'
      }
    ],
    tools: [
      {
        name: 'mcp',
        description: '搜索 Vue 3 文档',
        status: 'input-available',
        parameters: {
          query: 'Vue 3 组合式 API 最佳实践',
          source: 'vuejs.org'
        },
        result: `{
  "query": "Vue 3 组合式 API 最佳实践",
  "results": [
    {
      "title": "响应式基础",
      "url": "https://vuejs.org/guide/essentials/reactivity-fundamentals.html",
      "snippet": "Vue 的响应式系统基于跟踪响应式状态并在状态变化时自动更新 DOM。核心原语是 ref() 和 reactive()。"
    },
    {
      "title": "组合式 API：setup()",
      "url": "https://vuejs.org/guide/essentials/composition-api-setup.html",
      "snippet": "setup() 钩子是在组件中使用组合式 API 的入口点。它在组件创建之前运行，是声明响应式状态和逻辑的地方。"
    },
    {
      "title": "响应式核心 API",
      "url": "https://vuejs.org/api/reactivity-core.html",
      "snippet": "响应式核心 API 提供了低级构建块，如 ref()、reactive()、computed() 和 watch()，用于创建和处理响应式状态。"
    }
  ]
}`,
        error: undefined
      }
    ],
    versions: [
      {
        id: nanoid(),
        content: `# Vue 3 组合式 API 概述

Vue 3 组合式 API 是一种使用纯函数和响应式原语来组织组件逻辑的强大方式。

## 核心概念

1. **setup()** 是在组件中使用组合式 API 的入口点。
2. **ref()** 为基本类型值创建响应式引用。
3. **reactive()** 为结构化状态创建深度响应式对象。
4. **computed()** 从其他响应式状态派生值。
5. **watch() / watchEffect()** 响应响应式变化运行副作用。

## 使用 ref() 和 computed() 的基本示例

\`\`\`ts
import { ref, computed } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const doubled = computed(() => count.value * 2)

    function increment() {
      count.value++
    }

    return {
      count,
      doubled,
      increment,
    }
  },
}
\`\`\`

这个组件使用组合式 API 在一个地方声明响应式状态和派生值。你想让我深入了解特定函数，比如 \`ref\` 或 \`reactive\` 吗？`
      }
    ]
  },
  {
    key: nanoid(),
    from: 'user',
    versions: [
      {
        id: nanoid(),
        content:
          '是的，你能更详细地解释一下 Vue 3 中的 ref 和 reactive 吗？我应该在什么时候使用其中一个而不是另一个？'
      },
      {
        id: nanoid(),
        content:
          '我特别想了解 Vue 3 中 ref() 和 reactive() 之间的区别。你能详细说明每种方法最适合什么时候使用吗？'
      },
      {
        id: nanoid(),
        content:
          '感谢概述！你能深入探讨一下 ref() 和 reactive() 在 Vue 3 应用中产生最大差异的具体用例吗？'
      }
    ]
  },
  {
    key: nanoid(),
    from: 'assistant',
    reasoning: {
      content: `用户要求详细解释 Vue 3 中的 ref() 和 reactive()。我应该提供每个 API 用途的清晰简洁的解释以及它们的区别。

ref() API 通常用于基本类型值，以及当你想要显式的 .value 访问时。

reactive() API 通常用于对象和数组，当你希望属性访问是响应式的时。

两者都是 Vue 响应式系统的一部分，但它们服务于不同的人体工程学和用例。`,
      duration: 10
    },
    versions: [
      {
        id: nanoid(),
        content: `## Vue 3 中的 ref() vs reactive()

两个 API 都创建响应式状态，但它们针对不同的用例进行了优化：

### ref()

\`ref()\` 最适合**基本类型值**（数字、字符串、布尔值）或当你想要单个响应式值时。

\`\`\`ts
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    function increment() {
      count.value++
    }

    return { count, increment }
  },
}
\`\`\`

- 在 JavaScript 中通过 \`.value\` 访问值。
- 在模板中，Vue 会自动解包 ref，所以你可以直接使用 \`{{ count }}\`。
- 当你需要传递单个响应式值时很有用。

### reactive()

\`reactive()\` 最适合**对象和数组**，你希望属性访问是响应式的。

\`\`\`ts
import { reactive } from 'vue'

export default {
  setup() {
    const state = reactive({
      count: 0,
      user: { name: 'Alice' },
    })

    function increment() {
      state.count++
    }

    return { state, increment }
  },
}
\`\`\`

- 你直接使用属性：\`state.count++\`。
- 解构时，应该使用 \`toRefs()\` 或 \`toRef()\` 来保持响应性。

### 何时使用哪个？

- 使用 **ref()** 当：
  - 你有单个基本类型值。
  - 你想从组合式函数中暴露响应式值。
  - 你需要显式的 \`.value\` 语义（例如，用于深度嵌套或共享状态）。

- 使用 **reactive()** 当：
  - 你有一个包含多个相关字段的状态对象。
  - 你想要更"类状态"的对象 API（例如，\`state.count\`、\`state.user.name\`）。

### 结论

在许多实际应用中，你会混合使用两者：使用 \`reactive()\` 处理分组状态，使用 \`ref()\` 处理需要传递或派生的单个值。`
      }
    ]
  }
]

const models = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    chef: 'OpenAI',
    chefSlug: 'openai',
    providers: ['openai', 'azure']
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    chef: 'OpenAI',
    chefSlug: 'openai',
    providers: ['openai', 'azure']
  },
  {
    id: 'claude-opus-4-20250514',
    name: 'Claude 4 Opus',
    chef: 'Anthropic',
    chefSlug: 'anthropic',
    providers: ['anthropic', 'azure', 'google', 'amazon-bedrock']
  },
  {
    id: 'claude-sonnet-4-20250514',
    name: 'Claude 4 Sonnet',
    chef: 'Anthropic',
    chefSlug: 'anthropic',
    providers: ['anthropic', 'azure', 'google', 'amazon-bedrock']
  },
  {
    id: 'gemini-2.0-flash-exp',
    name: 'Gemini 2.0 Flash',
    chef: 'Google',
    chefSlug: 'google',
    providers: ['google']
  }
]

const suggestions = [
  '用示例解释 Vue 3 组合式 API。',
  'Vue 3 中 ref() 和 reactive() 有什么区别？',
  'Vue 的响应式系统在底层是如何工作的？',
  '向我展示如何将选项式 API 组件迁移到组合式 API。',
  'Vue 3 中的计算属性是如何工作的？',
  '在 Vue 3 中我应该何时使用 watch() 而不是 watchEffect()？',
  '如何在大型 Vue 3 应用中使用组合式函数组织逻辑？',
  '解释使用 setup() 的 Vue 3 组件的生命周期。'
]

const mockResponses = [
  '这是一个很好的问题！让我帮你更好地理解这个概念。需要记住的关键是，正确的实现需要仔细考虑该领域的基本原则和最佳实践。',
  '我很乐意详细解释这个主题。据我了解，在处理这个问题时有几个重要因素需要考虑。让我为你逐步分解。',
  '这是一个经常出现的有趣话题。解决方案通常涉及理解核心概念并在正确的上下文中应用它们。这是我的建议...',
  '很好的主题选择！这是许多开发者都会遇到的问题。我建议的方法是从基础开始，然后逐步构建到更复杂的场景。',
  '这绝对值得探索。从我所看到的，处理这个问题的最佳方法是同时考虑理论方面和实际实现细节。'
]

const modelId = ref<string>(models[0]!.id)
const modelSelectorOpen = ref(false)
const useWebSearch = ref(false)
const useMicrophone = ref(false)
const status = ref<ChatStatus>('ready')
const messages = ref<MessageType[]>(cloneMessages(initialMessages))

const selectedModelData = computed(() => models.find((m) => m.id === modelId.value))

function cloneMessages(data: MessageType[]): MessageType[] {
  return data.map((message) => ({
    ...message,
    versions: message.versions.map((version) => ({ ...version })),
    sources: message.sources ? message.sources.map((source) => ({ ...source })) : undefined,
    reasoning: message.reasoning ? { ...message.reasoning } : undefined,
    tools: message.tools
      ? message.tools.map((tool) => ({
          ...tool,
          parameters: { ...tool.parameters }
        }))
      : undefined
  }))
}

function updateStreamingContent(versionId: string, content: string) {
  const target = messages.value.find((msg) =>
    msg.versions.some((version) => version.id === versionId)
  )
  if (!target) return
  const version = target.versions.find((v) => v.id === versionId)
  if (!version) return
  version.content = content
  messages.value = [...messages.value]
}

async function streamResponse(versionId: string, content: string) {
  status.value = 'streaming'
  const chars = content.split('') // 按字符分割，支持中英文
  let currentContent = ''

  for (let i = 0; i < chars.length; i += 1) {
    currentContent += chars[i]
    updateStreamingContent(versionId, currentContent)
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 50 + 20))
  }

  status.value = 'ready'
}

function addUserMessage(content: string) {
  const timestamp = Date.now()
  const userMessage: MessageType = {
    key: `user-${timestamp}`,
    from: 'user',
    versions: [
      {
        id: `user-${timestamp}`,
        content
      }
    ]
  }

  messages.value = [...messages.value, userMessage]

  setTimeout(() => {
    const assistantVersionId = `assistant-${Date.now()}`
    const assistantMessage: MessageType = {
      key: `assistant-${Date.now()}`,
      from: 'assistant',
      versions: [
        {
          id: assistantVersionId,
          content: ''
        }
      ]
    }

    messages.value = [...messages.value, assistantMessage]
    const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)]
    streamResponse(assistantVersionId, randomResponse as string)
  }, 500)
}

function handleSubmit(message: PromptInputMessage) {
  const text = message.text.trim()
  const hasText = text.length > 0
  const hasAttachments = message.files.length > 0

  if (!hasText && !hasAttachments) return

  status.value = 'submitted'

  addUserMessage(hasText ? text : '已发送附件')
}

function handleSuggestionClick(suggestion: string) {
  status.value = 'submitted'
  addUserMessage(suggestion)
}

function handleModelSelect(id: string) {
  modelId.value = id
  modelSelectorOpen.value = false
}

function toggleMicrophone() {
  useMicrophone.value = !useMicrophone.value
}

function toggleWebSearch() {
  useWebSearch.value = !useWebSearch.value
}
</script>

<template>
  <div class="relative flex size-full flex-col divide-y overflow-hidden">
    <div class="h-[500px]">
      <Conversation>
        <ConversationContent>
          <MessageBranch v-for="message in messages" :key="message.key" :default-branch="0">
            <MessageBranchContent>
              <Message
                v-for="version in message.versions"
                :key="`${message.key}-${version.id}`"
                :from="message.from"
              >
                <div>
                  <Sources v-if="message.sources?.length">
                    <SourcesTrigger :count="message.sources.length" />
                    <SourcesContent>
                      <Source
                        v-for="source in message.sources"
                        :key="source.href"
                        :href="source.href"
                        :title="source.title"
                      />
                    </SourcesContent>
                  </Sources>

                  <Reasoning v-if="message.reasoning" :duration="message.reasoning.duration">
                    <ReasoningTrigger />
                    <ReasoningContent :content="message.reasoning.content" />
                  </Reasoning>

                  <MessageContent>
                    <MessageResponse
                      :content="version.content"
                    />
                  </MessageContent>
                </div>
              </Message>
            </MessageBranchContent>

            <MessageBranchSelector v-if="message.versions.length > 1" :from="message.from">
              <MessageBranchPrevious />
              <MessageBranchPage />
              <MessageBranchNext />
            </MessageBranchSelector>
          </MessageBranch>
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
    </div>

    <div class="grid shrink-0 gap-4 pt-4">
      <Suggestions class="px-4">
        <Suggestion
          v-for="suggestion in suggestions"
          :key="suggestion"
          :suggestion="suggestion"
          @click="handleSuggestionClick"
        />
      </Suggestions>

      <div class="w-full px-4 pb-4">
        <PromptInput class="w-full" multiple global-drop @submit="handleSubmit">
          <PromptInputHeader>
            <PromptInputAttachments>
              <template #default="{ file }">
                <PromptInputAttachment :file="file" />
              </template>
            </PromptInputAttachments>
          </PromptInputHeader>

          <PromptInputBody>
            <PromptInputTextarea />
          </PromptInputBody>

          <PromptInputFooter>
            <PromptInputTools>
              <PromptInputActionMenu>
                <PromptInputActionMenuTrigger />
                <PromptInputActionMenuContent>
                  <PromptInputActionAddAttachments />
                </PromptInputActionMenuContent>
              </PromptInputActionMenu>

              <PromptInputButton
                :variant="useMicrophone ? 'default' : 'ghost'"
                @click="toggleMicrophone"
              >
                <MicIcon :size="16" />
                <span class="sr-only">麦克风</span>
              </PromptInputButton>

              <PromptInputButton
                :variant="useWebSearch ? 'default' : 'ghost'"
                @click="toggleWebSearch"
              >
                <GlobeIcon :size="16" />
                <span>搜索</span>
              </PromptInputButton>

              <ModelSelector v-model:open="modelSelectorOpen">
                <ModelSelectorTrigger as-child>
                  <PromptInputButton>
                    <ModelSelectorLogo
                      v-if="selectedModelData?.chefSlug"
                      :provider="selectedModelData.chefSlug"
                    />
                    <ModelSelectorName v-if="selectedModelData?.name">
                      {{ selectedModelData.name }}
                    </ModelSelectorName>
                  </PromptInputButton>
                </ModelSelectorTrigger>

                <ModelSelectorContent>
                  <ModelSelectorInput placeholder="搜索模型..." />
                  <ModelSelectorList>
                    <ModelSelectorEmpty>未找到模型。</ModelSelectorEmpty>

                    <ModelSelectorGroup
                      v-for="chef in ['OpenAI', 'Anthropic', 'Google']"
                      :key="chef"
                      :heading="chef"
                    >
                      <ModelSelectorItem
                        v-for="m in models.filter((model) => model.chef === chef)"
                        :key="m.id"
                        :value="m.id"
                        @select="() => handleModelSelect(m.id)"
                      >
                        <ModelSelectorLogo :provider="m.chefSlug" />
                        <ModelSelectorName>{{ m.name }}</ModelSelectorName>
                        <ModelSelectorLogoGroup>
                          <ModelSelectorLogo
                            v-for="provider in m.providers"
                            :key="provider"
                            :provider="provider"
                          />
                        </ModelSelectorLogoGroup>
                        <CheckIcon v-if="modelId === m.id" class="ml-auto size-4" />
                        <div v-else class="ml-auto size-4" />
                      </ModelSelectorItem>
                    </ModelSelectorGroup>
                  </ModelSelectorList>
                </ModelSelectorContent>
              </ModelSelector>
            </PromptInputTools>

            <PromptInputSubmit :disabled="status === 'streaming'" :status="status" />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  </div>
</template>
