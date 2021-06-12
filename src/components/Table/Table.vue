<template>
  <div class="flex flex-col overflow-hidden rounded shadow">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full align-middle sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-50"
                  v-for="{ label, id } in headings"
                  :key="id"
                >
                  {{ label }}
                </th>
              </tr>
            </thead>
            <tbody v-if="loading" class="bg-white divide-y divide-gray-200">
              <tr v-for="n in 3" :key="n">
                <td v-for="i in headings.length" :key="i" class="px-6 py-4 whitespace-no-wrap">
                  <div class="w-full h-4 bg-gray-100 rounded-full animate-pulse" />
                </td>
              </tr>
            </tbody>
            <tbody v-else class="bg-white divide-y divide-gray-200">
              <tr :key="i" v-for="(item, i) in items" :class="[onSelect && 'cursor-pointer hover:bg-gray-50']" @click="onSelect && onSelect(item)">
                <td v-for="{ id } in headings" :key="id" class="px-6 py-4 whitespace-no-wrap">
                  <slot :name="id" :item="item" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <nav class="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
      <div class="hidden w-full sm:block">
        <p v-if="!loading" class="text-sm leading-5 text-gray-800">
          Showing
          <span class="font-medium">{{ firstItemIndex }}</span>
          to
          <span class="font-medium">{{ lastItemIndex }}</span>
          of
          <span class="font-medium">{{ totalItems }}</span>
          results
        </p>
      </div>
      <div class="flex justify-between flex-1 sm:justify-end sm:grid sm:gap-3 sm:grid-flow-col">
        <Button size="xs" text="Previous" theme="blue" :disabled="!hasPrevPage" @click="$emit('update:currentPage', currentPage - 1)" />
        <Button size="xs" text="Next" theme="blue" :disabled="!hasNextPage" @click="$emit('update:currentPage', currentPage + 1)" />
      </div>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import type { PropType } from 'vue'
import Button from '../Button/Button.vue'

interface Heading {
  id: string
  label: string
}

const props = defineProps({
  headings: {
    type: Array as PropType<Heading[]>,
    default: [],
  },
  items: {
    type: Array as PropType<any[]>,
    default: [],
  },
  onSelect: {
    type: Function,
  },
  totalItems: {
    type: Number,
    default: 0,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const firstItemIndex = computed(() => props.itemsPerPage * (props.currentPage - 1) + 1)
const lastItemIndex = computed(() => Math.min(props.itemsPerPage * props.currentPage, props.totalItems))
const hasPrevPage = computed(() => (props.loading ? false : props.currentPage > 1))
const hasNextPage = computed(() => (props.loading ? false : props.currentPage < Math.ceil(props.totalItems / props.itemsPerPage)))
</script>
