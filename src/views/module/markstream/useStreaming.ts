import { ref, computed, onUnmounted } from 'vue'

// 流式渲染上下文接口
export interface StreamingContext {
  // 完整的源内容
  sourceContent: string
  // 当前已渲染的字符索引
  currentIndex: number
  // 定时器 ID
  timerId: ReturnType<typeof setInterval> | null
  // 渲染速度 (ms/char)
  speed: number
}

// 流式渲染 composable
export function useStreaming() {
  // 当前显示的内容
  const content = ref('')
  // 是否正在流式渲染
  const isStreaming = ref(false)
  // 流式渲染速度 (毫秒/字符)
  const speed = ref(30)
  // 源内容
  const sourceContent = ref('')
  // 定时器 ID
  let timerId: ReturnType<typeof setInterval> | null = null

  // 计算属性：渲染进度百分比
  const progress = computed(() => {
    if (!sourceContent.value) return 0
    return Math.round((content.value.length / sourceContent.value.length) * 100)
  })

  // 计算属性：是否渲染完成
  const isComplete = computed(() => {
    return content.value.length >= sourceContent.value.length && sourceContent.value.length > 0
  })

  // 开始流式渲染
  const startStreaming = (source: string) => {
    // 停止之前的渲染
    stopStreaming()

    // 设置源内容
    sourceContent.value = source
    content.value = ''
    isStreaming.value = true

    let currentIndex = 0

    // 使用 setInterval 逐字符追加
    timerId = setInterval(() => {
      if (currentIndex < source.length) {
        // 每次追加一个字符
        content.value += source[currentIndex]
        currentIndex++
      } else {
        // 渲染完成
        stopStreaming()
      }
    }, speed.value)
  }

  // 停止流式渲染
  const stopStreaming = () => {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    }
    isStreaming.value = false
  }

  // 重置流式渲染
  const resetStreaming = () => {
    stopStreaming()
    content.value = ''
    sourceContent.value = ''
  }

  // 设置渲染速度
  const setSpeed = (newSpeed: number) => {
    speed.value = newSpeed
  }

  // 立即显示完整内容
  const showComplete = () => {
    if (sourceContent.value) {
      stopStreaming()
      content.value = sourceContent.value
    }
  }

  // 组件卸载时清理定时器
  onUnmounted(() => {
    stopStreaming()
  })

  return {
    content,
    isStreaming,
    speed,
    sourceContent,
    progress,
    isComplete,
    startStreaming,
    stopStreaming,
    resetStreaming,
    setSpeed,
    showComplete
  }
}
