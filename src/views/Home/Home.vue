<template>
  <Center>
    <div class="grid w-full gap-6 justify-items-center">
      <Logo />
      <Card class="w-full p-6 text-center">
        <h3 class="text-lg font-medium">Become an affiliate</h3>
        <p class="mt-1 text-gray-500">Earn monthly reccurring income for every customer you refer.</p>
        <router-link :to="{ name: 'Login' }">
          <Button text="Get started →" class="w-full mt-6" />
        </router-link>
      </Card>
    </div>
  </Center>
</template>

<script lang="ts" setup>
import { object, string } from 'yup'
import Logo from '../../icons/Logo.vue'
import { computed } from '@vue/runtime-core'
import Center from '../../layouts/Center.vue'
import useForm from '../../composables/useForm'
import Card from '../../components/Card/Card.vue'
import Button from '../../components/Button/Button.vue'
import InputText from '../../components/InputText/InputText.vue'
const schema = computed(() => object({ email: string().email().required().default('') }).defined())
const { fields, getValues, handleSubmit, modified } = useForm(schema)
</script>
