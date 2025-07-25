<script setup>
import { ref } from "vue";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "@/api";
import ProductComponent from "./ProductComponent.vue";

const productName = ref("");
const products = ref([]);
const loading = ref(false);
const hasSearched = ref(false);

const notyf = new Notyf();


const searchProducts = async () => {
	if (!productName.value.trim()) {
		notyf.error("Please enter a product name.");
		return;
	}

	loading.value = true;
	hasSearched.value = true;

	try {
		const response = await api.post("/products/search-by-name", {
			productName: productName.value.trim(),
		});

		products.value = response.data || [];
		if (products.value.length) {
			notyf.success(`Found ${products.value.length} product(s).`);
		} else {
			notyf.error("No products found.");
		}
	} catch (error) {
		console.error(error);
		notyf.error("Something went wrong while searching.");
	} finally {
		loading.value = false;
	}
};
</script>

<template>
	<div class="container py-4">
		<h2 class="mb-4">Search Products</h2>

		<form
			@submit.prevent="searchProducts"
			class="mb-4"
		>
			<div class="input-group">
				<input
					type="text"
					v-model="productName"
					class="form-control"
					placeholder="Enter product name"
					required
				/>
				<button
					class="btn btn-warning"
					type="submit"
					:disabled="loading"
				>
					{{ loading ? "Searching..." : "Search" }}
				</button>
			</div>
		</form>

		<div v-if="products.length">
			<h5>Results:</h5>
			<ProductComponent
				v-for="product in products"
				:key="product._id"
				:productData="product"
			/>
		</div>

		<div v-else-if="!loading && hasSearched">
			<p class="text-muted">No products found.</p>
		</div>
	</div>
</template>

<style scoped>
.list-group-item + .list-group-item {
	margin-top: 0.5rem;
}
</style>
