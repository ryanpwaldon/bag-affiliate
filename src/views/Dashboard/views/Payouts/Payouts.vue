<template>
  <div class="grid gap-6">
    <StatsBar :stats="payoutStats" />
  </div>
</template>

<script lang="ts" setup>
import StatsBar from '../../../../components/StatsBar/StatsBar.vue'
const payoutStats = [
  { label: 'Total payouts', value: '$2,392' },
  { label: 'Next payout', value: '$283' },
]
</script>
