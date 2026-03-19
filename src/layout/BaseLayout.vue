<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  IconMenuFold,
  IconMenuUnfold,
  IconUser,
  IconPoweroff,
  IconNotification
} from '@arco-design/web-vue/es/icon'
import { routes } from '@/router/routes'
import { generateMenuFromRoutes } from '@/utils/menu'

const router = useRouter()
const route = useRoute()

// 菜单折叠状态
const collapsed = ref(false)

// 当前选中的菜单
const selectedKeys = computed(() => [route.path])

// 从路由配置自动生成菜单数据
const menuList = computed(() => {
  // 获取根路由的子路由（即布局内的路由）
  const layoutRoute = routes.find(r => r.path === '/')
  if (layoutRoute && layoutRoute.children) {
    return generateMenuFromRoutes(layoutRoute.children, '')
  }
  return []
})

// 菜单点击
const handleMenuClick = (key: string) => {
  router.push(key)
}

// 切换折叠
const toggleCollapse = () => {
  collapsed.value = !collapsed.value
}
</script>

<template>
  <a-layout class="layout">
    <!-- 左侧菜单 -->
    <a-layout-sider
      :collapsed="collapsed"
      :width="220"
      :collapsed-width="48"
      collapsible
      hide-trigger
      class="layout-sider"
    >
      <!-- Logo -->
      <div class="logo">
        <img src="@/assets/vue.svg" alt="logo" class="logo-img" />
        <span v-if="!collapsed" class="logo-text">Arco Admin</span>
      </div>

      <!-- 菜单 -->
      <a-menu
        :selected-keys="selectedKeys"
        :collapsed="collapsed"
        :auto-open-selected="true"
        @menu-item-click="handleMenuClick"
      >
        <template v-for="(item, index) in menuList" :key="`menu-${index}`">
          <!-- 有子菜单 -->
          <a-sub-menu v-if="item.children" :key="item.key">
            <template #icon>
              <component :is="item.icon" />
            </template>
            <template #title>{{ item.title }}</template>
            <a-menu-item v-for="child in item.children" :key="child.key">
              {{ child.title }}
            </a-menu-item>
          </a-sub-menu>
          <!-- 无子菜单 -->
          <a-menu-item v-else :key="item.key">
            <template #icon>
              <component :is="item.icon" />
            </template>
            {{ item.title }}
          </a-menu-item>
        </template>
      </a-menu>
    </a-layout-sider>

    <!-- 右侧内容区 -->
    <a-layout class="layout-content">
      <!-- 顶部头部 -->
      <a-layout-header class="layout-header">
        <div class="header-left">
          <!-- 折叠按钮 -->
          <a-button type="text" @click="toggleCollapse">
            <template #icon>
              <IconMenuFold v-if="!collapsed" />
              <IconMenuUnfold v-else />
            </template>
          </a-button>
          <!-- 面包屑 -->
          <a-breadcrumb class="breadcrumb">
            <a-breadcrumb-item>
              <IconHome />
            </a-breadcrumb-item>
            <a-breadcrumb-item>{{ route.meta.title || '首页' }}</a-breadcrumb-item>
          </a-breadcrumb>
        </div>

        <div class="header-right">
          <!-- 通知 -->
          <a-badge :count="5" dot>
            <a-button type="text">
              <template #icon>
                <IconNotification />
              </template>
            </a-button>
          </a-badge>

          <!-- 用户信息 -->
          <a-dropdown trigger="click">
            <a-avatar :size="32" class="user-avatar">
              <IconUser />
            </a-avatar>
            <template #content>
              <a-doption>
                <template #icon><IconUser /></template>
                个人中心
              </a-doption>
              <a-doption>
                <template #icon><IconSettings /></template>
                用户设置
              </a-doption>
              <a-dgroup title="更多">
                <a-doption>
                  <template #icon><IconPoweroff /></template>
                  退出登录
                </a-doption>
              </a-dgroup>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>

      <!-- 内容区域 -->
      <a-layout-content class="layout-main">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped lang="scss">
.layout {
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

// 左侧菜单
.layout-sider {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  background: var(--color-menu-light-bg);
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
  transition: width 0.2s;

  :deep(.arco-layout-sider-children) {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }

  :deep(.arco-menu) {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.1);
      border-radius: 3px;
    }
  }
}

// Logo
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  padding: 0 16px;
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;

  .logo-img {
    width: 28px;
    height: 28px;
    flex-shrink: 0;
  }

  .logo-text {
    margin-left: 10px;
    font-size: 18px;
    font-weight: 600;
    color: var(--color-text-1);
    white-space: nowrap;
    overflow: hidden;
  }
}

// 右侧内容区
.layout-content {
  margin-left: 220px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.2s;
  overflow: hidden;
}

// 当菜单折叠时
:deep(.arco-layout-sider-collapsed) ~ .layout-content {
  margin-left: 48px;
}

// 顶部头部
.layout-header {
  position: sticky;
  top: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 20px;
  background: #fff;
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.breadcrumb {
  margin-left: 8px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-avatar {
  cursor: pointer;
  background: rgb(var(--primary-6));
}

// 内容区域
.layout-main {
  flex: 1;
  padding: 20px;
  background: var(--color-fill-2);
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }
}
</style>
