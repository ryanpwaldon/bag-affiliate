<template>
  <Center>
    <div class="grid w-full gap-6 justify-items-center">
      <Logo />
      <Card class="w-full text-center">
        <p class="text-lg font-medium">Become an affiliate</p>
        <p class="mt-1 text-gray-500">Earn monthly reccurring income for every customer you refer.</p>
        <InputText v-model="fields.email.value.value" class="mt-6" />
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
import InputText from '../../components/InputText/InputText.vue'
const schema = computed(() => object({ email: string().email().required().default('') }).defined())
const { fields, getValues, handleSubmit, modified } = useForm(schema)
</script>
