<script setup>
import { onBeforeMount, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../api";
import { useUserStore } from "../stores/userStore";
import { Notyf } from "notyf";

const notyf = new Notyf();
const userStore = useUserStore();
const router = useRouter();
const product = reactive({ data: null });

async function handleEnroll() {
	let { data } = await api.post(`/enrollments/enroll`, {
		enrolledProducts: [
			{
				productId: product.data._id,
			},
		],
		totalPrice: product.data.price,
	});

	if (data.success === true) {
		notyf.success("Product Enrolled");
		router.push({ path: "/products" });
	} else {
		notyf.error("Enrollment Failed");
	}
}

onBeforeMount(async () => {
	const route = useRoute();

	let { data } = await api.get(`/products/${route.params.id}`);
	product.data = data;
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
					style="height: 300px; object-fit: contain;"
					class="card-img-top img-fluid"
					:src="product.data.src ? product.data.src : `https://placehold.co/600x400/63c3ff/ffffff?font=raleway&text=${encodeURIComponent(productData.name)}`"
					:alt="product.data.name"
				>
				
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
				<p class="my-4 d-flex align-items-center">Price: <span class="fs-3 fw-bold ms-2">{{ product.data.price }} PHP</span></p>
				<button	class="btn btn-warning"	type="button"
        	v-if="userStore.email && !userStore.isAdmin"
					@click="handleEnroll"
				>
					Add to Cart
				</button>
				
				<button	class="btn btn-warning"	type="button"
					v-if="userStore.email && userStore.isAdmin" disabled
				>
					Admin not allowed
				</button>

				<router-link to="/login" class="btn btn-outline-danger"	type="button"
					v-if="!userStore.email"
				>
          Login to buy
        </router-link
				>
			</div>
		</div>

		<div
			class="text-center my-5"
			v-if="!product.data"
		>
			<div class="spinner-grow"></div>
		</div>
	</div>
</template>
