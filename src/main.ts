import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/styles/main.scss'
import '@/assets/styles/globals.css'
// import 'highlight.js/styles/github-dark.css'

// 引入 ArcoVue
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'

// 引入 markstream-vue 样式
import 'markstream-vue/index.css'

// 启用 markstream-vue 的 Mermaid 和 KaTeX 功能
import { enableMermaid, enableKatex } from 'markstream-vue'
enableMermaid()
enableKatex()

const app = createApp(App)

app.use(router)
app.use(store)
app.use(ArcoVue) // 注册 ArcoVue 插件

app.mount('#app')
