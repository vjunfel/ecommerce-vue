<script setup>
  import {onBeforeMount, ref} from 'vue';
  import { useGlobalStore } from '../stores/global';

  const { user } = useGlobalStore();

  const email = ref("");

  /*onBeforeMount(() => {
    email.value = localStorage.getItem("email")
  });*/
</script>

<template>
  <nav class="navbar navbar-expand-lg sticky-top bg-light shadow-sm">
    <div class="container">
      <router-link :to="{ name: 'Home' }" class="navbar-brand text-dark fw-bold" href="#">ZUITT</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ms-auto">
          <router-link :to="{ name: 'Products' }" class="nav-link" href="#">Products</router-link>
          <router-link :to="{ name: 'News' }" class="nav-link">News</router-link>
          <router-link :to="{ name: 'Profile' }" class="nav-link" v-if="user.email">Profile</router-link>
          <router-link :to="{ name: 'AddProduct' }" class="nav-link" v-if="user.email && user.isAdmin">Add Product</router-link>
          <router-link :to="{ name: 'Register' }" class="nav-link" href="#" v-if="!user.email">Register</router-link>
          <router-link :to="{ name: 'Login' }" class="nav-link" href="#" v-if="!user.email">Login</router-link>
          <router-link :to="{ name: 'Logout' }" class="nav-link" href="#" v-else>Logout</router-link>
        </div>
      </div>
  	</div>
  </nav>
</template>