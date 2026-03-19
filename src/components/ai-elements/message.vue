<template>
  <div :class="cn('group relative flex items-start gap-3 p-4', className)">
    <!-- 头像区域 -->
    <div class="shrink-0">
      <div
        v-if="avatar"
        :class="cn(
          'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium',
          role === 'user'
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground'
        )"
      >
        {{ avatar }}
      </div>
    </div>

    <!-- 消息内容区域 -->
    <div class="flex-1 space-y-2 overflow-hidden">
      <!-- 消息气泡 -->
      <div
        :class="cn(
          'rounded-lg px-4 py-3 text-sm leading-relaxed',
          role === 'user'
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-foreground'
        )"
      >
        <slot />

        <!-- 流式输入光标 -->
        <span
          v-if="isStreaming"
          class="ml-1 inline-block animate-pulse"
        >
          |
        </span>
      </div>

      <!-- 操作按钮区域 -->
      <div
        v-if="showActions && role === 'assistant'"
        class="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100"
      >
        <button
          class="rounded p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          title="复制"
          @click="$emit('copy')"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>

        <button
          class="rounded p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          title="重新生成"
          @click="$emit('regenerate')"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

interface Props {
  role: 'user' | 'assistant'
  avatar?: string
  isStreaming?: boolean
  showActions?: boolean
  className?: string
}

withDefaults(defineProps<Props>(), {
  avatar: '',
  isStreaming: false,
  showActions: true,
  className: '',
})

defineEmits<{
  copy: []
  regenerate: []
}>()
</script>
