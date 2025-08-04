<script setup>
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { email, isAdmin } = storeToRefs(userStore); // <- reactive references
</script>

<template>
  <nav class="navbar navbar-expand-lg sticky-top bg-light shadow-sm">
    <div class="container">
      <router-link :to="{ name: 'Home' }" class="navbar-brand text-dark fw-bold">
        <img src="../assets/images/cake-logo.png" alt="CapCakes logo" width="40" loading="lazy">
        <div class="ms-2 d-inline text-secondary">Cap<span class="text-warning">CAKES</span></div>
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ms-auto gap-4">
          <router-link :to="{ name: 'Products' }" class="nav-link"> Products </router-link>
          <router-link :to="{ name: 'Cart' }" class="nav-link" v-if="email && !isAdmin"> Cart </router-link>
          <router-link :to="{ name: 'Profile' }" class="nav-link" v-if="email"> Profile </router-link> 
          <router-link :to="{ name: 'Dashboard' }" class="nav-link" v-if="email && isAdmin"> Dashboard </router-link>
          <router-link :to="{ name: 'Register' }" class="nav-link" v-if="!email"> Register </router-link>
          <router-link :to="{ name: 'Login' }" class="nav-link" v-if="!email"> Login </router-link>
          <router-link :to="{ name: 'Logout' }" class="nav-link" v-if="email"> Logout </router-link>
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