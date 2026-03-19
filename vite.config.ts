/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'unplugin-vue-markdown/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import monacoEditorPlugin from 'vite-plugin-monaco-editor'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  optimizeDeps: {
    exclude: ['monaco-editor']
  },
  plugins: [
    tailwindcss(),
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    Markdown({
      headEnabled: true,
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true
      }
    }),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
      dts: 'auto-imports.d.ts',
      dirs: ['src/utils', 'src/store'],
      vueTemplate: true
    }),
    Components({
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'components.d.ts'
    }),
    // Monaco Editor Worker 配置
    (monacoEditorPlugin as any).default({})
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia', 'axios', 'nprogress', 'dayjs', '@vueuse/core'],
          markdown: ['markdown-it', 'highlight.js']
        }
      }
    },
    chunkSizeWarningLimit: 2000
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
