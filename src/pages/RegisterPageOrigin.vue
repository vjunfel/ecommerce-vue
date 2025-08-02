<script setup>
import { watch, ref, onBeforeMount } from "vue";
import { Notyf } from "notyf";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore.js";
import api from "../api/privateApi.js";

const notyf = new Notyf();
const router = useRouter();

const userStore = useUserStore();

const firstName = ref("");
const lastName = ref("");
const mobileNum = ref("");
const email = ref("");
const password = ref("");
const confirmPass = ref("");
const isEnabled = ref(false);

watch(
	[email, password, confirmPass, firstName, lastName, mobileNum],
	(currentValue, oldValue) => {
		if (
			currentValue.every((input) => input !== "") &&
			currentValue[1] === currentValue[2]
		) {
			isEnabled.value = true;
		} else {
			isEnabled.value = false;
		}
	}
);

async function handleSubmit() {
	try {
		const res = await api.post("/users/register", {
			firstName: firstName.value,
			lastName: lastName.value,
			email: email.value,
			mobileNo: mobileNum.value,
			password: password.value,
		});
		
		if (res.status === 201) {
			notyf.success(res.data.message);

			firstName.value = "";
			lastName.value = "";
			mobileNum.value = "";
			email.value = "";
			password.value = "";
			confirmPass.value = "";

			router.push({ path: "/login" });
		} else {
			notyf.error("Registration failed. Please contact administrator.");
		}
	} catch (e) {
		if (
			e.res.status === 404 ||
			e.res.status === 401 ||
			e.res.status === 400 ||
			e.res.status === 409
		) {
			notyf.error(e.res.data.message);
		} else {
			console.error(e);
			notyf.error("Registration failed. Please contact administrator.");
		}
	}
}

onBeforeMount(() => {
	if (userStore.token) {
		router.push({ path: "/products" });
	}
});
</script>

<template>
	<div class="container">
		<h1 class="my-5 text-warning text-center">Register</h1>
		<div class="row d-flex justify-content-center">
			<div class="col-md-5 border shadow-sm rounded-3 mx-auto p-5 mb-5 bg-light">
				<form v-on:submit.prevent="handleSubmit">
					<div class="mb-3">
						<label
							for="fName"
							class="form-label"
							>First Name</label
						>
						<input
							type="text"
							class="form-control border-dark"
							id="fName"
							v-model="firstName"
						/>
					</div>
					<div class="mb-3">
						<label
							for="lName"
							class="form-label"
							>Last Name</label
						>
						<input
							type="text"
							class="form-control border-dark"
							id="lName"
							v-model="lastName"
						/>
					</div>
					<div class="mb-3">
						<label
							for="mobile"
							class="form-label"
							>Mobile Number</label
						>
						<input
							type="text"
							class="form-control border-dark"
							id="mobile"
							v-model="mobileNum"
						/>
					</div>
					<div class="mb-3">
						<label
							for="emailInput"
							class="form-label"
							>Email Address</label
						>
						<input
							type="email"
							class="form-control border-dark"
							id="emailInput"
							v-model="email"
						/>
					</div>
					<div class="mb-3">
						<label
							for="passwordInput"
							class="form-label"
							>Password</label
						>
						<input
							type="password"
							class="form-control border-dark"
							id="passwordInput"
							v-model="password"
						/>
					</div>
					<div class="mb-3">
						<label
							for="cpasswordInput"
							class="form-label"
							>Confirm Password</label
						>
						<input
							type="password"
							class="form-control border-dark"
							id="cpasswordInput"
							v-model="confirmPass"
						/>
					</div>
					<div class="d-grid mt-4">
						<button
							type="submit"
							class="btn btn-warning btn-block"
							v-if="isEnabled"
						>
							Submit
						</button>
						<button
							type="submit"
							class="btn btn-warning btn-block"
							v-else
							disabled
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>
