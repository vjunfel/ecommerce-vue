<script setup>
import imgSource from "@/assets/images/Image-placeholder.jpg";
import { useCartStore } from "@/stores/cartStore";
import { useProductStore } from "@/stores/productStore";
import { computed, onMounted, toRef, watch } from "vue";

onMounted(() => {
	cartStore.getUserCart();
	productStore.fetchProducts();
});

const cartStore = useCartStore();
const productStore = useProductStore();

const cartItems = toRef(cartStore, "cartItems");
const productList = computed(() => productStore.products);

watch(() => cartStore.cartItems, (newVal) => {
	// console.log("Item quantity", newVal[0].quantity);
}, { deep: true });

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

const handleAddQuantity = async (productId, currentQuantity) => {
	
	await cartStore.updateQuantity( productId, currentQuantity + 1 );
}

const handleSubtractQuantity = async (productId, currentQuantity) => {
	if (currentQuantity <= 1) return;

	await cartStore.updateQuantity(productId, currentQuantity - 1);
}

const handleRemove = async (productId, productName) => {
	try {
		productStore.loading = true
		await cartStore.removeFromCart(productId)

	} catch (err) {
		console.log("Failed to removed", productName);
	} finally {
		productStore.loading = false
	}
}

const handleClear = async () => {
	productStore.loading = true
	console.log(cartItems.length);
	try {
		await cartStore.clearCart()
	} catch (err) {
		console.log("Failed to removed", err);
	} finally {
		productStore.loading = false
	}
}
</script>

<template>
	<section class="col-lg-8">
		<div class="mb-3 border p-2 rounded d-flex align-items-center justify-content-between">
			<h6 class="ms-3 my-2">TOTAL ITEMS ({{ cartItems.length }}) </h6>
			<button @click="handleClear" class="btn btn-outline-danger" v-if="cartItems.length" >Clear cart</button>
			<button @click="handleClear" class="btn btn-outline-danger" v-else="!cartItems.length" disabled>Clear cart</button>
		</div>
		
		<!-- Loading -->
		<div
			class="text-center my-5"
			v-if="productStore.loading"
		>
			<div class="spinner-border m-3 text-warning"></div>
			<p>Loading...</p>
		</div>

		<!-- "CART-LIST" {{ cartItems }}  -->
		<!-- <br />---------------------------- <br /> -->
		<!-- "PROD-LIST" {{ productList }} -->
		 
		<div v-if="!cartItems.length"	class="card p-5 mb-3 text-center justify-content-center"> No items in your cart </div>

		<!-- ************************************************* -->
		<div
			v-else="cartItems.length"
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
							style="width: 120px; height: 100px; object-fit: cover"
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
								<button @click="(() => handleSubtractQuantity(item.productId, item.quantity))" class="btn btn-outline-secondary btn-sm me-2"> − </button>
								<div>
									<!-- {{  item }} <br> -->
									<span>{{ item.quantity }}</span>
								</div>
								<button @click="handleAddQuantity(item.productId, item.quantity)" class="btn btn-outline-secondary btn-sm ms-2"> + </button>
							</div>
							
						</div>
					</div>

					<!-- Price -->
					<div id="product-price" class="text-end ms-4">
						<p class="fs-5 fw-bold">₱{{ item.product.price }}</p>
						<div class="d-flex gap-1 justify-content-end">
							
							<button class="custom-btn-icon"><i class="bi bi-heart"></i></button>
							<button 
								@click="handleRemove(item.productId, item.product.name)" 
								class="custom-btn-icon">
								<i class="bi bi-trash"></i>
							</button>
						</div>
					</div>
				</div>
				
			</div>
		</div>
		
	</section>
</template>

<style scoped>
.custom-btn-icon {
	border: none;
	border-radius: 4px;
	background-color: transparent;
}
.custom-btn-icon:hover {
	color: rgb(235, 68, 68);
}
</style>
