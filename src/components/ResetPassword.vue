<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import api from '../api';

const newPassword = ref('');
const loading = ref(false);
const router = useRouter();
const notyf = new Notyf();

const handleReset = async () => {
  try {
    loading.value = true;

    // ✔️ Get token stored directly from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      notyf.error("You are not authorized");
      loading.value = false;
      return;
    }
  
    await api.patch('/users/update-password', { newPassword: newPassword.value }    );

    notyf.success("Password reset successfully");
    newPassword.value = '';

    router.push('/profile');

  } catch (err) {
    const msg = err.response?.data?.message || "Password reset failed";
    notyf.error(msg);
    console.error("Reset failed:", err.response?.data || err.message);
  } finally {
    loading.value = false;
  }
};
</script>


<template>
  <section class="container">
    <div class="row justify-content-center my-5">
      <div class="col-md-6">
        <div class="card shadow-sm p-5">
          <div class="card-body">
            <h3 class="mb-5 text-warning text-center">Reset Password</h3>
            <form @submit.prevent="handleReset">
              <div class="mb-3">
                <label for="newPassword" class="form-label">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  v-model="newPassword"
                  class="form-control border-dark"
                  required
                  placeholder="Enter your new password"
                />
              </div>
              <button
                type="submit"
                class="btn btn-warning w-100 my-4"
                :disabled="loading"
              >
                {{ loading ? 'Resetting...' : 'Reset Password' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>