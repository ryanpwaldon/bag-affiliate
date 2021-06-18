<template>
  <div class="grid gap-6">
    <StatsBar :stats="payoutStats" />
    <Table
      :items="tableItems"
      :loading="tableLoading"
      :headings="tableHeadings"
      :total-items="tableTotalItems"
      :items-per-page="tableItemsPerPage"
      v-model:current-page="tableCurrentPage"
      emptyTextHeading="No payouts found"
      emptyTextSubtitle="Check back once you make some referrals!"
    >
      <template #value="{ item }">
        <div class="text-sm font-medium text-gray-900">{{ item.valueFormatted }}</div>
      </template>
      <template #period="{ item }">
        <div class="text-sm text-gray-500">{{ item.period }}</div>
      </template>
      <template #payoutDate="{ item }">
        <div class="text-sm text-gray-500">{{ item.payoutDate }}</div>
      </template>
      <template #status="{ item }">
        <div class="text-sm text-gray-500">{{ item.status }}</div>
      </template>
    </Table>
  </div>
</template>

<script lang="ts" setup>
import { Decimal } from 'decimal.js'
import { ref } from '@vue/reactivity'
import { computed, watch } from '@vue/runtime-core'
import Table from '../../../../components/Table/Table.vue'
import useCurrency from '../../../../composables/useCurrency'
import StatsBar from '../../../../components/StatsBar/StatsBar.vue'
import usePayoutsFormatted from '../../../../composables/usePayoutsFormatted'
const currency = useCurrency()
const payoutsFormatted = usePayoutsFormatted()
const totalPayouts = computed(() => payoutsFormatted.filter(({ paid }) => paid).reduce((total, item) => Decimal.add(total, item.value).toNumber(), 0))
const nextPayout = computed(() => currency(payoutsFormatted[0]?.value))
const payoutStats = [
  { label: 'Total payouts', value: totalPayouts.value || currency(0) },
  { label: 'Next payout', value: nextPayout.value || currency(0) },
]
const tableHeadings = [
  { id: 'value', label: 'Value' },
  { id: 'period', label: 'Period' },
  { id: 'payoutDate', label: 'Payout Date' },
  { id: 'status', label: 'Status' },
]
const tableItems = ref([] as any[])
const tableLoading = ref(true)
const tableTotalItems = ref(0)
const tableCurrentPage = ref(1)
const tableItemsPerPage = ref(1000)
watch(
  tableCurrentPage,
  async () => {
    tableLoading.value = true
    tableItems.value = payoutsFormatted
    tableTotalItems.value = payoutsFormatted.length
    tableLoading.value = false
  },
  { immediate: true }
)
</script>
