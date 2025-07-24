<script setup>
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useGlobalStore } from "../stores/global.js";
import ResetPassword from "@/components/ResetPassword.vue";
import UpdateProfile from "@/components/UpdateProfile.vue";

const { user } = useGlobalStore();

const router = useRouter();

onBeforeMount(() => {
	if (!user.email) {
		router.push({ path: "/" });
	}
});
</script>

<template>
	<div
		class="container-fluid"
		v-if="user.email"
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
