<script setup>
import { ref } from 'vue';
import { Notyf } from 'notyf';
import { useRouter } from 'vue-router';
import publicApi from '@/api/pubApi';

const notyf = new Notyf();
const router = useRouter();

const email = ref('');
const firstName = ref('');
const lastName = ref('');
const errorMsg = ref('');
const successMsg = ref('');
const isSubmitting = ref(false);
const mobileNum = ref("");
const password = ref("");
const confirmPass = ref("");
const isEnabled = ref(false);

const handleRegister = async () => {
  errorMsg.value = '';
  successMsg.value = '';
  isSubmitting.value = true;

  try {
    const res = await publicApi.post('/users/register', {
      firstName: firstName.value,
			lastName: lastName.value,
			email: email.value,
			mobileNo: mobileNum.value,
			password: password.value,
    });
		
		console.log("REGISTRATION ======>> ", res);
		
		if (res.status !== 201) {
			throw new Error("Registration failed")
		}

		notyf.success("Registration successful!");
		router.push({ name: 'Login' });

  } catch (err) {
    errorMsg.value = err.response?.data?.message || "Registration failed.";
		notyf.error(err.response?.data?.message || "Please contact administrator.");
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="container mt-5 mb-4" style="max-width: 400px;">
    <h2 class="mb-3">Register</h2>

    <form @submit.prevent="handleRegister">
      <div class="mb-3">
						<label for="fName" class="form-label">First Name</label>
						<input
							type="text"
							class="form-control border-dark"
							id="fName"
							v-model="firstName"
							required
						/>
					</div>
					<div class="mb-3">
						<label for="lName" class="form-label">Last Name</label>
						<input
							type="text"
							class="form-control border-dark"
							id="lName"
							v-model="lastName"
							required
						/>
					</div>
					<div class="mb-3">
						<label for="mobile" class="form-label">Mobile Number</label>
						<input
							type="text"
							class="form-control border-dark"
							id="mobile"
							v-model="mobileNum"
							required
						/>
					</div>
					<div class="mb-3">
						<label for="emailInput" class="form-label">Email Address</label>
						<input
							type="email"
							class="form-control border-dark"
							id="emailInput"
							v-model="email"
							required
						/>
					</div>
					<div class="mb-3">
						<label for="passwordInput" class="form-label">Password</label>
						<input
							type="password"
							class="form-control border-dark"
							id="passwordInput"
							v-model="password"
							required
						/>
					</div>
					<div class="mb-3">
						<label for="cpasswordInput" class="form-label">Confirm Password</label>
						<input
							type="password"
							class="form-control border-dark"
							id="cpasswordInput"
							v-model="confirmPass"
							required
						/>
					</div>

      <button type="submit" class="btn btn-warning btn-block w-100" :disabled="isSubmitting">
        {{ isSubmitting ? 'Registering...' : 'Register' }}
      </button>
			
			<p className="my-4 text-center text-secondary">Already have an account?
        <router-link to="/login">Login</router-link>
      </p>
    </form>
  </div>
</template>
