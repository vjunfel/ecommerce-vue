<script setup>
import { onMounted, ref, computed } from 'vue'
import UserOrderPage from './UserOrderPage.vue';
import AdminOrderPage from './AdminOrderPage.vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();


onMounted(async() => {
  await userStore.fetchUserDetails()
})
</script>

<template>
  <section class="container">   
    
    <!-- Loading Indicator -->
    <div v-if="userStore.isLoading" class="text-center text-muted fs-5">Loading...</div>
    
    <AdminOrderPage v-else-if="!userStore.isLoading && userStore.isAdmin" />
    <UserOrderPage v-else="!userStore.isLoading"/>

  </section>
</template>
