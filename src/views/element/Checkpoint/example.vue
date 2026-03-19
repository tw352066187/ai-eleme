<script setup lang="ts">
import {
  Checkpoint,
  CheckpointIcon,
  CheckpointTrigger,
} from '@/components/ai-elements/checkpoint'
import { Conversation, ConversationContent } from '@/components/ai-elements/conversation'
import {
  Message,
  MessageContent,
  MessageResponse,
} from '@/components/ai-elements/message'
import { nanoid } from 'nanoid'
import { computed, ref } from 'vue'

interface MessageType {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const initialMessages: MessageType[] = [
  {
    id: nanoid(),
    role: 'user',
    content: '什么是 Vue？',
  },
  {
    id: nanoid(),
    role: 'assistant',
    content:
      'Vue 是一个用于构建用户界面的 JavaScript 库。它由尤雨溪开发，现在由他和一个开发者社区共同维护。Vue 采用渐进式框架设计，核心库只关注视图层，易于上手，同时也便于与第三方库或既有项目整合。',
  },
  {
    id: nanoid(),
    role: 'user',
    content: 'Vue 3 相比 Vue 2 有哪些主要改进？',
  },
  {
    id: nanoid(),
    role: 'assistant',
    content:
      'Vue 3 带来了许多重要改进：1) Composition API 提供了更灵活的代码组织方式；2) 性能提升，虚拟 DOM 重写，更快的渲染速度；3) 更好的 TypeScript 支持；4) Tree-shaking 支持，打包体积更小；5) Teleport、Suspense 等新特性；6) 多个根节点支持（Fragment）。',
  },
  {
    id: nanoid(),
    role: 'user',
    content: '什么是 Composition API？',
  },
  {
    id: nanoid(),
    role: 'assistant',
    content:
      'Composition API 是 Vue 3 引入的一套新的 API，它允许我们使用函数的方式来组织组件逻辑。主要包括 ref、reactive、computed、watch 等函数。相比 Options API，它提供了更好的逻辑复用、更灵活的代码组织，以及更好的类型推导支持。',
  },
  {
    id: nanoid(),
    role: 'user',
    content: 'ref 和 reactive 有什么区别？',
  },
  {
    id: nanoid(),
    role: 'assistant',
    content:
      'ref 和 reactive 都用于创建响应式数据，但有以下区别：\n\n1. **ref**：可以包装任何类型的值（基本类型和对象），通过 .value 访问\n2. **reactive**：只能用于对象类型，直接访问属性\n3. **ref** 更适合基本类型，**reactive** 更适合复杂对象\n4. **ref** 在模板中会自动解包，不需要 .value',
  },
  {
    id: nanoid(),
    role: 'user',
    content: '组件状态是如何工作的？',
  },
  {
    id: nanoid(),
    role: 'assistant',
    content:
      '在 Vue 中，组件状态通过响应式系统工作。当你使用 ref 或 reactive 创建状态时，Vue 会追踪这些状态的变化。当状态改变时，Vue 会自动更新依赖该状态的视图部分。这个过程是通过 Proxy（Vue 3）或 Object.defineProperty（Vue 2）实现的依赖收集和派发更新机制。',
  },
  {
    id: nanoid(),
    role: 'user',
    content: '如何在组件之间共享状态？',
  },
  {
    id: nanoid(),
    role: 'assistant',
    content:
      '在 Vue 中有多种方式共享状态：\n\n1. **Props/Emit**：父子组件通信\n2. **Provide/Inject**：跨层级组件通信\n3. **Pinia**：官方推荐的状态管理库\n4. **Composables**：使用 Composition API 创建可复用的状态逻辑\n5. **Event Bus**：事件总线（不推荐在大型应用中使用）',
  },
  {
    id: nanoid(),
    role: 'user',
    content: '什么是 Pinia？',
  },
  {
    id: nanoid(),
    role: 'assistant',
    content:
      'Pinia 是 Vue 的官方状态管理库，是 Vuex 的继任者。它提供了更简洁的 API、完整的 TypeScript 支持、模块化设计，不需要 mutations。Pinia 的 store 使用 Composition API 风格定义，包含 state、getters 和 actions，使用起来更加直观和灵活。',
  },
  {
    id: nanoid(),
    role: 'user',
    content: 'Vue Router 是做什么的？',
  },
  {
    id: nanoid(),
    role: 'assistant',
    content:
      'Vue Router 是 Vue.js 的官方路由管理器。它允许你构建单页应用（SPA），通过不同的 URL 展示不同的组件。主要功能包括：嵌套路由、动态路由匹配、路由参数、导航守卫、路由懒加载等。它与 Vue 深度集成，让构建复杂的单页应用变得简单。',
  },
  {
    id: nanoid(),
    role: 'user',
    content: '什么是虚拟 DOM？',
  },
  {
    id: nanoid(),
    role: 'assistant',
    content:
      '虚拟 DOM（Virtual DOM）是真实 DOM 的 JavaScript 对象表示。Vue 使用虚拟 DOM 来提高性能：\n\n1. 当状态改变时，Vue 创建新的虚拟 DOM 树\n2. 通过 diff 算法比较新旧虚拟 DOM 的差异\n3. 只更新真实 DOM 中需要改变的部分\n\n这样可以最小化 DOM 操作，提高应用性能。',
  },
  {
    id: nanoid(),
    role: 'user',
    content: 'Vue 的生命周期钩子有哪些？',
  },
  {
    id: nanoid(),
    role: 'assistant',
    content:
      'Vue 3 Composition API 中的主要生命周期钩子：\n\n- **onBeforeMount**：组件挂载前\n- **onMounted**：组件挂载后\n- **onBeforeUpdate**：数据更新前\n- **onUpdated**：数据更新后\n- **onBeforeUnmount**：组件卸载前\n- **onUnmounted**：组件卸载后\n- **onActivated**：keep-alive 组件激活时\n- **onDeactivated**：keep-alive 组件停用时',
  },
  {
    id: nanoid(),
    role: 'user',
    content: '如何优化 Vue 应用的性能？',
  },
  {
    id: nanoid(),
    role: 'assistant',
    content:
      'Vue 应用性能优化的常见方法：\n\n1. **代码分割**：使用路由懒加载\n2. **组件懒加载**：使用 defineAsyncComponent\n3. **虚拟滚动**：处理大列表\n4. **keep-alive**：缓存组件状态\n5. **computed 缓存**：避免重复计算\n6. **v-once**：只渲染一次的静态内容\n7. **生产环境构建**：压缩和优化代码\n8. **合理使用 v-show 和 v-if**',
  },
  {
    id: nanoid(),
    role: 'user',
    content: 'v-if 和 v-show 的区别是什么？',
  },
  {
    id: nanoid(),
    role: 'assistant',
    content:
      '**v-if** 和 **v-show** 都用于条件渲染，但有重要区别：\n\n**v-if**：\n- 真正的条件渲染，会销毁和重建元素\n- 有更高的切换开销\n- 适合不频繁切换的场景\n\n**v-show**：\n- 只是切换 CSS display 属性\n- 有更高的初始渲染开销\n- 适合频繁切换的场景\n\n选择原则：频繁切换用 v-show，运行时条件很少改变用 v-if。',
  },
  {
    id: nanoid(),
    role: 'user',
    content: '什么是 Teleport？',
  },
  {
    id: nanoid(),
    role: 'assistant',
    content:
      'Teleport 是 Vue 3 的新特性，允许我们将组件的 HTML 渲染到 DOM 中的任意位置，而不受组件层级的限制。这对于模态框、通知、下拉菜单等需要脱离父组件层级的 UI 元素特别有用。使用 `<Teleport to="#target">` 可以将内容传送到指定的 DOM 节点。',
  },
  {
    id: nanoid(),
    role: 'user',
    content: 'Vue 3 的 script setup 是什么？',
  },
  {
    id: nanoid(),
    role: 'assistant',
    content:
      '`<script setup>` 是 Vue 3 中 Composition API 的语法糖，它提供了更简洁的写法：\n\n- 顶层的变量和函数自动暴露给模板\n- 不需要显式 return\n- 更好的运行时性能\n- 更好的 TypeScript 类型推导\n- 自动注册组件\n\n它让代码更简洁，是 Vue 3 推荐的组件编写方式。',
  },
]

const messages = ref<MessageType[]>(initialMessages)
const checkpoints = ref([
  { messageCount: 10, timestamp: new Date(Date.now() - 3_600_000) },
])

const messagesWithCheckpoints = computed(() => {
  return messages.value.map((message, index) => {
    const checkpoint = checkpoints.value.find(
      cp => cp.messageCount === index + 1,
    )
    return { message, checkpoint }
  })
})

function handleRestore(messageCount: number) {
  messages.value = initialMessages.slice(0, messageCount)
}
</script>

<template>
  <div class="flex size-full flex-col rounded-lg border p-6">
    <Conversation>
      <ConversationContent>
        <template
          v-for="{ message, checkpoint } in messagesWithCheckpoints"
          :key="message.id"
        >
          <Message :from="message.role">
            <MessageContent>
              <MessageResponse>{{ message.content }}</MessageResponse>
            </MessageContent>
          </Message>

          <Checkpoint v-if="checkpoint">
            <CheckpointIcon />
            <CheckpointTrigger
              tooltip="将工作区和聊天恢复到此时间点"
              @click="handleRestore(checkpoint.messageCount)"
            >
              恢复检查点
            </CheckpointTrigger>
          </Checkpoint>
        </template>
      </ConversationContent>
    </Conversation>
  </div>
</template>
