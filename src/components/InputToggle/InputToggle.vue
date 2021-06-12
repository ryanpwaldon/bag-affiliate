<template>
  <SwitchGroup as="div" class="flex items-center justify-between">
    <SwitchLabel as="span" class="flex flex-col flex-grow text-sm" passive>
      <span class="font-medium">{{ label }}</span>
      <span class="text-gray-500">{{ description }}</span>
    </SwitchLabel>
    <Switch
      :modelValue="modelValue"
      @update:modelValue="handleInput"
      :class="modelValue ? 'bg-blue-600' : 'bg-gray-200'"
      class="relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer  w-11 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <span
        :class="[
          modelValue ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
        ]"
      />
    </Switch>
  </SwitchGroup>
</template>

<script lang="ts" setup>
import { defineProps, defineEmit } from 'vue'
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
defineProps({
  label: String,
  description: String,
  modelValue: Boolean,
})
const emit = defineEmit(['update:modelValue'])
const handleInput = (event?: boolean) => emit('update:modelValue', event)
</script>
