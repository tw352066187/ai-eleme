import type { AppRouteRecordRaw } from '@/router/routes'

// 菜单项类型
export interface MenuItem {
  key: string
  title: string
  icon?: any
  children?: MenuItem[]
}

/**
 * 从路由配置生成菜单数据
 * @param routes 路由配置数组
 * @param parentPath 父路径
 * @returns 菜单数据数组
 */
export function generateMenuFromRoutes(
  routes: AppRouteRecordRaw[],
  parentPath = ''
): MenuItem[] {
  const menuList: MenuItem[] = []

  routes.forEach((route) => {
    // 跳过隐藏的路由
    if (route.meta?.hidden) {
      return
    }

    // 构建完整路径
    let fullPath = route.path.startsWith('/')
      ? route.path
      : `${parentPath}/${route.path}`.replace(/\/+/g, '/')

    // 确保路径以 / 开头
    if (!fullPath.startsWith('/')) {
      fullPath = '/' + fullPath
    }

    const menuItem: MenuItem = {
      key: fullPath,
      title: route.meta?.title || '',
      icon: route.meta?.icon
    }

    // 处理子路由
    if (route.children && route.children.length > 0 && !route.meta?.hideChildren) {
      const children = generateMenuFromRoutes(route.children, fullPath)
      if (children.length > 0) {
        menuItem.children = children
      }
    }

    menuList.push(menuItem)
  })

  return menuList
}
