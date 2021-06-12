<template>
  <Card class="flex flex-wrap p-6 space-x-8">
    <template v-for="(stat, i) of stats" :key="i">
      <div class="grid gap-1">
        <span class="text-xs font-semibold tracking-wide text-gray-500 uppercase whitespace-nowrap">{{ stat.label }}</span>
        <span class="text-2xl font-bold">{{ stat.value }}</span>
      </div>
      <div class="w-px h-full bg-gray-300" v-if="i !== stats?.length - 1" />
    </template>
  </Card>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import type { PropType } from 'vue'
import Card from '../Card/Card.vue'
defineProps({
  stats: {
    type: Array as PropType<{ label: string; value: string | number }[]>,
    required: true,
  },
})
</script>
