<template>
  <div :class="cn('relative flex flex-col gap-2', className)">
    <!-- 输入区域 -->
    <div class="relative flex items-end gap-3 rounded-xl border border-border bg-background p-3 shadow-sm">
      <textarea
        ref="textareaRef"
        v-model="inputValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :rows="rows"
        class="flex-1 resize-none border-0 bg-transparent text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        @keydown="handleKeydown"
        @input="adjustHeight"
      />

      <!-- 发送按钮 -->
      <button
        :disabled="!canSend"
        :class="cn(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all',
          canSend
            ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm'
            : 'bg-muted text-muted-foreground cursor-not-allowed'
        )"
        @click="handleSend"
      >
        <svg
          v-if="!loading"
          class="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>

        <!-- 加载状态 -->
        <svg
          v-else
          class="h-4 w-4 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </button>
    </div>

    <!-- 提示文本 -->
    <div class="flex items-center justify-between px-1 text-xs text-muted-foreground">
      <span>{{ hint }}</span>
      <span v-if="maxLength">{{ inputValue.length }}/{{ maxLength }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  loading?: boolean
  rows?: number
  maxLength?: number
  hint?: string
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '输入消息...',
  disabled: false,
  loading: false,
  rows: 1,
  maxLength: 0,
  hint: 'Ctrl+Enter 发送消息',
  className: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'send': [value: string]
}>()

const textareaRef = ref<HTMLTextAreaElement>()
const inputValue = ref(props.modelValue)

// 计算是否可以发送
const canSend = computed(() => {
  return !props.disabled &&
         !props.loading &&
         inputValue.value.trim().length > 0 &&
         (props.maxLength === 0 || inputValue.value.length <= props.maxLength)
})

// 监听外部值变化
watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue
})

// 监听内部值变化
watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue)
})

// 自动调整高度
const adjustHeight = async () => {
  await nextTick()
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto'
    textareaRef.value.style.height = `${Math.min(textareaRef.value.scrollHeight, 200)}px`
  }
}

// 处理键盘事件
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    if (event.ctrlKey || event.metaKey) {
      event.preventDefault()
      handleSend()
    }
  }
}

// 处理发送
const handleSend = () => {
  if (!canSend.value) return

  const message = inputValue.value.trim()
  if (message) {
    emit('send', message)
    inputValue.value = ''
    adjustHeight()
  }
}

// 聚焦输入框
const focus = () => {
  textareaRef.value?.focus()
}

defineExpose({ focus })
</script>
