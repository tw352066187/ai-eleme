<script setup lang="ts">
import { Reasoning, ReasoningContent, ReasoningTrigger } from '@/components/ai-elements/reasoning'
import { onMounted, ref } from 'vue'

const reasoningSteps = [
  '让我一步步思考这个问题。',
  '\n\n首先，我需要理解用户的需求。',
  '\n\n他们想要一个推理组件，在流式传输开始时自动打开，在流式传输结束时关闭。该组件应该是可组合的，并遵循代码库中的现有模式。',
  '\n\n看起来使用带有状态管理的可折叠组件是正确的方法。',
].join('')

const content = ref('')
const isStreaming = ref(false)
const currentTokenIndex = ref(0)
const tokens = ref<string[]>([])

function chunkIntoTokens(text: string): string[] {
  const tokenArray: string[] = []
  let i = 0
  while (i < text.length) {
    const chunkSize = Math.floor(Math.random() * 2) + 3
    tokenArray.push(text.slice(i, i + chunkSize))
    i += chunkSize
  }
  return tokenArray
}

function streamToken() {
  if (!isStreaming.value || currentTokenIndex.value >= tokens.value.length) {
    if (isStreaming.value) {
      isStreaming.value = false
    }
    return
  }

  content.value += tokens.value[currentTokenIndex.value]
  currentTokenIndex.value++

  setTimeout(streamToken, 25)
}

function startSimulation() {
  tokens.value = chunkIntoTokens(reasoningSteps)
  content.value = ''
  currentTokenIndex.value = 0
  isStreaming.value = true
  streamToken()
}

onMounted(() => {
  startSimulation()
})
</script>

<template>
  <div class="w-full p-4" style="height: 300px">
    <Reasoning class="w-full" :is-streaming="isStreaming">
      <ReasoningTrigger />
      <ReasoningContent :content="content" />
    </Reasoning>
  </div>
</template>
