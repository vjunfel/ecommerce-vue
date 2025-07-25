<script setup>
import { ref } from "vue";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import api from "@/api";
import ProductComponent from "./ProductComponent.vue";
import ProductSearchResult from "./ProductSearchResult.vue";

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
			// notyf.success(`Found ${products.value.length} product(s).`);
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
	<div class="container">
		<h2 class="m-3 text-center">Search Products</h2>

		<form @submit.prevent="searchProducts" class="mb-4 text-center">
			<div class="input-group w-50 d-inline-flex">
				<label for="searchInput" class="visually-hidden">Product Name</label>
				<input
					id="searchInput"
					type="text"
					v-model="productName"
					class="form-control rounded-start-pill px-4 py-2 border-warning shadow-sm"
					placeholder="Enter product name"
					aria-label="Search by product name"
					required
				/>
				<button
					class="btn btn-warning rounded-end-pill px-4"
					type="submit"
					:disabled="loading"
				>
					Search
				</button>
			</div>
		</form>
		
		<div class="text-center p-5" v-if="loading"> 
			<div class="spinner-border m-3"></div>
			<p>Searching...</p>
		</div>

		<!-- Display Results with separation -->
		<div v-if="products.length" class="search-results p-4 pb-1 mb-4 border rounded shadow-sm bg-light">
			<div class="d-flex justify-content-between">
				<h5 class="text-primary mb-0">Search Results</h5>
				<span class="badge bg-success rounded-pill px-3 py-2">{{ products.length }} product(s) found</span>
			</div>
			<div class="d-flex gap-4 align-items-center mb-3 overflow-y-auto">
				<ProductSearchResult
					v-for="product in products"
					:key="product._id"
					:productData="product"
				/>
			</div>

		</div>

		<!-- No results -->
		<div v-else-if="!loading && hasSearched" class="text-center pt-5 pb-4 mb-4 text-muted  rounded shadow-sm">
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


