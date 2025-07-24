<script setup>
import { ref, reactive, onBeforeMount, watch } from "vue";
import api from "../api";
import UserView from "../components/UserView.vue";
import AdminView from "../components/AdminView.vue";

import { useGlobalStore } from "../stores/global.js";
const { user } = useGlobalStore();
const products = reactive({ data: [] });

const fetchProduct = async () => {
	let { data } = await api.get("/products/all");
	products.data = data;
}

watch(
	[user],
	async () => {
		if (user.isLoading === false) {
			if (user.isAdmin) {
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
		<p v-if="user.isLoading">Loading...</p>

		<AdminView
			v-if="user.isAdmin && !user.isLoading"
			:productsData="products.data"
			@refreshProducts="fetchProduct"
		/>
		<UserView
			v-if="!user.isAdmin && !user.isLoading"
			:productsData="products.data"
			
		/>
	</div>
</template>
