import type { RouteRecordRaw } from 'vue-router'
import type { Component } from 'vue'

// 扩展路由元信息类型
export interface RouteMeta {
  title: string
  icon?: Component
  hidden?: boolean // 是否在菜单中隐藏
  hideChildren?: boolean // 是否隐藏子菜单
}

// 扩展路由配置类型
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta' | 'children'> {
  meta: RouteMeta
  children?: AppRouteRecordRaw[]
}

// 导入图标
import { IconHome, IconApps, IconSettings } from '@arco-design/web-vue/es/icon'

// 路由配置（同时用于生成菜单）
export const routes: AppRouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layout/BaseLayout.vue'),
    redirect: '/home',
    meta: {
      title: '根路由',
      hidden: true // 在菜单中隐藏
    },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          icon: IconHome
        }
      },
      {
        path: 'module',
        name: 'Module',
        redirect: '/module/stick',
        meta: {
          title: '插件演示',
          icon: IconApps
        },
        children: [
          {
            path: 'stick',
            name: 'ModuleStick',
            component: () => import('@/views/module/stick-to-bottom/index.vue'),
            meta: {
              title: 'stick-to-bottom 演示'
            }
          },
          {
            path: 'markstream',
            name: 'ModuleMarkstream',
            component: () => import('@/views/module/markstream/index.vue'),
            meta: {
              title: 'Markstream 演示'
            }
          }
        ]
      },
      {
        path: 'element',
        name: 'ModuleElement',
        redirect: '/element/chain-of-thought',
        meta: {
          title: 'AI Element Vue',
          icon: IconApps
        },
        children: [
          {
            path: 'chain-of-thought',
            name: 'ElementChainOfThought',
            component: () => import('@/views/element/chain-of-thought/index.vue'),
            meta: {
              title: 'Chain of Thought 演示'
            }
          },
          {
            path: 'Checkpoint',
            name: 'ElementCheckpoint',
            component: () => import('@/views/element/Checkpoint/index.vue'),
            meta: {
              title: 'Checkpoint 演示'
            }
          },
          {
            path: 'Confirmation',
            name: 'ElementConfirmation',
            component: () => import('@/views/element/Confirmation/index.vue'),
            meta: {
              title: 'Confirmation 演示'
            }
          },
          {
            path: 'Context',
            name: 'ElementContext',
            component: () => import('@/views/element/Context/index.vue'),
            meta: {
              title: 'Context 演示'
            }
          },
          {
            path: 'InlineCitation',
            name: 'ElementInlineCitation',
            component: () => import('@/views/element/inline-citation/index.vue'),
            meta: {
              title: 'InlineCitation 演示'
            }
          },
          {
            path: 'Message',
            name: 'ElementMessage',
            component: () => import('@/views/element/Message/index.vue'),
            meta: {
              title: 'Message 演示'
            }
          },
          {
            path: 'model-selector',
            name: 'ElementModelSelector',
            component: () => import('@/views/element/model-selector/index.vue'),
            meta: {
              title: 'ModelSelector 演示'
            }
          },
          {
            path: 'Plan',
            name: 'ElementPlan',
            component: () => import('@/views/element/Plan/index.vue'),
            meta: {
              title: 'Plan 演示'
            }
          },
          {
            path: 'prompt-input',
            name: 'ElementPromptInput',
            component: () => import('@/views/element/prompt-input/index.vue'),
            meta: {
              title: 'PromptInput 演示'
            }
          },
          {
            path: 'Queue',
            name: 'ElementQueue',
            component: () => import('@/views/element/Queue/index.vue'),
            meta: {
              title: 'Queue 演示'
            }
          },
          {
            path: 'Reasoning',
            name: 'ElementReasoning',
            component: () => import('@/views/element/Reasoning/index.vue'),
            meta: {
              title: 'Reasoning 演示'
            }
          },
          {
            path: 'Shimmer',
            name: 'ElementShimmer',
            component: () => import('@/views/element/Shimmer/index.vue'),
            meta: {
              title: 'Shimmer 演示'
            }
          },
          {
            path: 'Suggestion',
            name: 'ElementSuggestion',
            component: () => import('@/views/element/Suggestion/index.vue'),
            meta: {
              title: 'Suggestion 演示'
            }
          },
          {
            path: 'Task',
            name: 'ElementTask',
            component: () => import('@/views/element/Task/index.vue'),
            meta: {
              title: 'Task 演示'
            }
          },
          {
            path: 'Tool',
            name: 'ElementTool',
            component: () => import('@/views/element/Tool/index.vue'),
            meta: {
              title: 'Tool 演示'
            }
          },
          {
            path: 'Chatbot',
            name: 'ElementChatbot',
            component: () => import('@/views/element/Chatbot/index.vue'),
            meta: {
              title: 'Chatbot 演示'
            }
          },
        ]
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/views/settings/index.vue'),
        meta: {
          title: '系统设置',
          icon: IconSettings
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/home',
    meta: {
      title: '404',
      hidden: true
    }
  }
]
