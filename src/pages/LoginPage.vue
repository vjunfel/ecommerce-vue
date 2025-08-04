<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';

const email = ref('test@mail.com');
const password = ref('asdf123 ');
const errorMsg = ref('');
const isSubmitting = ref(false);

const userStore = useUserStore();
const router = useRouter();

const handleLogin = async () => {
  isSubmitting.value = true;
  errorMsg.value = '';
  
  try {
    await userStore.loginUser({ email: email.value, password: password.value });

    if (userStore.isAdmin) {
      router.push({ name: 'Dashboard' });
    } else {
      router.push({ name: 'Home' });
    }

  } catch (err) {
    errorMsg.value = 'Invalid credentials';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="container mt-5" style="max-width: 400px;">
    <h2 class="mb-3">Login</h2>
    
    <div v-if="errorMsg" class="alert alert-danger">{{ errorMsg }}</div>

    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label>Email</label>
        <input type="email" v-model="email" class="form-control" required />
      </div>

      <div class="mb-3">
        <label>Password</label>
        <input type="password" v-model="password" class="form-control" required />
      </div>

      <button type="submit" class="btn btn-warning btn-block w-100" :disabled="isSubmitting">
        {{ isSubmitting ? 'Logging in...' : 'Login' }}
      </button>
    </form>
  </div>
</template>
