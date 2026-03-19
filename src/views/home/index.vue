<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart, LineChart, BarChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'
import VChart from 'vue-echarts'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import MarkdownIt from 'markdown-it'
import {
  IconUser,
  IconFile,
  IconMessage,
  IconCheckCircle
} from '@arco-design/web-vue/es/icon'

// 注册 ECharts 组件
use([
  CanvasRenderer,
  PieChart,
  LineChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
])

// Markdown 解析器
const md = new MarkdownIt()

// 统计数据
const statistics = ref([
  { title: '用户总数', value: 1280, icon: IconUser, color: '#165DFF', trend: '+12%' },
  { title: '文档数量', value: 356, icon: IconFile, color: '#0FC6C2', trend: '+8%' },
  { title: '消息数量', value: 892, icon: IconMessage, color: '#F7BA1E', trend: '+23%' },
  { title: '完成任务', value: 168, icon: IconCheckCircle, color: '#00B42A', trend: '+15%' }
])

// 富文本内容
const editorContent = ref('<p>欢迎使用富文本编辑器！你可以在这里编辑内容。</p>')

// Markdown 内容
const markdownText = ref(`# Markdown 演示

## 功能特点

- 支持标题
- 支持列表
- 支持**粗体**和*斜体*
- 支持代码块

\`\`\`javascript
const hello = () => {
  console.log('Hello, World!')
}
\`\`\`

> 这是一个引用块
`)

// 解析后的 HTML
const parsedHtml = ref('')

// 饼图配置
const pieOption = ref({
  title: {
    text: '用户来源统计',
    left: 'center',
    textStyle: {
      fontSize: 14
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    top: 'middle'
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 20,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: '搜索引擎' },
        { value: 735, name: '直接访问' },
        { value: 580, name: '邮件营销' },
        { value: 484, name: '联盟广告' },
        { value: 300, name: '视频广告' }
      ]
    }
  ]
})

// 折线图配置
const lineOption = ref({
  title: {
    text: '访问量趋势',
    textStyle: {
      fontSize: 14
    }
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['访问量', '注册量'],
    top: 30
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: 80,
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '访问量',
      type: 'line',
      data: [120, 132, 101, 134, 90, 230, 210],
      smooth: true,
      areaStyle: {
        opacity: 0.3
      }
    },
    {
      name: '注册量',
      type: 'line',
      data: [220, 182, 191, 234, 290, 330, 310],
      smooth: true,
      areaStyle: {
        opacity: 0.3
      }
    }
  ]
})

// 柱状图配置
const barOption = ref({
  title: {
    text: '月度销售额',
    textStyle: {
      fontSize: 14
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: 50,
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '销售额',
      type: 'bar',
      data: [2800, 3200, 2900, 3500, 4200, 3800],
      itemStyle: {
        color: '#165DFF',
        borderRadius: [4, 4, 0, 0]
      }
    }
  ]
})

// 解析 Markdown
const parseMarkdown = () => {
  parsedHtml.value = md.render(markdownText.value)
}

onMounted(() => {
  parseMarkdown()
})
</script>

