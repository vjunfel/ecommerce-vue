<script setup>
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore.js";
import ResetPassword from "@/components/ResetPassword.vue";
import UpdateProfile from "@/components/UpdateProfile.vue";

const userStore = useUserStore();

const router = useRouter();

onBeforeMount(() => {
	if (!userStore.email) {
		router.push({ path: "/" });
	}
});
</script>

<template>
	<div
		class="container-fluid"
		v-if="userStore.email"
	>
		<h1 class="my-5 pt-3 text-primary text-center">Profile Page</h1>
		<div class="row d-flex justify-content-center">
			<div class="col-md-5 border border rounded-3 mx-auto p-5">
				<h2 className="mt-3">Juan Dela Cruz</h2>
				<hr />
				<h4>Contacts</h4>
				<ul>
					<li>Email: jdelacruz@mail.com</li>
					<li>Mobile No: 09123456789</li>
				</ul>
			</div>
		</div>
		<ResetPassword />
		<UpdateProfile />
		<br />
		<br />
	</div>
</template>
