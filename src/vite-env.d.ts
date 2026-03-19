/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.md' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'unplugin-vue-markdown/vite' {
  import type { Plugin } from 'vite'
  const markdown: (options?: any) => Plugin
  export default markdown
}
