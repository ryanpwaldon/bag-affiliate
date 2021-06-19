<template>
  <Card>
    <form @submit="onSubmit">
      <div class="px-6 py-5 border-b border-gray-300">
        <h3 class="text-lg font-medium">Email notifications</h3>
      </div>
      <div class="px-6 py-5 space-y-5">
        <InputToggle
          label="Referrals"
          v-model="fields.referralNotification.value.value"
          description="Get notified when a customer you refer signs up."
        />
      </div>
      <div class="flex justify-end px-6 py-5 bg-gray-50">
        <Button :disabled="!modified || loading" text="Save" theme="blue" type="submit" :loading="loading" />
      </div>
    </form>
  </Card>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { boolean, object } from 'yup'
import { computed, ref } from '@vue/runtime-core'
import useForm from '../../../../composables/useForm'
import Card from '../../../../components/Card/Card.vue'
import Button from '../../../../components/Button/Button.vue'
import InputToggle from '../../../../components/InputToggle/InputToggle.vue'
import affiliateService from '../../../../services/api/services/affiliate.service'
const store = useStore()
const schema = computed(() => object({ referralNotification: boolean().required().default(store.state.affiliate.referralNotification) }).defined())
const { fields, getValues, handleSubmit, modified } = useForm(schema)
const loading = ref(false)
const onSubmit = handleSubmit(async () => {
  loading.value = true
  const { referralNotification } = getValues()
  const affiliate = await affiliateService.updateMe({ referralNotification })
  store.commit('setAffiliate', affiliate)
  loading.value = false
})
</script>
