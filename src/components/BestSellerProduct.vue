<script setup>
import imgSource from "@/assets/images/Image-placeholder-item.jpg"

defineProps({
  productData: Object
})

</script>

<template>
	<section class="col-12 col-md-6 col-lg-4 my-3">
		<div id="CourseCard" class="card cardHighlights shadow-sm" style="min-height: 100%;">
			<router-link :to="{path:`/products/${productData._id}`}">
				<img 
					class="custom-img card-img-top img-fluid object-fit-cover"
					:src="productData.src ? productData.src : imgSource"
					:alt="productData.name"
				>
			</router-link>
			<div class="card-body">
				<h4 class="card-title fw-bold mb-2">{{productData.name}}</h4>
				<p class="card-text text-muted mb-2">
					{{productData.description.slice(0, 100) + (productData.description.length > 100 ? '...' : '')}}
				</p>
				
				<p class="mb-1">
					<span class="fw-semibold">Price:</span> PHP {{productData.price}}
				</p>
				
			</div>
			<div class="d-grid mt-2 m-3 position-sticky">
				<router-link class="btn-custom d-block" :to="{path:`/products/${productData._id}`}">View Product</router-link>
			</div>
		</div>
	</section>
</template>

<style scoped>
	.custom-img {
		height: 180px;
		
		@media (min-width: 640px) {
			height: 280px;
		}
	}
	
	.btn-custom {
		outline: 1px solid hsl(46, 100%, 48%);
		color: #333;
		padding: 8px;
		text-align: center;
		border-radius: 5px;
		text-decoration: none;
		font-weight: 400;
	}
	
	.btn-custom:hover {
		background-color: hsl(46, 100%, 55%);
		text-align: center;
		border-radius: 5px;
	}
</style>
