<template>
  <Dashboard>
    <div class="grid gap-6">
      <h3 class="text-lg font-medium">Settings</h3>
      <PayPal />
      <Notifications />
      <Logout />
    </div>
  </Dashboard>
</template>

<script lang="ts" setup>
import PayPal from './components/PayPal/PayPal.vue'
import Dashboard from '../../layouts/Dashboard.vue'
import Logout from './components/Logout/Logout.vue'
import Notifications from './components/Notifications/Notifications.vue'
</script>
