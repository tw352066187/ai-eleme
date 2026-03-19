<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick, computed } from 'vue'
import mermaid from 'mermaid'
import {
  RemoveOutline,
  AddOutline,
  DownloadOutline,
  ExpandOutline,
  ContractOutline,
  ChevronDownOutline
} from '@vicons/ionicons5'

// markstream-vue 传递的 node 结构
interface MermaidNode {
  type: string
  value: string
  props?: {
    id?: string
    language?: string
  }
}

const props = defineProps<{
  node: MermaidNode
}>()

// 从 node 中提取代码和 ID
const code = computed(() => props.node?.value || '')
const chartId = computed(() => props.node?.props?.id || `mermaid-${Date.now()}`)

const activeTab = ref<'chart' | 'code'>('chart')
const scale = ref(100)
const isFullscreen = ref(false)
const svgContent = ref('')
const isCollapsed = ref(false)
const renderError = ref('')
const isRendering = ref(false)

// 初始化 Mermaid
mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
})

// 渲染图表
const renderChart = async () => {
  const mermaidCode = code.value?.trim()
  if (!mermaidCode) {
    return
  }
  if (activeTab.value !== 'chart') return
  if (isRendering.value) return

  isRendering.value = true
  renderError.value = ''

  try {
    // 使用唯一 ID 避免冲突
    const uniqueId = `mermaid-render-${chartId.value}-${Date.now()}`
    const { svg } = await mermaid.render(uniqueId, mermaidCode)
    svgContent.value = svg
  } catch (e: any) {
    console.error('Mermaid render error:', e)
    renderError.value = e.message || '图表渲染失败'
  } finally {
    isRendering.value = false
  }
}

// 缩放控制
const zoomIn = () => {
  if (scale.value < 200) scale.value += 10
}

const zoomOut = () => {
  if (scale.value > 50) scale.value -= 10
}

// 下载 SVG
const downloadSvg = () => {
  if (!svgContent.value) return
  const blob = new Blob([svgContent.value], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `mermaid-${chartId.value}.svg`
  a.click()
  URL.revokeObjectURL(url)
}

// 全屏切换
const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
  if (isFullscreen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

// 折叠/展开
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

// 关闭全屏（ESC键）
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isFullscreen.value) {
    toggleFullscreen()
  }
}

// 监听 code 变化，重新渲染
watch(code, (newCode) => {
  if (newCode?.trim()) {
    nextTick(() => {
      renderChart()
    })
  }
}, { immediate: true })

