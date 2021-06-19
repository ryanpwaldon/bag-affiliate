<template>
  <div>
    <p class="mb-1 font-medium" v-if="label">{{ label }}</p>
    <div class="inline-flex w-full text-sm rounded shadow-sm sm:w-auto">
      <div class="w-full px-3 py-2 text-gray-500 border border-gray-300 rounded-l sm:w-80">{{ value }}</div>
      <button
        type="button"
        class="flex px-3 py-2 -ml-px font-medium border border-gray-300 rounded-r  bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        @click="copy(value)"
      >
        <ClipboardIcon class="w-5 h-5 mr-2 text-gray-400" />
        <span>Copy</span>
      </button>
    </div>
    <p class="mt-2 text-gray-500" v-if="description">{{ description }}</p>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import useCopy from '../../composables/useCopy'
import { ClipboardIcon } from '@heroicons/vue/solid'
const copy = useCopy()
defineProps({
  label: String,
  value: String,
  description: String,
})
</script>
