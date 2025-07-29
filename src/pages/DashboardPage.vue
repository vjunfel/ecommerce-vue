<script setup>
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import AdminDashBoard from "@/components/AdminDashBoard.vue";
import { useUserStore } from "@/stores/userStore";

const router = useRouter();
const userStore = useUserStore();

onBeforeMount(async () => {
	if (!userStore.email || !userStore.isAdmin) {
		return router.push('/')
	}
});

</script>

<template>
	<div class="container-fluid">
		<div class="container mt-4">
			<h1 class="mt-5 text-center text-warning">
      	Admin Dashboard
    	</h1>
		</div>
		<AdminDashBoard v-if="userStore.isAdmin" />
	</div>
</template>
