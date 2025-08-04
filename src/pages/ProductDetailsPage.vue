<script setup>
import { onBeforeMount, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";
import { Notyf } from "notyf";

import imgSource from "@/assets/images/Image-placeholder.jpg";
import axios from "axios";

const notyf = new Notyf();
const userStore = useUserStore();
const router = useRouter();
const product = reactive({ data: null });

async function handleAddToCart() {
	console.log("PRODUCT ID:", product.data._id);
	console.log("USER ID:", userStore.id);
	try {
		if (!product.data || !product.data._id) {
			notyf.error("Product is not ready yet.");
			return;
		}
		
		const token = localStorage.getItem("token");

		const res = await axios.post("https://vvro2vmufk.execute-api.us-west-2.amazonaws.com/production/cart/add-to-cart", {
			userId: userStore.id,
			productId: product.data._id,
			quantity: 1,
		},
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

		console.log("CART DATA:", res.data);
		console.log("DATA:", res);

		if (res.status === 201) {
			notyf.success("Product added to Cart");
			router.push({ path: "/products" });
		} else {
			notyf.error("Adding Failed");
		}
	} catch (error) {
		console.error("Add to cart failed:", error);
		notyf.error("Unable to add to cart. Please try again.");
	}
}

onBeforeMount(async () => {
	try {
		const route = useRoute();
		const token = localStorage.getItem("token");

		const { data } = await axios.get(
			`https://vvro2vmufk.execute-api.us-west-2.amazonaws.com/production/products/${route.params.id}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		product.data = data;
	} catch (error) {
		console.error("Failed to load product:", error);
		notyf.error("Product not found");
		router.push("/products");
	}
});
</script>

<template>
	<div class="container">
		<nav
			class="my-5"
			aria-label="breadcrumb"
		>
			<ol class="breadcrumb">
				<li class="breadcrumb-item">
					<router-link to="/products">Products</router-link>
				</li>
				<li
					class="breadcrumb-item active"
					aria-current="page"
				>
					{{ product.data ? product.data.name : "..." }}
				</li>
			</ol>
		</nav>
		<div
			class="row mx-auto my-3 gap-4 gap-md-0"
			v-if="product.data"
		>
			<div class="col-12 col-md-6">
				<img
					style="height: 500px; object-fit: contain"
					class="card-img-top img-fluid"
					:src="
						product.data && product.data.src
							? product.data.src
							: imgSource
					"
					:alt="product?.data?.name || 'CapCakes product image'"
				/>
			</div>
			<div class="col-12 col-md-6">
				<div class="d-flex gap-2 text-dark">
					<h1 class="bi bi-cake2"></h1>
					<h1 class="mb-3 ms-2">{{ product.data.name }}</h1>
				</div>
				<h6>Product Description:</h6>
				<p class="text-muted">
					{{ product.data.description }}
				</p>
				<p class="my-4 d-flex align-items-center">
					Price:
					<span class="fs-3 fw-bold ms-2"
						>{{ product.data.price }} PHP</span
					>
				</p>
				<button
					class="btn btn-warning"
					type="button"
					v-if="
						userStore.email && !userStore.isAdmin && product.data.isActive
					"
					@click="handleAddToCart"
				>
					Add to Cart
				</button>
				<button
					class="btn btn-warning"
					type="button"
					v-else-if="userStore.email && !userStore.isAdmin"
					disabled
				>
					Not Available
				</button>

				<button
					class="btn btn-warning"
					type="button"
					v-else-if="userStore.email && userStore.isAdmin"
					disabled
				>
					Admin not allowed
				</button>

				<router-link
					to="/login"
					class="btn btn-outline-danger"
					type="button"
					v-if="!userStore.email"
				>
					Login to buy
				</router-link>
			</div>
		</div>

		<div
			class="text-center my-5"
			v-if="!product.data"
		>
			<div class="spinner-border m-3"></div>
			<p>Loading...</p>
		</div>
	</div>
</template>
