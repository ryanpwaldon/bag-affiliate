<template>
  <Dashboard>
    <Card>
      <form @submit="onSubmit">
        <div class="px-6 py-5 border-b border-gray-300">
          <h3 class="text-lg font-medium">Affiliate link</h3>
          <p class="text-gray-500">Refer customers by sharing your affiliate link.</p>
        </div>
        <div class="px-6 py-5 space-y-5">
          <InputCopy
            label="Your affiliate link"
            :value="`${marketingUrl}/${fields.code.value.value}`"
            description="This link redirects users to our app listing (https://apps.shopify.com/bag). If a user proceeds to sign up for an account after clicking your link, you’ll be paid a commission every time that user makes a payment."
          />
          <InputText
            label="Customize your code"
            v-model="fields.code.value.value"
            description="Your code appears at the end of your affiliate link."
            :error="error ? 'Code already taken. Try another.' : fields.code.error.value"
          />
        </div>
        <div class="flex justify-end px-6 py-5 bg-gray-50">
          <Button :disabled="!modified || loading" text="Save" theme="blue" type="submit" :loading="loading" />
        </div>
      </form>
    </Card>
  </Dashboard>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { object, string } from 'yup'
import useForm from '../../composables/useForm'
import Card from '../../components/Card/Card.vue'
import { computed, ref } from '@vue/runtime-core'
import Dashboard from '../../layouts/Dashboard.vue'
import Button from '../../components/Button/Button.vue'
import InputText from '../../components/InputText/InputText.vue'
import InputCopy from '../../components/InputCopy/InputCopy.vue'
import affiliateService from '../../services/api/services/affiliate.service'
const marketingUrl = import.meta.env.VITE_MARKETING_URL
const store = useStore()
const schema = computed(() =>
  object({
    code: string()
      .required('This field is required.')
      .default(store.state.affiliate.code)
      .matches(/^[a-zA-Z0-9]+$/, 'Code can only include alphanumeric characters.'),
  }).defined()
)
const { fields, getValues, handleSubmit, modified } = useForm(schema)
const loading = ref(false)
const error = ref(false)
const onSubmit = handleSubmit(async () => {
  error.value = false
  loading.value = true
  const { code } = getValues()
  try {
    const affiliate = await affiliateService.updateCode(code as string)
    store.commit('setAffiliate', affiliate)
  } catch (err) {
    console.log(err)
    error.value = true
  }
  loading.value = false
})
</script>
