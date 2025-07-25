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
			name: productName.value.trim()
		});

		products.value = response.data || [];

		if (products.value.length) {
			notyf.success(`Found ${products.value.length} product(s).`);
		} else {
			notyf.error("No product found.");
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
		<h2 class="mb-4 text-center">Search Products</h2>

		<form @submit.prevent="searchProducts" class="mb-4">
			<div class="input-group">
				<label for="searchInput" class="visually-hidden">Product Name</label>
				<input
					id="searchInput"
					type="text"
					v-model="productName"
					class="form-control"
					placeholder="Enter product name"
					aria-label="Search by product name"
					required
				/>
				<button
					class="btn btn-warning"
					type="submit"
					:disabled="loading"
				>
					<span v-if="loading">
						<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
						Searching...
					</span>
					<span v-else>Search</span>
				</button>
			</div>
		</form>

		<!-- Display Results with separation -->
		<div v-if="products.length" class="search-results p-4 border rounded shadow-sm bg-light">
			<div class="d-flex justify-content-between align-items-center mb-3">
				<h5 class="text-primary mb-0">Search Results</h5>
				<span class="badge bg-success rounded-pill">{{ products.length }} product(s) found</span>
			</div>

			<ProductComponent
				v-for="product in products"
				:key="product._id"
				:productData="product"
			/>
		</div>

		<!-- No results -->
		<div v-else-if="!loading && hasSearched" class="text-center mt-4 text-muted">
			<p>No products found. Try a different name.</p>
		</div>
	</div>
</template>

<style scoped>
.list-group-item + .list-group-item {
	margin-top: 0.5rem;
}

.search-results {
	margin-top: 2rem;
	border-left: 5px solid #ffc107; 
	background-color: #fef9e7;
}
</style>


