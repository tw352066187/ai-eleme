<script setup lang="ts">
// ArcoVue 全局配置
</script>

<template>
  <a-config-provider>
    <router-view />
  </a-config-provider>
</template>

<style>
/* * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
} */

html, body, #app {
  height: auto;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
</style>
