<script setup>
import { computed, onMounted, ref } from "vue";
import { useCartStore } from "@/stores/cartStore";
import { useProductStore } from "@/stores/productStore";
import CartItemComponent from "@/components/CartItemComponent.vue";
import CartCheckOut from "@/components/CartCheckOut.vue";

const cart = useCartStore();
const productStore = useProductStore();

onMounted(() => {
	cart.getUserCart();
	productStore.fetchActiveProducts()
});

const totalPrice = computed(() => cart.cart?.totalPrice || 0);
</script>

<template>
	<section class="container p-5 rounded">
		<h1 class="text-center text-warning pb-4">Cart Details</h1>

		<div class="row my-2">
			<CartItemComponent />
			<CartCheckOut />
		</div>
	</section>
</template>
