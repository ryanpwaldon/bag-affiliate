<template>
  <Card>
    <form @submit="onSubmit">
      <div class="px-6 py-5 border-b border-gray-300">
        <h3 class="text-lg font-medium">PayPal account</h3>
        <p class="text-gray-500">Your payouts will be sent to the PayPal account linked below.</p>
      </div>
      <div class="px-6 py-5 space-y-5">
        <InputText
          label="PayPal email"
          :error="fields.payPalEmail.error.value"
          v-model="fields.payPalEmail.value.value"
          description="Enter the email address linked to your PayPal account."
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
import { object, string } from 'yup'
import { computed, ref } from '@vue/runtime-core'
import useForm from '../../../../composables/useForm'
import Card from '../../../../components/Card/Card.vue'
import Button from '../../../../components/Button/Button.vue'
import InputText from '../../../../components/InputText/InputText.vue'
import affiliateService from '../../../../services/api/services/affiliate.service'
const store = useStore()
const loading = ref(false)
const schema = computed(() => object({ payPalEmail: string().required().default(store.state.affiliate.payPalEmail) }).defined())
const { fields, getValues, handleSubmit, modified } = useForm(schema)
const onSubmit = handleSubmit(async () => {
  loading.value = true
  const { payPalEmail } = getValues()
  const affiliate = await affiliateService.updateMe({ payPalEmail })
  store.commit('setAffiliate', affiliate)
  loading.value = false
})
</script>
