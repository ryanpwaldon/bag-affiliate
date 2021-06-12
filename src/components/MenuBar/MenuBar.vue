<template>
  <nav class="flex justify-between w-full h-16 px-8 bg-white shadow sm:rounded">
    <div class="grid items-center grid-flow-col gap-4">
      <Logo class="h-6" />
      <router-link :key="i" v-slot="{ isActive }" v-for="(link, i) in links" :to="{ name: link.routeName }">
        <span :class="['px-3 py-2 font-medium rounded text-gray-500', isActive && 'bg-gray-100 text-gray-800']">{{ link.label }}</span>
      </router-link>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import Logo from '../../icons/Logo.vue'
const links = [
  { label: 'Dashboard', routeName: 'Dashboard' },
  { label: 'Affiliate link', routeName: 'AffiliateLink' },
  { label: 'Settings', routeName: 'Settings' },
]
</script>
