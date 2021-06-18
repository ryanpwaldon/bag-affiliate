<template>
  <div>
    <label class="block font-medium">{{ label }}</label>
    <div :class="label && 'mt-1'">
      <input
        type="text"
        :value="modelValue"
        @input="handleInput"
        :placeholder="placeholder"
        :class="[
          center && 'text-center',
          'block w-full text-sm rounded shadow-sm max-w-xs',
          error
            ? 'border-red-300 focus:ring-red-500 focus:border-red-500 placeholder-red-300 text-red-900'
            : 'focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 border-gray-300',
        ]"
      />
      <p class="mt-2 text-gray-500" v-if="description">{{ description }}</p>
      <p class="mt-1 text-red-500" v-if="error">{{ error }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmit, defineProps } from 'vue'
defineProps({
  type: String,
  label: String,
  error: String,
  center: Boolean,
  modelValue: String,
  placeholder: String,
  description: String,
})
const emit = defineEmit(['update:modelValue'])
const handleInput = (event: Event) => emit('update:modelValue', (event.target as HTMLInputElement).value)
</script>
