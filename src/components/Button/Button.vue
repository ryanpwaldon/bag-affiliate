<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center text-center border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
      themeClasses,
      sizeClasses,
    ]"
  >
    <Spinner class="w-5" v-if="loading" />
    <span v-else>{{ text }}</span>
  </button>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, defineProps } from 'vue'
import Spinner from '../Spinner/Spinner.vue'
const props = defineProps({
  text: String,
  loading: Boolean,
  disabled: Boolean,
  size: { type: String, default: 'sm' },
  theme: { type: String, default: 'black' },
  type: { type: String as PropType<'button' | 'submit'>, default: 'button' },
})
const sizeClasses = {
  xs: 'rounded px-2.5 py-1.5 text-xs font-medium',
  sm: 'rounded-md px-3 py-2 text-sm font-medium',
}[props.size]
// prettier-ignore
const themeClasses = computed(() => ({
  blue: `text-white bg-blue-600 shadow-sm ${props.disabled || props.loading ? 'opacity-75' : 'hover:bg-blue-700'}`,
  black: `text-white bg-gray-800 shadow-sm ${props.disabled || props.loading ? 'opacity-75' : 'hover:bg-gray-900'}`,
  white: `text-gray-800 bg-white shadow ${props.disabled || props.loading ? 'opacity-75' : 'hover:bg-gray-50'}`,
  'white/blue': `text-blue-700 bg-white shadow ${props.disabled || props.loading ? 'opacity-75' : 'hover:bg-gray-50'}`,
}[props.theme]))
</script>
