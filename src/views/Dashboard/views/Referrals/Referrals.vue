<template>
  <div class="grid gap-6">
    <StatsBar :stats="referralStats" />
    <Table
      :items="tableItems"
      :loading="tableLoading"
      :headings="tableHeadings"
      :total-items="tableTotalItems"
      :items-per-page="tableItemsPerPage"
      v-model:current-page="tableCurrentPage"
      emptyTextHeading="No referrals found"
    >
      <template #user="{ item }">
        <div class="text-sm font-medium text-gray-900">{{ item.shopOrigin }}</div>
      </template>
      <template #plan="{ item }">
        <div class="text-sm text-gray-500">{{ item.subscription || '–' }}</div>
      </template>
      <template #createdAt="{ item }">
        <div class="text-sm text-gray-500">{{ date(item.createdAt).format('Do MMM YYYY') }}</div>
      </template>
    </Table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from '@vue/reactivity'
const date = useDate()
import { watch } from '@vue/runtime-core'
import Table from '../../../../components/Table/Table.vue'
import StatsBar from '../../../../components/StatsBar/StatsBar.vue'
import useDate from '../../../../composables/useDate'
import affiliateService from '../../../../services/api/services/affiliate.service'
const referralStats = [
  { label: 'Total referrals', value: '21' },
  { label: 'Active referrals', value: '3' },
  { label: 'Churrned referrals', value: '18' },
]
const tableHeadings = [
  { id: 'user', label: 'User' },
  { id: 'plan', label: 'Plan' },
  { id: 'createdAt', label: 'Created at' },
  { id: 'payouts', label: 'Payouts' },
]
const tableItems = ref([])
const tableLoading = ref(true)
const tableTotalItems = ref(0)
const tableCurrentPage = ref(1)
const tableItemsPerPage = ref(20)
watch(
  tableCurrentPage,
  async () => {
    tableLoading.value = true
    const response = await affiliateService.findMyReferrals({ page: tableCurrentPage.value, limit: tableItemsPerPage.value })
    tableItems.value = response.docs
    tableTotalItems.value = response.total
    tableLoading.value = false
  },
  { immediate: true }
)
</script>
