<template>
  <Dashboard>
    <Card class="flex flex-col items-start px-6 py-8 mb-8 bg-gradient-to-tr from-blue-700 to-blue-400">
      <h1 class="text-2xl font-bold text-white">Make referrals, get paid.</h1>
      <p class="max-w-xl mt-1 text-base text-white">
        Start advertising your unique affiliate link. If a user signs up after visiting your link and they make a payment, you’ll receive 30%
        commission.
      </p>
      <router-link :to="{ name: 'AffiliateLink' }">
        <Button text="View your link →" theme="white/blue" class="mt-3" />
      </router-link>
    </Card>
    <TabsBar class="mb-8" />
    <router-view />
  </Dashboard>
</template>

<script lang="ts" setup>
import Card from '../../components/Card/Card.vue'
import Dashboard from '../../layouts/Dashboard.vue'
import Button from '../../components/Button/Button.vue'
import TabsBar from '../../components/TabsBar/TabsBar.vue'
</script>
