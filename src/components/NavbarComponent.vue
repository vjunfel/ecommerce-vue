<script setup>
  import {onBeforeMount, computed} from 'vue';
  import { useUserStore } from '@/stores/userStore';

  const userStore = useUserStore();
  const isAdmin = computed(() => userStore.isAdmin);
  
  onBeforeMount( async () => {
    if (userStore.token && userStore.token !== "null") {
      await userStore.fetchUserDetails();
    }
  });
</script>

<template>
  <nav class="navbar navbar-expand-lg sticky-top bg-light shadow-sm">
    <div class="container">
      <router-link :to="{ name: 'Home' }" class="navbar-brand text-dark fw-bold">
        <img src="../assets/images/cake-logo.png" alt="CapCakes logo" width="50" loading="lazy">
        <div class="ms-3 d-inline text-secondary">Cap<span class="text-dark">CAKES</span></div>
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ms-auto gap-4">
          <router-link :to="{ name: 'Products' }" class="nav-link">
            Products
          </router-link>
          <router-link :to="{ name: 'Profile' }" class="nav-link" v-if="userStore.email">
            Profile
          </router-link>
          <router-link :to="{ name: 'Dashboard' }" class="nav-link" v-if="userStore.email">
            Dashboard
          </router-link>
          <router-link :to="{ name: 'AddProduct' }" class="nav-link" v-if="isAdmin">
            Add Product
          </router-link>
          <router-link :to="{ name: 'Register' }" class="nav-link" v-if="!userStore.email">
            Register
          </router-link>
          <router-link :to="{ name: 'Login' }" class="nav-link" v-if="!userStore.email">
            Login
          </router-link>
          <router-link :to="{ name: 'Logout' }" class="nav-link" v-else>
            Logout
          </router-link>
        </div>
      </div>
  	</div>
  </nav>
</template>

<style scoped>
.nav-link {
  color: rgb(27, 27, 27);
  transition: color 0.2s ease;
}
.nav-link:hover {
  color: rgb(228, 121, 0);
}
</style>