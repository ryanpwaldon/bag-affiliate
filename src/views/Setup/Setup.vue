<template>
  <Center>
    <form class="grid w-full gap-6 justify-items-center" @submit="onSubmit">
      <div class="flex flex-col items-center space-y-3">
        <Logo class="w-6 h-6" />
        <p class="text-sm font-medium">Bag Affiliate Program</p>
      </div>
      <Card class="w-full p-6">
        <h3 class="text-lg font-medium text-center">Set up your account</h3>
        <InputText
          class="mt-6"
          title="PayPal email"
          placeholder="james@apple.com"
          :error="fields.payPalEmail.error.value"
          v-model="fields.payPalEmail.value.value"
          description="The email linked to your PayPal account. Your payouts will be sent here."
        />
        <InputText
          class="mt-6"
          placeholder="james"
          title="Affiliate code"
          :error="fields.code.error.value"
          v-model="fields.code.value.value"
          :description="codeInputDescription"
        />
        <Button type="submit" :loading="loading" class="w-full mt-6" text="Finish →" />
        <p v-if="error" class="mt-6 text-center text-red-500">Code already taken. Try another.</p>
      </Card>
    </form>
  </Center>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { object, string } from 'yup'
import Logo from '../../icons/Logo.vue'
import Center from '../../layouts/Center.vue'
import useForm from '../../composables/useForm'
import { computed, ref } from '@vue/runtime-core'
import Card from '../../components/Card/Card.vue'
import Button from '../../components/Button/Button.vue'
import InputText from '../../components/InputText/InputText.vue'
import affiliateService from '../../services/api/services/affiliate.service'
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()
const schema = computed(() =>
  object({
    payPalEmail: string().email('Must be a valid email.').required('This field is required.').default(store.state.affiliate.payPalEmail),
    code: string()
      .required('This field is required.')
      .default(store.state.affiliate.code)
      .matches(/^[a-zA-Z0-9]+$/, 'Code can only include alphanumeric characters.'),
  }).defined()
)
const { fields, getValues, handleSubmit } = useForm(schema)
const codeInputDescription = computed(
  () => `This code will appear at the end of your affiliate link e.g. https://bag.supply/${fields.value.code.value.value}`
)
const error = ref('')
const success = ref(false)
const loading = ref(false)
const onSubmit = handleSubmit(async () => {
  error.value = ''
  loading.value = true
  const { payPalEmail, code } = getValues()
  let affiliate = await affiliateService.updateMe({ payPalEmail })
  if (fields.value.code.modified) {
    try {
      affiliate = await affiliateService.updateCode(code as string)
    } catch (err) {
      error.value = 'Code already taken. Try another.'
      loading.value = false
      return
    }
  }
  store.commit('setAffiliate', affiliate)
  router.push({ name: 'Dashboard' })
  loading.value = false
})
</script>
