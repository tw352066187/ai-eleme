<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import MarkdownRender, { setCustomComponents } from 'markstream-vue'
// import 'markstream-vue/index.css'
import { useStreaming } from './useStreaming'
import { EXAMPLES } from './examples'
import { guideContent } from './guideContent'
import CustomCodeBlock from './CustomCodeBlock.vue'
import CustomMermaid from './CustomMermaid.vue'

// 自定义 Monaco 主题 - 浅色
const lightTheme = {
  name: 'custom-light',
  base: 'vs',
  inherit: true,
  colors: {
    'editor.background': '#f8f9fa',
    'editor.foreground': '#24292e'
  },
  rules: []
}

// 自定义 Monaco 主题 - 深色（稍浅）
const darkTheme = {
  name: 'custom-dark',
  base: 'vs-dark',
  inherit: true,
  colors: {
    'editor.background': '#2d333b',
    'editor.foreground': '#adbac7'
  },
  rules: []
}

// 当前激活的 Tab
const activeTab = ref('demo')

// 注册自定义代码块组件
onMounted(() => {
  setCustomComponents('markstream-demo', {
    code_block: CustomCodeBlock,
    mermaid: CustomMermaid
  })
})

// 使用流式渲染 composable
const {
  content,
  isStreaming,
  speed,
  progress,
  isComplete,
  startStreaming,
  resetStreaming,
  setSpeed,
  showComplete
} = useStreaming()

// 当前选中的示例索引
const selectedExample = ref(0)

// 暗色模式
const isDark = ref(false)

// Monaco 配置
const monacoOptions = computed(() => ({
  themes: [lightTheme, darkTheme],
  theme: isDark.value ? 'custom-dark' : 'custom-light'
}))

// 错误状态
const errorState = ref<{ hasError: boolean; message: string }>({
  hasError: false,
  message: ''
})

// 当前示例
const currentExample = computed(() => {
  const example = EXAMPLES[selectedExample.value]
  return example !== undefined ? example : EXAMPLES[0]!
})

// 示例选项列表
const exampleOptions = EXAMPLES.map((item, index) => ({
  value: index,
  label: item.name
}))

// 速度选项
const speedOptions = [
  { value: 10, label: '快速 (10ms)' },
  { value: 30, label: '正常 (30ms)' },
  { value: 50, label: '慢速 (50ms)' },
  { value: 100, label: '超慢 (100ms)' }
]

// 清除错误
const clearError = () => {
  errorState.value = { hasError: false, message: '' }
}

// 开始演示
const handleStart = () => {
  try {
    clearError()
    startStreaming(currentExample.value.content)
  } catch (error) {
    errorState.value = {
      hasError: true,
      message: error instanceof Error ? error.message : '渲染过程中发生未知错误'
    }
  }
}

// 重置演示
const handleReset = () => {
  clearError()
  resetStreaming()
}

// 立即完成
const handleComplete = () => {
  showComplete()
}

// 切换示例时重置
watch(selectedExample, () => {
  clearError()
  resetStreaming()
})

// 速度变化时更新
const handleSpeedChange = (value: number) => {
  setSpeed(value)
}
</script>

<template>
  <div class="container-page">
    <!-- Tab 切换 -->
    <a-tabs v-model:active-key="activeTab" class="page-tabs">
      <!-- 演示 Tab -->
      <a-tab-pane key="demo" title="流式演示">
        <div class="page-container">
          <!-- 左侧控制面板 -->
          <div class="control-panel">
            <a-card title="控制面板" :bordered="false">
              <!-- 示例选择 -->
              <div class="control-item">
                <div class="control-label">选择示例</div>
                <a-select
                  v-model="selectedExample"
                  :options="exampleOptions"
                  placeholder="选择演示示例"
                  style="width: 100%"
                />
                <div class="control-desc">{{ currentExample.description }}</div>
              </div>

              <!-- 速度控制 -->
              <div class="control-item">
                <div class="control-label">渲染速度</div>
                <a-select
                  :model-value="speed"
                  :options="speedOptions"
                  placeholder="选择渲染速度"
                  style="width: 100%"
                  @change="handleSpeedChange"
                />
              </div>

              <!-- 进度显示 -->
              <div class="control-item" v-if="isStreaming || isComplete">
                <div class="control-label">渲染进度</div>
                <a-progress :percent="progress" />
              </div>

              <!-- 操作按钮 -->
              <div class="control-actions">
                <a-button
                  type="primary"
                  :loading="isStreaming"
                  :disabled="isStreaming"
                  @click="handleStart"
                >
                  {{ isStreaming ? '渲染中...' : '开始演示' }}
                </a-button>
                <a-button v-if="isStreaming" @click="handleComplete"> 立即完成 </a-button>
                <a-button :disabled="!content && !isStreaming" @click="handleReset">
                  重置
                </a-button>
              </div>

              <!-- 暗色模式切换 -->
              <div class="control-item">
                <div class="control-label">暗色模式</div>
                <a-switch v-model="isDark" />
              </div>
            </a-card>
          </div>

          <!-- 右侧渲染预览 -->
          <div class="render-preview">
            <a-card title="渲染预览" :bordered="false">
              <template #extra>
                <a-tag v-if="isStreaming" color="blue">
                  <template #icon><icon-loading /></template>
                  渲染中
                </a-tag>
                <a-tag v-else-if="isComplete" color="green">已完成</a-tag>
                <a-tag v-else color="gray">等待开始</a-tag>
              </template>

              <div class="preview-container markstream-vue" :class="{ dark: isDark }">
                <a-alert
                  v-if="errorState.hasError"
                  type="error"
                  :title="errorState.message"
                  closable
                  @close="clearError"
                  style="margin-bottom: 16px"
                />

                <MarkdownRender
                  v-if="content"
                  custom-id="markstream-demo"
                  :content="content"
                  :is-dark="isDark"
                  :code-block-monaco-options="monacoOptions"
                />
                <div v-else class="empty-state">
                  <icon-file-markdown :size="48" />
                  <p>点击"开始演示"查看流式渲染效果</p>
                </div>
              </div>
            </a-card>
          </div>
        </div>
      </a-tab-pane>

      <!-- 使用说明 Tab -->
      <a-tab-pane key="guide" title="使用说明">
        <a-card :bordered="false">
          <div class="guide-container markstream-vue">
            <MarkdownRender :content="guideContent" />
          </div>
        </a-card>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<style scoped lang="scss">
