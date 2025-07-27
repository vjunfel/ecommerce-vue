<script setup>
import imgSource from "@/assets/images/Image-placeholder.jpg";
import { useCartStore } from "@/stores/cartStore";
import { useProductStore } from "@/stores/productStore";
import { computed, onMounted } from "vue";

onMounted(() => {
	cartStore.getUserCart();
	productStore.fetchProducts();
});

const cartStore = useCartStore();
const productStore = useProductStore();

const cartItems = computed(() => cartStore.cartItems);
const productList = computed(() => productStore.products);
const totalPrice = computed(() => cartStore.totalPrice ?? 0);

const cartWithProducts = computed(() => {
	return cartItems.value.map((cartItem) => {
		const product = productList.value.find(
			(p) => p._id === cartItem.productId
		);

		return {
			...cartItem,
			product: product || {},
		};
	});
});
</script>

<template>
	<section class="col-lg-8">
		<div class="mb-3 border p-2 rounded d-flex align-items-center justify-content-between">
			<h6 class="ms-3 my-2">TOTAL ITEMS ({{ cartItems.length }}) </h6>
			<button class="btn btn-outline-danger">Clear cart</button>
		</div>

		<!-- "CART-LIST" {{ cartItems }}  -->
		<!-- <br />---------------------------- <br /> -->
		<!-- "PROD-LIST" {{ productList }} -->

		<!-- ************************************************* -->
		<div
			class="card p-3 mb-3"
			v-for="item in cartWithProducts"
			:key="item.productId"
		>
			<div class="d-flex align-items-start justify-content-between h-100">
				<!-- <input type="checkbox" class="me-3 mt-2"/> -->
				<div class="overflow-hidden rounded border ">
					<router-link
						:to="{ path: `/products/${item.productId}` }"
						class="text-decoration-none text-dark"
					>
						<img
							:src="item.product.src || imgSource"
							:alt="item.product.name"
							class="img-fluid"
							style="width: 120px; height: 120px; object-fit: cover"
						/>
					</router-link>
				</div>
				
				<div class="w-100 d-flex justify-content-between">
					<!-- Name -->
					<div id="product-info" class="ms-4">
						<router-link
							:to="{ path: `/products/${item.productId}` }"
							class="text-decoration-none text-dark"
						>
							<h5 class="fw-bold">{{ item.product.name }}</h5>
						</router-link>
		
						<div class="flex-grow-1">
							
							<p class="mb-1 text-muted small">{{ item.product.description }}</p>
							<p class="mb-2 text-danger small">
								<!-- {{ itemRemaining }} item(s) left -->
							</p>
		
							<div class="d-flex align-items-center">
								<button class="btn btn-outline-secondary btn-sm me-2">
									−
								</button>
								<span>1</span>
								<button class="btn btn-outline-secondary btn-sm ms-2">
									+
								</button>
							</div>
							
						</div>
					</div>

					<!-- Price -->
					<div id="product-price" class="text-end ms-4">
						<p class="fs-5 fw-bold">₱{{ item.product.price }}</p>
						<div class="d-flex gap-2 justify-content-end">
							<i class="bi bi-heart"></i>
							<i class="bi bi-trash"></i>
						</div>
					</div>
				</div>
				
			</div>
		</div>
		
		<h2>Total: ₱{{ totalPrice.toLocaleString() }}</h2>
		
	</section>
</template>
