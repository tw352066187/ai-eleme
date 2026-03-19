<script setup lang="ts">
import {
  Plan,
  PlanAction,
  PlanContent,
  PlanDescription,
  PlanFooter,
  PlanHeader,
  PlanTitle,
  PlanTrigger,
} from '@/components/ai-elements/plan'
import  Button  from '@/components/ui/button/Button.vue'
// import { Kbd, KbdGroup } from '@repo/shadcn-vue/components/ui/kbd'
import { FileText } from 'lucide-vue-next'
</script>

<template>
  <Plan :default-open="false">
    <PlanHeader>
      <div>
        <div class="mb-4 flex items-center gap-2">
          <FileText class="size-4" />
          <PlanTitle>将 AI 元素组件库重写为 VueJS</PlanTitle>
        </div>
        <PlanDescription>
          将 AI 元素组件库从 React 重写为 VueJS，同时使用 vue-js/compat 保持与现有基于 React 的 shadcn/ui 组件的兼容性，更新所有 29 个组件及其测试套件。
        </PlanDescription>
      </div>
      <PlanTrigger />
    </PlanHeader>
    <PlanContent>
      <div class="space-y-4 text-sm">
        <div>
          <h3 class="mb-2 font-semibold">
            概述
          </h3>
          <p>
            本计划概述了将 AI 元素库从 React 转换为 VueJS 的迁移策略，确保兼容性并保持现有功能。
          </p>
        </div>
        <div>
          <h3 class="mb-2 font-semibold">
            关键步骤
          </h3>
          <ul class="list-inside list-disc space-y-1">
            <li>搭建 VueJS 项目结构</li>
            <li>安装 vue-js/compat 以实现 React 兼容性</li>
            <li>逐个迁移组件</li>
            <li>为每个组件更新测试套件</li>
            <li>验证与 shadcn/ui 的兼容性</li>
          </ul>
        </div>
      </div>
    </PlanContent>
    <PlanFooter class="justify-end">
      <PlanAction>
        <Button size="sm">
          构建
          <!-- <KbdGroup class="gap-0">
            <Kbd class="bg-transparent text-inherit">⌘</Kbd>
            <Kbd class="translate-y-px bg-transparent text-inherit">↩</Kbd>
          </KbdGroup> -->
        </Button>
      </PlanAction>
    </PlanFooter>
  </Plan>
</template>
