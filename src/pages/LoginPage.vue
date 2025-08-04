<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import axios from 'axios';
import privateApi from '@/api/privateApi';

const email = ref('test@mail.com');
const password = ref('asdf123 ');
const errorMsg = ref('');
const isSubmitting = ref(false);

const userStore = useUserStore();
const router = useRouter();

const handleLogin = async () => {
  isSubmitting.value = true;
  errorMsg.value = '';
  console.log({email: email.value});
  console.log({password: password.value});

  try {
    const response = await axios.post("https://vvro2vmufk.execute-api.us-west-2.amazonaws.com/production/users/login", {
    // const response = await axios.post("http://localhost:4000/users/login", {
      email: email.value,
      password: password.value
    }); 

    console.log("RESPONSE:", response);

    if (response.status !== 200) {
      throw new Error("Login Failed")
    }
    console.log("========================================");
    console.log("Token before setting:", userStore.token);
    
    userStore.token = response.data.access;
    console.log("Token after setting:", userStore.token);

    if (userStore.token && userStore.token !== "null") {
      
      // await userStore.fetchUserDetails();
      const res = await privateApi.get("users/details");
      // const res = await privateApi.get("users/details");
      
      console.log(res);
      console.log("Token after fetchUserDetails:", userStore.token);
      
      console.log("USER", res.data.user);
      userStore.email = res.data.user.email;
      userStore.isAdmin = res.data.user.isAdmin;
      userStore.id = res.data.user._id;
      userStore.firstName = res.data.user.firstName;
      userStore.lastName = res.data.user.lastName;
      userStore.mobileNo = res.data.user.mobileNo;
    }
    
    if (userStore.isAdmin) {
      router.push({ name: 'Dashboard' });
    } else {
      router.push({ name: 'Home' });
    }

  // ******************************************************
  // try {
  //   await userStore.loginUser({ email: email.value, password: password.value });

  //   if (userStore.isAdmin) {
  //     router.push({ name: 'Dashboard' });
  //   } else {
  //     router.push({ name: 'Home' });
  //   }

  } catch (err) {
    errorMsg.value = 'Invalid credentials';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
	<div
		class="container mt-5"
		style="max-width: 400px"
	>
		<h2 class="mb-3">Login</h2>

		<div
			v-if="errorMsg"
			class="alert alert-danger"
		>
			{{ errorMsg }}
		</div>

		<form @submit.prevent="handleLogin">
			<div class="mb-3">
				<label>Email</label>
				<input
					type="email"
					v-model="email"
					class="form-control"
					required
				/>
			</div>

			<div class="mb-3">
				<label>Password</label>
				<input
					type="password"
					v-model="password"
					class="form-control"
					required
				/>
			</div>

			<button
				type="submit"
				class="btn btn-warning btn-block w-100"
				:disabled="isSubmitting"
			>
				{{ isSubmitting ? "Logging in..." : "Login" }}
			</button>
		</form>
	</div>
</template>
