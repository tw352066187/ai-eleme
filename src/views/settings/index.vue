<script setup lang="ts">
import { ref } from 'vue'

// 系统设置
const settings = ref({
  siteName: 'Arco Admin',
  siteDesc: '基于 ArcoVue 的后台管理系统',
  theme: 'light',
  language: 'zh-CN',
  enableNotification: true,
  enableSound: false
})

// 保存设置
const handleSave = () => {
  console.log('保存设置:', settings.value)
  // 这里可以调用 API 保存设置
}

// 重置设置
const handleReset = () => {
  settings.value = {
    siteName: 'Arco Admin',
    siteDesc: '基于 ArcoVue 的后台管理系统',
    theme: 'light',
    language: 'zh-CN',
    enableNotification: true,
    enableSound: false
  }
}
</script>

<template>
  <div class="settings-page">
    <a-card title="系统设置">
      <a-form :model="settings" layout="vertical">
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item label="站点名称" field="siteName">
              <a-input v-model="settings.siteName" placeholder="请输入站点名称" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="站点描述" field="siteDesc">
              <a-input v-model="settings.siteDesc" placeholder="请输入站点描述" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item label="主题模式" field="theme">
              <a-select v-model="settings.theme" placeholder="请选择主题">
                <a-option value="light">浅色</a-option>
                <a-option value="dark">深色</a-option>
                <a-option value="auto">跟随系统</a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="语言" field="language">
              <a-select v-model="settings.language" placeholder="请选择语言">
                <a-option value="zh-CN">简体中文</a-option>
                <a-option value="en-US">English</a-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>

        <a-divider />

        <a-form-item label="通知设置">
          <a-space direction="vertical">
            <a-switch v-model="settings.enableNotification">
              <template #checked>开启通知</template>
              <template #unchecked>关闭通知</template>
            </a-switch>
            <a-switch v-model="settings.enableSound">
              <template #checked>开启提示音</template>
              <template #unchecked>关闭提示音</template>
            </a-switch>
          </a-space>
        </a-form-item>

        <a-form-item>
          <a-space>
            <a-button type="primary" @click="handleSave">保存设置</a-button>
            <a-button @click="handleReset">重置</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<style scoped lang="scss">
.settings-page {
  max-width: 1200px;
}
</style>
