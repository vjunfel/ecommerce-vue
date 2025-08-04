<script setup>
import { ref } from "vue";
import { Notyf } from "notyf";
import ProductSearchResult from "./ProductSearchResult.vue";
import publicApi from "@/api/pubApi";

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
		const response = await publicApi.post("/products/search-by-name", {
			name: productName.value.trim()
		});

		products.value = response.data || [];

	} catch (error) {
		console.error(error);
		notyf.error("Something went wrong while searching.");
	} finally {
		loading.value = false;
	}
};
</script>

<template>
	<section class="container mb-4">
		<h2 class="m-3 text-center">Search Products</h2>
		
		<div class="row text-center custom-search">
		<form @submit.prevent="searchProducts" class="custom-form text-center d-flex">
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
		</form>
		</div>
		
		<div class="text-center p-5" v-if="loading"> 
			<div class="spinner-border m-3 text-warning"></div>
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
			<p class="text-danger">No products found. Try a different name.</p>
		</div>
	</section>
</template>

<style scoped>
.custom-search {
	display: flex;
	align-items: center;
	justify-content: center;
}

.custom-form {
	max-width: 800px;
	margin-bottom: 1rem;
	margin-bottom: 2rem;
}

.list-group-item + .list-group-item {
	margin-top: 0.5rem;
}

.search-results {
	margin-top: 2rem;
	border-left: 5px solid #ffc107; 
	background-color: #fef9e7;
}
</style>