.container-page {
  padding: 16px;
  min-height: 100%;
  background: var(--color-bg-1);

  .page-header {
    margin-bottom: 16px;

    h2 {
      margin: 0 0 8px;
      font-size: 20px;
      font-weight: 600;
      color: var(--color-text-1);
    }

    p {
      margin: 0;
      font-size: 14px;
      color: var(--color-text-3);
    }
  }

  .page-tabs {
    :deep(.arco-tabs-content) {
      padding-top: 16px;
    }
  }

  .page-container {
    display: flex;
    gap: 16px;
    max-width: 1400px;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .control-panel {
    width: 320px;
    flex-shrink: 0;

    @media (max-width: 768px) {
      width: 100%;
    }

    .control-item {
      margin-bottom: 16px;

      .control-label {
        font-size: 14px;
        color: var(--color-text-2);
        margin-bottom: 8px;
      }

      .control-desc {
        font-size: 12px;
        color: var(--color-text-3);
        margin-top: 4px;
      }
    }

    .control-actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 24px;
      padding-top: 16px;
      border-top: 1px solid var(--color-border);
    }
  }

  .render-preview {
    flex: 1;
    min-width: 0;

    .preview-container {
      min-height: 400px;
      max-height: calc(100vh - 280px);
      overflow-y: auto;
      padding: 16px;
      background: var(--color-fill-1);
      border-radius: 8px;
      transition: background-color 0.3s;

      &.dark {
        background: #1e1e1e;
      }

      // 表格样式优化
      :deep(table) {
        width: max-content;
        min-width: 100%;
        border-collapse: collapse;
        margin: 16px 0;
        font-size: 14px;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        .markstream-vue .whitespace-pre-wrap {
          white-space: nowrap;
        }
        th,
        td {
          padding: 12px 16px;
          text-align: left;
          border-bottom: 1px solid var(--color-border);
          white-space: nowrap;
        }

        th {
          background: var(--color-fill-2);
          font-weight: 600;
          color: var(--color-text-1);
        }

        td {
          background: var(--color-bg-1);
          color: var(--color-text-2);
        }

        tr:hover td {
          background: var(--color-fill-1);
        }

        tr:last-child td {
          border-bottom: none;
        }
      }

      // 表格容器横向滚动
      :deep(div:has(> table)) {
        overflow-x: auto;
        table {
          margin-bottom: 0px;
        }
        &::-webkit-scrollbar {
          height: 6px;
        }

        &::-webkit-scrollbar-thumb {
          background: var(--color-fill-3);
          border-radius: 3px;
        }
      }

      &.dark :deep(table) {
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);

        th {
          background: #2d2d2d;
          color: #e0e0e0;
        }

        td {
          background: #1e1e1e;
          color: #b0b0b0;
          border-color: #3a3a3a;
        }

        tr:hover td {
          background: #2a2a2a;
        }
      }

      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-thumb {
        background: var(--color-fill-3);
        border-radius: 3px;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 300px;
      color: var(--color-text-3);

      p {
        margin-top: 16px;
        font-size: 14px;
      }
    }
  }

  .guide-container {
    max-width: 900px;
    padding: 16px;
    max-height: calc(100vh - 240px);
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--color-fill-3);
      border-radius: 3px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }
  }
}
</style>
