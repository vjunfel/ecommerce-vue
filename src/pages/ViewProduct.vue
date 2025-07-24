<script setup>
import { onBeforeMount, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../api";
import { useGlobalStore } from "../stores/global";
import { Notyf } from "notyf";

const notyf = new Notyf();
const { user } = useGlobalStore();
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

	let { data } = await api.get(`/products/specific/${route.params.id}`);
	product.data = data;
});
</script>

<template>
	<div class="container">
		<nav
			class="my-3"
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
					class="img-fluid rounded"
					:src="`https://placehold.co/600x400/63c3ff/ffffff?font=raleway&text=${encodeURIComponent(
						product.data.name
					)}`"
				/>
			</div>
			<div class="col-12 col-md-6">
				<div class="d-flex gap-2 text-primary">
					<h1 class="bi bi-mortarboard"></h1>
					<h1 class="mb-3">{{ product.data.name }}</h1>
				</div>
				<h6>Product Description:</h6>
				<p class="text-muted">
					{{ product.data.description }}
				</p>
				<p>Price: PHP {{ product.data.price }}</p>
				<button	class="btn btn-primary"	type="button"
        	v-if="user.email && !user.isAdmin"
					@click="handleEnroll"
				>
					Enroll
				</button>

				<button	class="btn btn-primary"	type="button"
					v-if="user.email && user.isAdmin" disabled
				>
					Admin are not allowed to enroll
				</button>

				<router-link to="/login" class="btn btn-outline-danger"	type="button"
					v-if="!user.email"
				>
          Login to Enroll
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
