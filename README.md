# Arco Admin - 后台管理系统

基于 Vue 3 + TypeScript + Vite + ArcoVue 的现代化后台管理系统。

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - JavaScript 的超集
- **Vite** - 下一代前端构建工具
- **ArcoVue** - 字节跳动出品的企业级 UI 组件库
- **Vue Router** - 官方路由管理器
- **Pinia** - 状态管理
- **Axios** - HTTP 客户端
- **Sass** - CSS 预处理器

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发环境

```bash
pnpm dev
```

访问地址：http://localhost:5173/

### 构建生产版本

```bash
pnpm build
```

### 运行测试

```bash
pnpm test
```

## 项目结构

```
src/
├── layout/
│   └── BaseLayout.vue          # 主布局组件（固定头部+侧边栏）
├── views/                      # 页面组件
│   ├── home/
│   │   └── index.vue           # 首页
│   ├── module/
│   │   ├── ai/
│   │   │   └── index.vue       # AI 助手
│   │   └── markstream/
│   │       └── index.vue       # Markstream 演示
│   └── settings/
│       └── index.vue           # 系统设置
├── router/
│   ├── routes.ts               # 路由配置（核心）
│   └── index.ts                # 路由实例
├── utils/
│   └── menu.ts                 # 菜单生成工具
├── store/
│   └── index.ts                # Pinia 状态管理
├── api/
│   └── request.ts              # API 请求封装
├── components/                 # 公共组件
├── assets/                     # 静态资源
├── App.vue                     # 根组件
└── main.ts                     # 入口文件
```

## 核心特性

### 1. 固定布局

- ✅ 顶部头部固定，包含折叠按钮、面包屑、通知和用户信息
- ✅ 左侧菜单固定，支持折叠/展开
- ✅ 内容区域独立滚动
- ✅ 响应式设计，平滑过渡动画

### 2. 统一路由和菜单配置

**核心优势**：只需在一个地方配置路由，菜单自动生成！

#### 配置文件

- **`src/router/routes.ts`** - 唯一的配置入口

#### 如何添加新页面

1. 创建页面组件（遵循规则：`views/模块名/index.vue`）
2. 在 `src/router/routes.ts` 中添加路由配置
3. 菜单自动生成 ✨

#### 示例：添加一级菜单

```typescript
{
  path: 'dashboard',
  name: 'Dashboard',
  component: () => import('@/views/dashboard/index.vue'),
  meta: {
    title: '仪表盘',
    icon: IconDashboard
  }
}
```

#### 示例：添加带子菜单的路由

```typescript
{
  path: 'system',
  name: 'System',
  redirect: '/system/user',
  meta: {
    title: '系统管理',
    icon: IconSettings
  },
  children: [
    {
      path: 'user',
      name: 'SystemUser',
      component: () => import('@/views/system/user/index.vue'),
      meta: {
        title: '用户管理'
      }
    },
    {
      path: 'role',
      name: 'SystemRole',
      component: () => import('@/views/system/role/index.vue'),
      meta: {
        title: '角色管理'
      }
    }
  ]
}
```

#### 示例：隐藏菜单项

```typescript
{
  path: 'detail/:id',
  name: 'Detail',
  component: () => import('@/views/detail/index.vue'),
  meta: {
    title: '详情页',
    hidden: true  // 不在菜单中显示
  }
}
```

#### 路由元信息配置项

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | string | 是 | 菜单标题 |
| icon | Component | 否 | 菜单图标（一级菜单建议添加） |
| hidden | boolean | 否 | 是否在菜单中隐藏 |
| hideChildren | boolean | 否 | 是否隐藏子菜单 |

#### 可用图标

从 `@arco-design/web-vue/es/icon` 导入：

```typescript
import {
  IconHome,        // 首页
  IconApps,        // 应用
  IconSettings,    // 设置
  IconUser,        // 用户
  IconFile,        // 文件
  IconDashboard,   // 仪表盘
  IconList,        // 列表
  IconFolder,      // 文件夹
  // 更多图标请查看 ArcoDesign 文档
} from '@arco-design/web-vue/es/icon'
```

### 3. 页面创建规则

所有页面必须遵循统一的目录结构：

```
views/模块名/index.vue
```

示例：
- `views/home/index.vue` - 首页
- `views/module/ai/index.vue` - AI 模块
- `views/settings/index.vue` - 设置页面

## 工作原理

### 路由和菜单自动同步

1. 在 `src/router/routes.ts` 中配置路由
2. `src/utils/menu.ts` 中的 `generateMenuFromRoutes` 函数自动解析路由配置
3. `src/layout/BaseLayout.vue` 使用生成的菜单数据渲染侧边栏
4. 路由和菜单保持同步，只需维护一份配置

### 实现细节

```typescript
// 布局组件中自动生成菜单
const menuList = computed(() => {
  const layoutRoute = routes.find(r => r.path === '/')
  if (layoutRoute && layoutRoute.children) {
    return generateMenuFromRoutes(layoutRoute.children, '')
  }
  return []
})
```

## 开发规范

### 1. 语言要求

- 所有文案、注释、文档必须使用**中文**（专业术语除外）
- 代码注释使用中文
- 变量命名使用驼峰命名法（camelCase）
- 组件名使用 PascalCase

### 2. 代码风格

- 使用 2 空格缩进
- 字符串优先使用单引号
- 对象和数组末尾保留逗号
- 遵循 ESLint + Prettier 配置

### 3. 组件开发

- 使用 Vue 3 Composition API
- 使用 `<script setup>` 语法
- Props 和 Emits 使用 TypeScript 类型定义
- 样式使用 `<style scoped lang="scss">`

### 4. API 调用

- 使用 async/await
- 统一使用 `src/api/request.ts` 封装的请求方法
- 错误处理统一在拦截器中处理

## 已实现功能

- ✅ 固定头部和侧边栏布局
- ✅ 菜单折叠/展开
- ✅ 路由导航和面包屑
- ✅ 统一路由和菜单配置
- ✅ 首页（统计卡片、快捷操作）
- ✅ AI 助手（聊天界面）
- ✅ Markstream 演示
- ✅ 系统设置

## 注意事项

1. **路径规则**：子路由的 path 不要以 `/` 开头，会自动拼接父路径
2. **组件路径**：遵循 `views/模块名/index.vue` 的规则
3. **图标**：一级菜单建议添加图标，子菜单不需要
4. **重定向**：有子路由的菜单项建议设置 redirect
5. **自动生成**：配置完成后，菜单会自动生成，无需手动维护

## 相关链接

- [Vue 3 文档](https://cn.vuejs.org/)
- [ArcoDesign Vue 文档](https://arco.design/vue/docs/start)
- [Vite 文档](https://cn.vitejs.dev/)
- [Pinia 文档](https://pinia.vuejs.org/zh/)
- [Vue Router 文档](https://router.vuejs.org/zh/)

## License

MIT
