<template>
  <Dashboard>
    <TabsBar class="mb-8" />
    <router-view />
  </Dashboard>
</template>

<script lang="ts" setup>
import Dashboard from '../../layouts/Dashboard.vue'
import TabsBar from '../../components/TabsBar/TabsBar.vue'
</script>
