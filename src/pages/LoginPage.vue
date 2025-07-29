<script setup>
import { watch, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import Swal from 'sweetalert2'

const email = ref("");
const password = ref("");
const isEnabled = ref(false);

const userStore = useUserStore();
const router = useRouter();

watch([email, password], (currentValue, oldValue) => {
	if (currentValue.every((input) => input !== "")) {
		isEnabled.value = true;
	} else {
		isEnabled.value = false;
	}
});

const handleSubmit = async () => {
  try {
    await userStore.loginUser({ 
			email: email.value, 
			password: password.value 
		});
		
		await userStore.fetchUserDetails();
		
		userStore.isAdmin ? router.push('/dashboard') : router.push('/');
    // router.push('/');
		
  } catch (error) {
		console.log("ERROR", error)
    Swal.fire('Login Failed', error.response?.data?.message || 'Invalid credentials', 'error');
  }
};

</script>

<template>
	<div class="container-fluid">
		<h1 class="my-5 text-warning text-center">Login</h1>
		<div class="row d-flex justify-content-center">
			<div class="col-md-5 border border-warning rounded-3 mx-auto p-5">
				<form @submit.prevent="handleSubmit">
					<div class="mb-3">
						<label for="emailInput"	class="form-label">Email Address</label>
						<input type="email"	class="form-control" id="emailInput" v-model="email"/>
					</div>
					<div class="mb-3">
						<label for="passwordInput" class="form-label"	>Password</label>
						<input type="password" class="form-control" id="passwordInput" v-model="password"/>
					</div>
					<div class="d-grid mt-5">
						<button
  						type="submit"
  						class="btn btn-warning btn-block"
  						v-if="!isEnabled || userStore.isLoading" disabled
						>
  						Login
						</button>
						<button
  						type="submit"
  						class="btn btn-warning btn-block"
  						v-else="!isEnabled || userStore.isLoading"
						>
  						{{ userStore.isLoading ? "Logging in..." : "Login" }}
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>