watch(activeTab, () => {
  if (activeTab.value === 'chart' && !svgContent.value && code.value?.trim()) {
    nextTick(renderChart)
  }
})

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  if (code.value?.trim()) {
    renderChart()
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  if (isFullscreen.value) {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <div class="mermaid-chart" :class="{ fullscreen: isFullscreen }">
    <!-- 全屏遮罩 -->
    <div v-if="isFullscreen" class="fullscreen-overlay" @click="toggleFullscreen"></div>

    <div class="chart-card" :class="{ 'fullscreen-card': isFullscreen }">
      <!-- 头部 -->
      <div class="chart-header">
        <div class="header-left">
          <div class="tab-group">
            <button
              class="tab-btn"
              :class="{ active: activeTab === 'chart' }"
              @click="activeTab = 'chart'"
            >
              图表
            </button>
            <button
              class="tab-btn"
              :class="{ active: activeTab === 'code' }"
              @click="activeTab = 'code'"
            >
              代码
            </button>
          </div>
        </div>
        <div class="header-right">
          <div class="toolbar">
            <button class="tool-btn" @click="zoomOut" title="缩小">
              <n-icon size="16"><RemoveOutline /></n-icon>
            </button>
            <span class="scale-text">{{ scale }}%</span>
            <button class="tool-btn" @click="zoomIn" title="放大">
              <n-icon size="16"><AddOutline /></n-icon>
            </button>
            <span class="divider"></span>
            <button class="tool-btn text-btn" @click="downloadSvg" title="下载" :disabled="!svgContent">
              <n-icon size="16"><DownloadOutline /></n-icon>
              <span>下载</span>
            </button>
            <button class="tool-btn text-btn" @click="toggleFullscreen" title="全屏">
              <n-icon size="16">
                <ContractOutline v-if="isFullscreen" />
                <ExpandOutline v-else />
              </n-icon>
              <span>{{ isFullscreen ? '退出' : '全屏' }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 内容区 -->
      <div class="chart-content" :class="{ collapsed: isCollapsed }">
        <!-- 图表视图 -->
        <div
          v-show="activeTab === 'chart'"
          class="chart-view"
          :style="{ transform: `scale(${scale / 100})` }"
        >
          <!-- 加载中 -->
          <div v-if="isRendering" class="chart-loading">
            <n-spin size="small" />
            <span>渲染中...</span>
          </div>
          <!-- 错误提示 -->
          <div v-else-if="renderError" class="chart-error">
            <span>{{ renderError }}</span>
          </div>
          <!-- 图表内容 -->
          <div v-else v-html="svgContent"></div>
        </div>

        <!-- 代码视图 -->
        <div v-show="activeTab === 'code'" class="code-view">
          <pre><code>{{ code }}</code></pre>
        </div>
      </div>

      <!-- 折叠按钮 -->
      <div class="collapse-btn" @click="toggleCollapse">
        <n-icon size="18" :style="{ transform: isCollapsed ? 'rotate(0)' : 'rotate(180deg)' }">
          <ChevronDownOutline />
        </n-icon>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mermaid-chart {
  margin: 16px 0;

  &.fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
  }
}

.fullscreen-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: -1;
}

.chart-card {
  background: #faf8ff;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e8e4f0;

  &.fullscreen-card {
    width: 90vw;
    max-width: 1200px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    background: #fff;
  }
}

.chart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #e8e4f0;
  background: #fff;
}

.tab-group {
  display: flex;
  background: #f5f3f8;
  border-radius: 6px;
  padding: 2px;
}

.tab-btn {
  padding: 6px 16px;
  border: none;
  background: transparent;
  border-radius: 4px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #333;
  }

  &.active {
    background: #fff;
    color: #333;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 4px;
}

.scale-text {
  font-size: 12px;
  color: #666;
  min-width: 40px;
  text-align: center;
}

.tool-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 8px;
  border: none;
  background: transparent;
  border-radius: 4px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #f0f0f0;
    color: #333;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.text-btn {
    font-size: 13px;
  }
}

.divider {
  width: 1px;
  height: 16px;
  background: #e0e0e0;
  margin: 0 8px;
}

.chart-content {
  padding: 24px;
  min-height: 200px;
  max-height: 500px;
  overflow: auto;
  transition: all 0.3s;

  &.collapsed {
    max-height: 0;
    min-height: 0;
    padding: 0 24px;
    overflow: hidden;
  }

  .fullscreen-card & {
    flex: 1;
    max-height: none;
  }
}

.chart-view {
  display: flex;
  justify-content: center;
  align-items: center;
  transform-origin: center center;
  transition: transform 0.2s;
  min-height: 100px;

  :deep(svg) {
    max-width: 100%;
    height: auto;
  }
}

.chart-loading,
.chart-error {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px;
  color: #666;
  font-size: 14px;
}

.chart-error {
  color: #f56c6c;
}

.code-view {
  pre {
    margin: 0;
    padding: 16px;
    background: #1e1e1e;
    border-radius: 8px;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', 'Monaco', monospace;
      font-size: 13px;
      line-height: 1.6;
      color: #d4d4d4;
    }
  }
}

.collapse-btn {
  display: flex;
  justify-content: center;
  padding: 8px;
  cursor: pointer;
  border-top: 1px solid #e8e4f0;
  background: #fff;
  transition: all 0.2s;

  &:hover {
    background: #f5f5f5;
  }

  .n-icon {
    transition: transform 0.3s;
  }
}
</style>
