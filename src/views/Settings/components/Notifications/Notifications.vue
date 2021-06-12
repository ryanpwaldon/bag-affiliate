<template>
  <Card>
    <form @submit="onSubmit">
      <div class="px-6 py-5 border-b border-gray-300">
        <h3 class="text-lg font-medium">Email notifications</h3>
      </div>
      <div class="px-6 py-5 space-y-5">
        <InputToggle label="Referrals" v-model="fields.newReferral.value.value" description="Get notified when a customer you refer signs up." />
      </div>
      <div class="flex justify-end px-6 py-5 bg-gray-50">
        <Button :disabled="!modified || loading" text="Save" theme="blue" type="submit" :loading="loading" />
      </div>
    </form>
  </Card>
</template>

<script lang="ts" setup>
import { boolean, object } from 'yup'
import { computed, ref } from '@vue/runtime-core'
import useForm from '../../../../composables/useForm'
import Card from '../../../../components/Card/Card.vue'
import Button from '../../../../components/Button/Button.vue'
import InputToggle from '../../../../components/InputToggle/InputToggle.vue'
const schema = computed(() => object({ newReferral: boolean().required().default(false) }).defined())
const { fields, getValues, handleSubmit, modified } = useForm(schema)
const loading = ref(false)
const onSubmit = handleSubmit(async () => {
  loading.value = true
  const values = getValues()
  console.log(values)
  await new Promise((resolve) => setTimeout(resolve, 5000))
  loading.value = false
})
</script>
