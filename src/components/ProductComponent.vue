<script setup>
import imgSource from "@/assets/images/Image-placeholder-item.jpg"
import { useCartStore } from "@/stores/cartStore";
import { Notyf } from "notyf";

const cartStore = useCartStore();
const notyf = new Notyf();

defineProps({
  productData: Object
})

const handleAddToCart = async (productId) => {
	await cartStore.addToCart(productId)
	notyf.success("Product added successfully");
}

</script>

<template>
	<section class="col-12 col-md-6 col-lg-4 my-3">
		<div id="CourseCard" class="card cardHighlights shadow-sm" style="min-height: 100%;">
			<router-link :to="{path:`/products/${productData._id}`}">
				<img 
					style="height: 280px; object-fit: cover;"
					class="card-img-top img-fluid"
					:src="productData.src ? productData.src : imgSource"
					:alt="productData.name"
				>
			</router-link>
			<div class="card-body">
				<h4 class="card-title fw-bold mb-2">{{productData.name}}</h4>
				<p class="card-text text-muted mb-2">
					{{productData.description.slice(0, 100) + (productData.description.length > 100 ? '...' : '')}}
				</p>
				
				<p class="mb-1 d-flex justify-content-between">
					<div><span class="fw-semibold">Price:</span> PHP {{productData.price}}</div>
					<div @click="handleAddToCart(productData._id)" class="btn-cart text-dark bg-white"><i class="bi bi-cart-plus"></i></div>
				</p>
				
			</div>
			<div class="d-grid mt-2 m-3 position-sticky">
				<router-link class="btn-custom d-block" :to="{path:`/products/${productData._id}`}">View Product</router-link>
			</div>
		</div>
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
	
	.btn-cart {
		background-color: rgb(240, 238, 234) !important;
		border-radius: 4px;
		padding: 4px 8px;
		cursor: pointer;
	}
	
	.btn-cart:hover {
		background: hsl(46, 100%, 55%) !important;
	}
</style>
