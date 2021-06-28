<template>
  <Center>
    <TransitionFade>
      <div class="grid w-full gap-6 justify-items-center" v-if="success">
        <div class="flex flex-col items-center space-y-3">
          <Logo class="w-6 h-6" />
          <p class="text-sm font-medium">Bag Affiliate Program</p>
        </div>
        <Card class="w-full p-6 text-center">
          <h3 class="text-lg font-medium">Check your email</h3>
          <p class="mt-1 text-gray-500">Click the link in the email to log in to your account. Don’t forget to check your spam folder.</p>
        </Card>
      </div>
      <form class="grid w-full gap-6 justify-items-center" @submit="onSubmit" v-else>
        <div class="flex flex-col items-center space-y-3">
          <Logo class="w-6 h-6" />
          <p class="text-sm font-medium">Bag Affiliate Program</p>
        </div>
        <Card class="w-full p-6 text-center">
          <h3 class="text-lg font-medium">Sign up or log in</h3>
          <p class="mt-1 text-gray-500">Enter your email. We’ll send you a magic link that allows you to login.</p>
          <InputText v-model="fields.email.value.value" class="mt-6" placeholder="Your email" :center="true" :error="fields.email.error.value" />
          <Button type="submit" :loading="loading" class="w-full mt-3" text="Get login link" />
          <p v-if="error" class="mt-3 text-red-500">An error occurred.</p>
        </Card>
        <p class="px-3 text-xs text-center text-gray-500">
          By continuing, you acknowledge that you have read and understood, and agree to Bag's
          <a href="https://www.notion.so/Bag-Affiliate-Agreement-0179ba6b8fc04204a722f374b06f2c12" class="underline" target="_blank"
            >Affiliate Agreement</a
          >.
        </p>
      </form>
    </TransitionFade>
  </Center>
</template>

<script lang="ts" setup>
import { object, string } from 'yup'
import Logo from '../../icons/Logo.vue'
import Center from '../../layouts/Center.vue'
import useForm from '../../composables/useForm'
import { computed, ref } from '@vue/runtime-core'
import Card from '../../components/Card/Card.vue'
import Button from '../../components/Button/Button.vue'
import InputText from '../../components/InputText/InputText.vue'
import affiliateService from '../../services/api/services/affiliate.service'
import TransitionFade from '../../components/TransitionFade/TransitionFade.vue'
const schema = computed(() => object({ email: string().email().required().default('') }).defined())
const { fields, getValues, handleSubmit } = useForm(schema)
const success = ref(false)
const error = ref(false)
const loading = ref(false)
const onSubmit = handleSubmit(async () => {
  error.value = false
  loading.value = true
  const { email } = getValues()
  try {
    await affiliateService.login(email)
    success.value = true
  } catch (err) {
    console.log(err)
    error.value = true
  }
  loading.value = false
})
</script>
