<template>
  <div :class="cn('flex h-full flex-col', className)">
    <!-- 对话标题栏 -->
    <div
      v-if="title || $slots.header"
      class="flex items-center justify-between border-b border-border bg-background/95 p-4 backdrop-blur"
    >
      <div class="flex items-center gap-2">
        <h2 v-if="title" class="text-lg font-semibold text-foreground">{{ title }}</h2>
        <slot name="header" />
      </div>

      <div class="flex items-center gap-2">
        <slot name="actions" />
      </div>
    </div>

    <!-- 消息列表区域 -->
    <div
      ref="messagesRef"
      class="flex-1 overflow-y-auto scroll-smooth"
      @scroll="handleScroll"
    >
      <div class="mx-auto max-w-3xl space-y-1 p-4">
        <slot />
      </div>
    </div>

    <!-- 滚动到底部按钮 -->
    <transition
      enter-active-class="transition-all duration-200"
      enter-from-class="scale-95 opacity-0"
      enter-to-class="scale-100 opacity-100"
      leave-active-class="transition-all duration-200"
      leave-from-class="scale-100 opacity-100"
      leave-to-class="scale-95 opacity-0"
    >
      <button
        v-if="showScrollButton"
        class="absolute bottom-24 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background shadow-lg transition-colors hover:bg-muted"
        @click="() => scrollToBottom()"
      >
        <svg class="h-4 w-4 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>
    </transition>

    <!-- 输入区域 -->
    <div
      v-if="$slots.input"
      class="border-t border-border bg-background/95 p-4 backdrop-blur"
    >
      <div class="mx-auto max-w-3xl">
        <slot name="input" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  title?: string
  autoScroll?: boolean
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  autoScroll: true,
  className: '',
})

const emit = defineEmits<{
  'scroll': [event: Event]
  'scroll-to-bottom': []
}>()

const messagesRef = ref<HTMLElement>()
const showScrollButton = ref(false)

// 检查是否在底部
const isAtBottom = () => {
  if (!messagesRef.value) return true

  const { scrollTop, scrollHeight, clientHeight } = messagesRef.value
  return scrollHeight - scrollTop - clientHeight < 50
}

// 滚动到底部
const scrollToBottom = (smooth = true) => {
  if (!messagesRef.value) return

  messagesRef.value.scrollTo({
    top: messagesRef.value.scrollHeight,
    behavior: smooth ? 'smooth' : 'auto',
  })

  emit('scroll-to-bottom')
}

// 处理滚动事件
const handleScroll = (event: Event) => {
  showScrollButton.value = !isAtBottom()
  emit('scroll', event)
}

// 自动滚动到底部
const autoScrollToBottom = async () => {
  if (!props.autoScroll) return

  await nextTick()
  if (isAtBottom()) {
    scrollToBottom(false)
  }
}

// 监听 DOM 变化
let observer: MutationObserver | null = null

onMounted(() => {
  if (messagesRef.value && props.autoScroll) {
    observer = new MutationObserver(() => {
      autoScrollToBottom()
    })

    observer.observe(messagesRef.value, {
      childList: true,
      subtree: true,
      characterData: true,
    })
  }

  nextTick(() => scrollToBottom(false))
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})

defineExpose({ scrollToBottom, isAtBottom })
</script>
