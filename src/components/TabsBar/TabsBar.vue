<template>
  <nav class="flex space-x-8 border-b border-gray-300">
    <router-link :key="i" v-slot="{ isActive }" v-for="(link, i) in links" :to="{ name: link.routeName }">
      <span :class="['-mb-px px-1 pb-4 font-medium text-gray-500 block', isActive && 'text-gray-800 border-b-2 border-gray-800']">{{
        link.label
      }}</span>
    </router-link>
  </nav>
</template>

<script lang="ts" setup>
const links = [
  { label: 'Payouts', routeName: 'Payouts' },
  { label: 'Referrals', routeName: 'Referrals' },
]
</script>
