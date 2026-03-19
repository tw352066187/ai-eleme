<script setup lang="ts">
import { CommandItem } from '@/components/ui/command'

// 透传 value 属性，CommandItem 要求必须有 value
defineProps<{
  value?: string
}>()
</script>

<template>
  <CommandItem :value="$attrs.value as string ?? ''" v-bind="$attrs">
    <slot />
  </CommandItem>
</template>
