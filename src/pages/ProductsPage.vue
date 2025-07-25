<script setup>
import { reactive, watch } from "vue";
import { useUserStore } from "../stores/userStore.js";
import api from "../api";
import Products from "@/components/Products.vue";

const userStore = useUserStore();
const products = reactive({ data: [] });

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
				let { data } = await api.get("products/active");
				products.data = data;
			}
		}
	},
	{ immediate: true }
);

console.log(userStore.isAdmin ? "admin-user": "not admin")
console.log(userStore.token ? "has token": "no token")
</script>

<template>	
	<div class="container">
		<p class="text-center p-5 m-5" 
			v-if="userStore.isLoading"
		> Loading...</p>
		
		<Products
			v-else="!userStore.isLoading"
			:productsData="products.data"
		/>
	</div>
</template>
