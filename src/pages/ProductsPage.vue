<script setup>
import { reactive, watch } from "vue";
import { useUserStore } from "@/stores/userStore.js";
import api from "@/api/privateApi";
import publicApi from "@/api/pubApi";
import ProductComponent from "@/components/ProductComponent.vue";
import ProductSearch from "@/components/ProductSearch.vue";
import axios from "axios";

const userStore = useUserStore();
const products = reactive({ data: [] });

watch(
	() => userStore.isLoading,
	async (isLoading) => {
		if (isLoading === false) {
			try {
				const token = localStorage.getItem("token");
				const admin = userStore.isAdmin
				
				if (admin) {
					const res = await axios.get("https://vvro2vmufk.execute-api.us-west-2.amazonaws.com/production/products/all", 
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					)
					console.log("ADMIN RES", res);
					products.data = res.data;
				} else {
					const res = await axios.get("https://vvro2vmufk.execute-api.us-west-2.amazonaws.com/production/products/active", 
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);
					console.log("NOT-ADMIN RES", res);
					products.data = res.data;
				}
			} catch (err) {
				console.error("Failed to fetch products:", err);
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
