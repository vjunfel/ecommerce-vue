<script setup>
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore();

defineProps({
  productData: Object
})

</script>

<template>
	<div class="col-12 col-md-6 col-lg-4 my-3">
		<div id="CourseCard" class="card cardHighlights shadow-sm" style="min-height: 100%;">
			<img 
				style="height: 280px; object-fit: cover;"
				class="card-img-top img-fluid"
				:src="productData.src ? productData.src : `https://placehold.co/600x400/63c3ff/ffffff?font=raleway&text=${encodeURIComponent(productData.name)}`"
				:alt="productData.name"
			>
			<div class="card-body">
				<h4 class="card-title fw-bold mb-2">{{productData.name}}</h4>
				<p class="card-text text-muted mb-2">
					{{productData.description.slice(0, 100) + (productData.description.length > 100 ? '...' : '')}}
				</p>
				
				<!-- <p>{{ userStore.isAdmin ? (`Status: ${productData.status}`) : null }}</p> -->
				
				<p class="mb-1">
					<span class="fw-semibold">Price:</span> PHP {{productData.price}}
				</p>
				
				<div class="d-grid mt-3">
					<router-link class="btn btn-outline-dark d-block" :to="{path:`/products/${productData._id}`}">View Product</router-link>
				</div>
			</div>
		</div>
	</div>
</template>
