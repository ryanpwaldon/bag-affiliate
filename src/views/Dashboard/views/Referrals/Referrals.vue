<template>
  <div class="grid gap-6">
    <StatsBar :stats="referralStatsData" :loading="referralStatsLoading" />
    <Table
      :items="tableItems"
      :loading="tableLoading"
      :headings="tableHeadings"
      :total-items="tableTotalItems"
      :items-per-page="tableItemsPerPage"
      v-model:current-page="tableCurrentPage"
      emptyTextHeading="No referrals found"
    >
      <template #referral="{ item }">
        <div class="text-sm font-medium text-gray-900">{{ item.primaryDomain }}</div>
      </template>
      <template #plan="{ item }">
        <div class="text-sm text-gray-500">{{ item.subscription || '–' }}</div>
      </template>
      <template #createdAt="{ item }">
        <div class="text-sm text-gray-500">{{ date(item.createdAt).format('Do MMM YYYY') }}</div>
      </template>
      <template #payments="{ item }">
        <div class="text-sm text-gray-500">{{ currency(getTotalPayments(item.payments)) }}</div>
      </template>
    </Table>
  </div>
</template>

<script lang="ts" setup>
import { Decimal } from 'decimal.js'
import { ref } from '@vue/reactivity'
import useDate from '../../../../composables/useDate'
import Table from '../../../../components/Table/Table.vue'
import useCurrency from '../../../../composables/useCurrency'
import { computed, onMounted, watch } from '@vue/runtime-core'
import StatsBar from '../../../../components/StatsBar/StatsBar.vue'
import type { Payment } from '../../../../services/api/services/user.service'
import affiliateService from '../../../../services/api/services/affiliate.service'
const date = useDate()
const currency = useCurrency()
const referralStats = ref()
const referralStatsLoading = ref(true)
const tableItems = ref([])
const tableLoading = ref(true)
const tableTotalItems = ref(0)
const tableCurrentPage = ref(1)
const tableItemsPerPage = ref(20)
const referralStatsData = computed(() => [
  { label: 'Total referrals', value: referralStats.value?.total || 0 },
  { label: 'Active referrals', value: referralStats.value?.active || 0 },
  { label: 'Churrned referrals', value: referralStats.value?.churned || 0 },
])
const tableHeadings = [
  { id: 'referral', label: 'Referral' },
  { id: 'plan', label: 'Plan' },
  { id: 'createdAt', label: 'Created at' },
  { id: 'payments', label: 'Payments' },
]
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
onMounted(async () => {
  referralStats.value = await affiliateService.findMyReferralStats()
  referralStatsLoading.value = false
})
const getTotalPayments = (payments: Payment[]) => {
  return payments.reduce((total: number, payment: Payment) => Decimal.add(total, payment.grossAmount).toNumber(), 0)
}
</script>
