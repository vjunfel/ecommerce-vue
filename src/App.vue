<script setup>
import NavbarComponent from "@/components/NavbarComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import { useUserStore } from "@/stores/userStore";
import { onBeforeMount } from "vue";

const userStore = useUserStore();

onBeforeMount(() => {
	if (userStore.token && userStore.token !== "null") {
		userStore.fetchUserDetails();
	}
});
</script>

<template>
	<div class="d-flex flex-column min-vh-100">
		<NavbarComponent />
		<router-view class="flex-grow-1" />
		<FooterComponent />
	</div>
</template>
