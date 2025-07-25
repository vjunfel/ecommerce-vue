<script setup>
import { ref, reactive, onBeforeMount, watch } from "vue";
import api from "../api";
import UserView from "../components/UserView.vue";
import AdminView from "../components/AdminView.vue";
import { useUserStore } from "../stores/userStore.js";

const userStore = useUserStore();
const user = userStore.email;
const products = reactive({ data: [] });

console.log("USER", user)

const fetchProduct = async () => {
	let { data } = await api.get("/products/all");
	products.data = data;
}

watch(
	[userStore],
	async () => {
		if (userStore.isLoading === false) {
			if (userStore.isAdmin) {
				fetchProduct()
			} else {
				let { data } = await api.get("/products");
				console.log(data);
				products.data = data;
			}
		}
	},
	{ immediate: true }
);
</script>

<template>
	<div class="container">
		<p v-if="userStore.isLoading">Loading...</p>

		<AdminView
			v-if="userStore.isAdmin && !userStore.isLoading"
			:productsData="products.data"
			@refreshProducts="fetchProduct"
		/>
		<UserView
			v-if="!userStore.isAdmin && !userStore.isLoading"
			:productsData="products.data"
		/>
	</div>
</template>
