<script setup>
import { watch, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import Swal from 'sweetalert2'
import api from "@/api";

const email = ref("test@mail.com");
const password = ref("asdf123");
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
		const res = await api.post("/users/login", { 
			email: email.value, 
			password: password.value
		});
		
		console.log("LOGIN RES =======> ", res);
		
		if (!res.status === 200) {
			throw new Error("Failed to login")
		}
		
		await userStore.loginUser({ 
			email: email.value, 
			password: password.value 
		});
		
		await userStore.fetchUserDetails();
		
		// userStore.isAdmin ? router.push('/dashboard') : router.push('/');
		
  } catch (error) {
		console.log("ERROR", error)
    Swal.fire('Login Failed', error.response?.data?.message || 'Invalid credentials', 'error');
  }
};

</script>

<template>
	<div class="container">
		<h1 class="my-5 text-warning text-center">Login</h1>
		<div class="row d-flex justify-content-center">
			<div class="col-md-5 border shadow-sm rounded-3 mx-auto p-5 bg-light">
				<form @submit.prevent="handleSubmit">
					<div class="mb-3">
						<label for="emailInput"	class="form-label">Email Address</label>
						<input type="email"	class="form-control border-dark" id="emailInput" v-model="email"/>
					</div>
					<div class="mb-3">
						<label for="passwordInput" class="form-label"	>Password</label>
						<input type="password" class="form-control border-dark" id="passwordInput" v-model="password"/>
					</div>
					<div class="d-grid mt-4">
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
