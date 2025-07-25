<script setup>
import imgSource from "@/assets/images/Image-placeholder-item.jpg"

defineProps({
  productData: Object
})

</script>

<template>
	<section class="col-12 col-md-6 col-lg-4 mt-3">
		<router-link :to="{path:`/products/${productData._id}`}" class="text-decoration-none">
		<div id="CourseCard" class="card cardHighlights shadow-sm d-flex flex-row" style="min-height: 100%;">
				<img 
					style="height: 150px; width: 150px; object-fit: cover;"
					class="card-img-top img-fluid m-3"
					:src="productData.src ? productData.src : imgSource"
					:alt="productData.name"
				>
				<div class="card-body d-flex flex-column">
					<h4 class="card-title fw-bold mb-2">{{productData.name}}</h4>
					<p class="card-text text-muted mb-2">
						{{productData.description.slice(0, 50) + (productData.description.length > 50 ? '...' : '')}}
					</p>
					
					<p class="mb-1">
						<span class="fw-semibold">Price:</span> PHP {{productData.price}}
					</p>
				</div>
			</div>
		</router-link>
	</section>
</template>

<style scoped>
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
