<script setup>
import { reactive, watch } from "vue";
import { useUserStore } from "@/stores/userStore.js";
import api from "../api";
import ProductComponent from "@/components/ProductComponent.vue";
import ProductSearch from "@/components/ProductSearch.vue";

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

</script>

<template>	
	<section class="container">
		<div class="col my-5">
			<h1 class="text-center text-warning py-1">Products Offered</h1>
			<p class="text-center">Select a product you want and enjoy!</p>
		</div>
		
		<div class="text-center p-5 m-5" v-if="userStore.isLoading"> 
			<div class="spinner-border m-3 text-warning"></div>
			<p>Loading...</p>
		</div>
		
		<div v-else="!userStore.isLoading" class="row g-4 mb-5">
			<ProductSearch />
			<ProductComponent
				v-for="product in products.data"
				:productData="product"
			/>
		</div>
	</section>
</template>
