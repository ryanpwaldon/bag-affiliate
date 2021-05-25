<template>
  <div>
    <label class="block font-medium">{{ label }}</label>
    <div :class="label && 'mt-1'">
      <input
        type="text"
        :value="modelValue"
        @input="handleInput"
        :placeholder="placeholder"
        class="block w-full text-sm border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmit, defineProps } from 'vue'
const props = defineProps({
  type: String,
  label: String,
  value: String,
  modelValue: String,
  placeholder: String,
})
const emit = defineEmit(['update:modelValue'])
const handleInput = (event: Event) => emit('update:modelValue', (event.target as HTMLInputElement).value)
</script>
