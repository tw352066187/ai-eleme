<template>
  <div class="case-header">
    <div class="case-header__left">
      <a-icon class="case-header__icon" />
      <h1 class="case-header__title">{{ caseId }}</h1>
      <div class="case-header__divider" />
      <div class="case-header__tags">
        <a-tag
          v-for="tag in levelTags"
          :key="tag.id"
          color="gray"
          size="small"
        >
          {{ tag.text }}
        </a-tag>
      </div>
      <div class="case-header__divider" />
      <span class="case-header__label">警情标签：</span>
      <div class="case-header__case-tags">
        <a-tag
          v-for="tag in displayTags"
          :key="tag.id"
          :color="getTagColor(tag.type)"
          size="small"
        >
          {{ tag.text }}
        </a-tag>
        <a-tag v-if="hasMoreTags" color="blue" size="small">更多</a-tag>
      </div>
    </div>
    <div class="case-header__right">
      <div class="case-header__time-limit">
        <a-icon class="case-header__time-icon" />
        <span class="case-header__time-label">完成时限</span>
        <span class="case-header__time-value">{{ timeLimit }}</span>
      </div>
      <a-dropdown trigger="click" @select="handleAction">
        <a-button type="outline" size="small">
          操作
          <template #icon>
            <icon-down />
          </template>
        </a-button>
        <template #content>
          <a-doption
            v-for="action in actions"
            :key="action.id"
            :value="action.id"
            :disabled="!action.enabled"
          >
            {{ action.name }}
          </a-doption>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { IconDown } from '@arco-design/web-vue/es/icon'

// Props
const props = defineProps({
  caseId: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    default: () => []
  },
  timeLimit: {
    type: String,
    required: true
  },
  actions: {
    type: Array,
    default: () => []
  }
})

// Emits
const emit = defineEmits(['action'])

// 计算属性
const levelTags = computed(() => {
  return [
    { id: 'level', text: '省级' },
    { id: 'category', text: 'A类攻坚侦办类' }
  ]
})

const displayTags = computed(() => {
  return props.tags.slice(0, 4) // 最多显示4个标签
})

const hasMoreTags = computed(() => {
  return props.tags.length > 4
})

// 方法
const getTagColor = (type) => {
  const colorMap = {
    location: 'blue',
    level: 'gray',
    category: 'gray',
    suspect: 'magenta',
    victim: 'orange',
    record: 'cyan'
  }
  return colorMap[type] || 'blue'
}

const handleAction = (actionId) => {
  emit('action', actionId)
}
</script>

<style lang="scss" scoped>
.case-header {
  background-color: white;
  border-bottom: 1px solid var(--border-color, #dfe1e5);
  padding: var(--spacing-md, 16px);
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__left {
    display: flex;
    align-items: center;
    gap: var(--spacing-md, 16px);
    flex-wrap: wrap;
  }

  &__icon {
    width: 20px;
    height: 20px;
    color: var(--text-primary, #242933);
  }

  &__title {
    font-size: var(--font-size-lg, 18px);
    font-weight: 500;
    color: var(--text-primary, #242933);
    margin: 0;
    line-height: 28px;
  }

  &__divider {
    width: 1px;
    height: 16px;
    background-color: var(--border-color, #dfe1e5);
  }

  &__tags {
    display: flex;
    gap: var(--spacing-xs, 4px);
  }

  &__label {
    font-size: var(--font-size-sm, 14px);
    color: var(--text-secondary, #8d95a6);
  }

  &__case-tags {
    display: flex;
    gap: var(--spacing-xs, 4px);
    flex-wrap: wrap;
  }

  &__right {
    display: flex;
    align-items: center;
    gap: var(--spacing-md, 16px);
  }

  &__time-limit {
    background-color: #ff3c3c;
    color: white;
    padding: var(--spacing-xs, 4px) var(--spacing-sm, 8px);
    border-radius: 2px;
    display: flex;
    align-items: center;
    gap: var(--spacing-xs, 4px);
    font-size: var(--font-size-sm, 14px);

    &-label {
      font-weight: 600;
    }

    &-value {
      font-weight: 500;
    }
  }

  // 响应式设计
  @media (max-width: 768px) {
    flex-direction: column;
    gap: var(--spacing-md, 16px);
    align-items: flex-start;

    &__left {
      flex-wrap: wrap;
    }
  }
}
</style>
