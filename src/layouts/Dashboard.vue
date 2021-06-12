<template>
  <div class="max-w-4xl m-auto space-y-8 sm:p-8">
    <MenuBar />
    <main class="w-full px-8">
      <slot />
    </main>
  </div>
</template>

<script lang="ts" setup>
import MenuBar from '../components/MenuBar/MenuBar.vue'
</script>
