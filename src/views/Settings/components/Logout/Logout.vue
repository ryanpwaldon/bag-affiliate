<template>
  <Card class="flex items-center justify-between p-6">
    <div>
      <h3 class="text-lg font-medium">Log out</h3>
      <p class="text-gray-500">Click the button on the right to log out of your account.</p>
    </div>
    <Button text="Log out" theme="blue" @click="logout" />
  </Card>
</template>

<script lang="ts" setup>
import Card from '../../../../components/Card/Card.vue'
import Button from '../../../../components/Button/Button.vue'
import affiliateService from '../../../../services/api/services/affiliate.service'
const logout = async () => {
  await affiliateService.logout()
  location.reload()
}
</script>
