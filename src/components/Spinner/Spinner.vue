<template>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28" class="animate-spin">
      <g stroke-linecap="round" stroke-linejoin="round" stroke-width="3" stroke="currentColor">
        <path :class="color" d="M14 2a12 12 0 1012 12" />
        <path :class="[color, 'opacity-40']" d="M14 2a12 12 0 0112 12" />
      </g>
    </svg>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from '@vue/runtime-core'
defineProps({
  color: { type: String, default: 'text-white' },
})
</script>
