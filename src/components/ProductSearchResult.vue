<script setup>
import imgSource from "@/assets/images/Image-placeholder-item.jpg"

defineProps({
  productData: Object
})

</script>

<template>
	<section class="col-12 col-md-6 col-lg-4 mt-3">
		<router-link :to="{path:`/products/${productData._id}`}" class="text-decoration-none">
		<div id="productCard" class="card cardHighlights shadow-sm d-flex flex-row" style="min-height: 100%;">
				<img 
					class="custom-img card-img-top img-fluid object-fit-cover m-2"
					:src="productData.src ? productData.src : imgSource"
					:alt="productData.name"
				>
				<div class="card-body d-flex flex-column overflow-hidden p-2">
					<h5 class="card-title fw-bold mb-2 text-nowrap overflow-hidden">
						{{productData.name.slice(0, 20) + (productData.name.length > 20 ? '...' : '')}}
					</h5>
					<p class="card-text text-muted mb-2">
						{{productData.description.slice(0, 30) + (productData.description.length > 30 ? '...' : '')}}
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
	.custom-img {
		height: 100px;
		width: 100px;
		
		@media (min-width: 1200px) {
			height: 150px;
			width: 150px;
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
