<script setup>
import ProductComponent from "../components/ProductComponent.vue";
import ProductSearch from "./ProductSearch.vue";
import { defineProps } from "vue";

const props = defineProps({
	productsData: Array,
});
</script>

<template>
	<div class="row">
		<div class="col my-5">
			<h1 class="text-center text-primary py-1">Products Offered</h1>
			<p class="text-center">Select a product to enroll in!</p>
		</div>
	</div>
	<div class="row g-4">
		<ProductSearch />
		<ProductComponent
			v-for="product in productsData"
			:productData="product"
		/>
	</div>
</template>
