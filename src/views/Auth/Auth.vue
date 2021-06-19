<template>
  <Center>
    <Spinner class="w-6 h-6 m-auto" color="text-gray-800" />
  </Center>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Center from '../../layouts/Center.vue'
import Spinner from '../../components/Spinner/Spinner.vue'
import affiliateService from '../../services/api/services/affiliate.service'
import type { Affiliate } from '../../services/api/services/affiliate.service'
const store = useStore()
const router = useRouter()
const auth = async () => {
  const affiliate = (await affiliateService.findMe().catch(() => null)) as Affiliate | null
  if (!affiliate) return router.push({ name: 'Login' })
  store.commit('setAffiliate', affiliate)
  if (!affiliate.setupComplete) router.push({ name: 'Setup' })
  else router.push(store.state.continueToRoute)
}
auth()
</script>
