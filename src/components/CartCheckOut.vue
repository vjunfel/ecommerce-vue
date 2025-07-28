<script setup>
import { useCartStore } from '@/stores/cartStore';
import { useProductStore } from '@/stores/productStore';
import { computed, onMounted, toRef } from 'vue';
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router';

onMounted(() => {
	cartStore.getUserCart();
	productStore.fetchProducts();
});

const router = useRouter();
const cartStore = useCartStore();
const productStore = useProductStore();

const handleCheckout = async (items) => {
	try {
		const orderPayload = {
			items: items.map(item => ({
				productId: item.productId,
				// quantity: item.quantity,
			})),
			
			// totalAmount: cartStore.totalPrice + cartStore.shippingFee,
			// shippingFee: cartStore.shippingFee,
			// selectedItems: cartStore.selectedItems,
			// Optional: add user info or address if available
		};
		
		await cartStore.chekoutCartItems(orderPayload)

			// alert('Checkout successful!');
			Swal.fire(`Order`, 'Submitted successfully!', 'success');

		// Optionally clear the cart
		// cartStore.clearCart();
		
		// router.push("/user-orders");

	} catch (error) {
		console.error('Checkout failed:', error);
		alert('Checkout failed. Please try again.');
	}
};


</script>

<template>
	<section class="col-lg-4">
		<div class="card p-3">
			<h5>Order Summary</h5>
			<div class="d-flex justify-content-between">
				<span>Subtotal ({{ cartStore.selectedItems }} items)</span>
				<span >₱{{ cartStore.totalPrice }}</span>
			</div>
			<div class="d-flex justify-content-between">
				<span>Shipping Fee</span>
				<span v-if="cartStore.cartItems.length">₱{{ cartStore.shippingFee }}</span>
				<span v-else>₱0</span>
			</div>

			<div class="input-group my-3">
				<input
					type="text"
					class="form-control"
					placeholder="Enter Voucher Code"
				/>
				<button class="btn btn-dark">APPLY</button>
			</div>

			<div class="d-flex justify-content-between fw-bold mb-2">
				<span>Total</span>
				<span class="text-dark" v-if="cartStore.cartItems.length">₱{{ cartStore.totalPrice + cartStore.shippingFee}}</span>
				<span class="text-dark" v-else>₱{{ cartStore.totalPrice}}</span>
			</div>
			<small class="text-muted">VAT included, where applicable</small>

			<!-- <div
				class="card p-3 mb-3"
				v-for="item in cartWithProducts"
				:key="item.productId"
			> -->
			<button @click="handleCheckout(cartStore.cartItems)" class="btn btn-warning w-100 my-3">
				PROCEED TO CHECKOUT
			</button>
		<!-- </div> -->
		</div>
	</section>
</template>
