<template>
  <div class="info-section">
    <div class="info-section__title">
      {{ title }}
      <a-button
        v-if="showMore && isTextContent"
        type="text"
        size="mini"
        @click="toggleExpanded"
      >
        查看更多
      </a-button>
    </div>
    <div class="info-section__content">
      <!-- 基础信息类型 -->
      <div v-if="type === 'basic'" class="info-section__basic">
        <div class="info-section__info-grid">
          <div
            v-for="item in firstRowItems"
            :key="item.label"
            class="info-section__info-item"
          >
            <div class="info-section__info-label">{{ item.label }}</div>
            <div class="info-section__info-value">{{ item.value }}</div>
          </div>
        </div>
        <div v-if="secondRowItems.length > 0" class="info-section__info-grid info-section__info-grid--second">
          <div
            v-for="item in secondRowItems"
            :key="item.label"
            class="info-section__info-item"
          >
            <div class="info-section__info-label">{{ item.label }}</div>
            <div class="info-section__info-value">{{ item.value }}</div>
          </div>
        </div>
      </div>

      <!-- 文本内容类型 -->
      <div
        v-else-if="isTextContent"
        class="info-section__text-content"
        :class="{ 'expanded': expanded }"
      >
        {{ content }}
      </div>

      <!-- 侦办进展类型 -->
      <div v-else-if="type === 'investigation'" class="info-section__investigation">
        <!-- 进度指示器 -->
        <div class="info-section__progress-indicator">
          <div class="info-section__progress-item">
            <div class="info-section__progress-icon info-section__progress-icon--completed"></div>
            <span class="info-section__progress-label">已完成</span>
          </div>
          <div class="info-section__progress-line"></div>
          <div class="info-section__progress-item">
            <div class="info-section__progress-icon info-section__progress-icon--pending"></div>
            <span class="info-section__progress-label">未完成</span>
          </div>
          <div class="info-section__progress-line"></div>
          <div class="info-section__progress-item">
            <div class="info-section__progress-icon info-section__progress-icon--waiting"></div>
            <span class="info-section__progress-label">等待中</span>
          </div>
        </div>

        <!-- 状态卡片 -->
        <div class="info-section__stage-cards">
          <div
            v-for="stage in progressStages"
            :key="stage.id"
            class="info-section__stage-card"
            :class="`info-section__stage-card--${stage.status}`"
          >
            <div class="info-section__stage-icon"></div>
            <span class="info-section__stage-name">{{ stage.name }}</span>
            <span class="info-section__stage-count">{{ stage.count.completed }}/{{ stage.count.total }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  content: {
    type: [String, Object, Array],
    default: ''
  },
  type: {
    type: String,
    default: 'text',
    validator: (value) => ['basic', 'text', 'investigation'].includes(value)
  },
  showMore: {
    type: Boolean,
    default: false
  }
})

// 响应式数据
const expanded = ref(false)

// 计算属性
const isTextContent = computed(() => {
  return props.type === 'text' && typeof props.content === 'string'
})

const firstRowItems = computed(() => {
  if (props.type !== 'basic' || !Array.isArray(props.content)) return []
  return props.content.slice(0, 4)
})

const secondRowItems = computed(() => {
  if (props.type !== 'basic' || !Array.isArray(props.content)) return []
  return props.content.slice(4, 8)
})

const progressStages = computed(() => {
  if (props.type !== 'investigation' || !Array.isArray(props.content)) return []
  return props.content
})

// 方法
const toggleExpanded = () => {
  expanded.value = !expanded.value
}
</script>

<style lang="scss" scoped>
.info-section {
  border-right: 1px solid var(--border-color, #dfe1e5);
  padding: var(--spacing-md, 16px);
  position: relative;

  &:last-child {
    border-right: none;
  }

  &__title {
    font-size: var(--font-size-sm, 14px);
    font-weight: 500;
    color: var(--text-primary, #242933);
    margin-bottom: var(--spacing-md, 16px);
    position: relative;
    padding-left: var(--spacing-sm, 8px);
    display: flex;
    justify-content: space-between;
    align-items: center;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 2px;
      height: 12px;
      background-color: var(--primary-color, #165dff);
    }
  }

  &__content {
    font-size: var(--font-size-sm, 14px);
    color: var(--text-primary, #242933);
    line-height: 1.6;
  }

  &__basic {
    // 基础信息样式
  }

  &__info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-lg, 24px);
    margin-bottom: var(--spacing-md, 16px);

    &--second {
      margin-bottom: 0;
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: var(--spacing-md, 16px);
    }
  }

  &__info-item {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__info-label {
    font-size: var(--font-size-sm, 14px);
    color: var(--text-secondary, #8d95a6);
    line-height: 22px;
  }

  &__info-value {
    font-size: var(--font-size-sm, 14px);
    color: var(--text-primary, #242933);
    line-height: 22px;
    font-weight: 400;
  }

  &__text-content {
    font-size: var(--font-size-sm, 14px);
    color: var(--text-primary, #242933);
    line-height: 22px;
    max-height: 115px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;

    &.expanded {
      max-height: none;
      -webkit-line-clamp: unset;
    }
  }

  &__investigation {
    // 侦办进展样式
  }

  &__progress-indicator {
    display: flex;
    align-items: center;
    margin-bottom: var(--spacing-md, 16px);
    font-size: 12px;
    color: var(--text-secondary, #424e66);
  }

  &__progress-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  &__progress-icon {
    width: 12px;
    height: 12px;
    border-radius: 50%;

    &--completed {
      background-color: #1cc57e;
    }

    &--pending {
      background-color: #f77234;
    }

    &--waiting {
      background-color: #faad14;
    }
  }

  &__progress-line {
    width: 10px;
    height: 1px;
    background-color: var(--border-color, #dfe1e5);
    margin: 0 6px;
  }

  &__stage-cards {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm, 8px);
  }

  &__stage-card {
    background-color: white;
    border: 1px solid;
    border-radius: 4px;
    padding: var(--spacing-xs, 4px) var(--spacing-sm, 8px);
    display: flex;
    align-items: center;
    gap: var(--spacing-sm, 8px);
    font-size: var(--font-size-sm, 14px);
    height: 28px;

    &--completed {
      border-color: #1cc57e;
      color: var(--text-primary, #242933);
    }

    &--in-progress {
      border-color: #f77234;
      color: var(--text-primary, #242933);
    }

    &--pending {
      border-color: var(--text-disabled, #b6b9bf);
      color: var(--text-disabled, #b6b9bf);
    }
  }

  &__stage-icon {
    width: 16px;
    height: 16px;
    border-radius: 2px;
    background-color: currentColor;
  }

  &__stage-name {
    flex: 1;
    font-weight: 400;
  }

  &__stage-count {
    font-size: var(--font-size-sm, 14px);
    color: var(--text-secondary, #8d95a6);
  }
}
</style>