<template>
  <div class="home-page">
    <!-- 欢迎卡片 -->
    <a-card class="welcome-card">
      <div class="welcome-content">
        <div class="welcome-text">
          <h2>欢迎回来，管理员</h2>
          <p>今天是个好日子，祝您工作顺利！</p>
        </div>
        <img src="@/assets/vue.svg" alt="welcome" class="welcome-img" />
      </div>
    </a-card>

    <!-- 统计卡片 -->
    <a-row :gutter="20" class="statistics-row">
      <a-col :span="6" v-for="item in statistics" :key="item.title">
        <a-card class="stat-card" hoverable>
          <div class="stat-content">
            <div class="stat-info">
              <span class="stat-title">{{ item.title }}</span>
              <div class="stat-bottom">
                <span class="stat-value">{{ item.value }}</span>
                <a-tag :color="item.color" size="small">{{ item.trend }}</a-tag>
              </div>
            </div>
            <div class="stat-icon" :style="{ background: item.color }">
              <component :is="item.icon" />
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <!-- 图表区域 -->
    <a-row :gutter="20" class="charts-row">
      <!-- 饼图 -->
      <a-col :span="8">
        <a-card title="用户来源分析" class="chart-card">
          <v-chart :option="pieOption" style="height: 300px" />
        </a-card>
      </a-col>

      <!-- 折线图 -->
      <a-col :span="16">
        <a-card title="访问趋势" class="chart-card">
          <v-chart :option="lineOption" style="height: 300px" />
        </a-card>
      </a-col>
    </a-row>

    <!-- 柱状图 -->
    <a-row :gutter="20" class="charts-row">
      <a-col :span="24">
        <a-card title="销售数据" class="chart-card">
          <v-chart :option="barOption" style="height: 300px" />
        </a-card>
      </a-col>
    </a-row>

    <!-- Markdown 和富文本 -->
    <a-row :gutter="20" class="editor-row">
      <!-- Markdown 编辑器 -->
      <a-col :span="12">
        <a-card title="Markdown 编辑器">
          <a-textarea
            v-model="markdownText"
            placeholder="输入 Markdown 内容..."
            :auto-size="{ minRows: 10, maxRows: 15 }"
            @input="parseMarkdown"
          />
          <a-divider>预览</a-divider>
          <div class="markdown-preview" v-html="parsedHtml"></div>
        </a-card>
      </a-col>

      <!-- 富文本编辑器 -->
      <a-col :span="12">
        <a-card title="富文本编辑器">
          <QuillEditor
            v-model:content="editorContent"
            content-type="html"
            theme="snow"
            style="height: 300px"
          />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped lang="scss">
.home-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.welcome-card {
  .welcome-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .welcome-text {
    h2 {
      margin: 0 0 8px;
      font-size: 24px;
      color: var(--color-text-1);
    }

    p {
      margin: 0;
      color: var(--color-text-3);
    }
  }

  .welcome-img {
    width: 120px;
    height: 120px;
    opacity: 0.8;
  }
}

.statistics-row {
  .stat-card {
    .stat-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .stat-info {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .stat-title {
      font-size: 14px;
      color: var(--color-text-3);
    }

    .stat-bottom {
      display: flex;
      align-items: baseline;
      gap: 8px;
    }

    .stat-value {
      font-size: 28px;
      font-weight: 600;
      color: var(--color-text-1);
    }

    .stat-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: 8px;
      color: #fff;
      font-size: 24px;
    }
  }
}

.charts-row,
.editor-row {
  .chart-card {
    height: 100%;
  }
}

.markdown-preview {
  padding: 16px;
  background: var(--color-fill-2);
  border-radius: 4px;
  min-height: 200px;

  :deep(h1) {
    font-size: 24px;
    margin: 16px 0 8px;
    color: var(--color-text-1);
  }

  :deep(h2) {
    font-size: 20px;
    margin: 14px 0 7px;
    color: var(--color-text-1);
  }

  :deep(p) {
    margin: 8px 0;
    line-height: 1.6;
    color: var(--color-text-2);
  }

  :deep(ul),
  :deep(ol) {
    margin: 8px 0;
    padding-left: 24px;
    color: var(--color-text-2);
  }

  :deep(code) {
    padding: 2px 6px;
    background: rgba(0, 0, 0, 0.06);
    border-radius: 3px;
    font-family: 'Monaco', 'Menlo', monospace;
    font-size: 13px;
  }

  :deep(pre) {
    padding: 12px;
    background: #282c34;
    color: #abb2bf;
    border-radius: 4px;
    overflow-x: auto;
    margin: 12px 0;

    code {
      background: none;
      padding: 0;
      color: inherit;
    }
  }

  :deep(blockquote) {
    margin: 12px 0;
    padding: 8px 16px;
    border-left: 4px solid rgb(var(--primary-6));
    background: var(--color-fill-1);
    color: var(--color-text-2);
  }

  :deep(strong) {
    font-weight: 600;
    color: var(--color-text-1);
  }

  :deep(em) {
    font-style: italic;
  }
}
</style>
