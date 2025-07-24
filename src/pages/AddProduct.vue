<script setup>
import { ref, onBeforeMount, watch } from "vue";
import { Notyf } from "notyf";
import { useRouter } from "vue-router";
import { useGlobalStore } from "../stores/global";
import api from "../api";

const notyf = new Notyf();
const router = useRouter();
const { user } = useGlobalStore();

const name = ref("");
const description = ref("");
const price = ref(0);
const isEnabled = ref(false);

async function handleSubmit() {
	const product = {
		name: name.value,
		description: description.value,
		price: price.value,
	};

	try {
		const response = await api.post("/products", product);

		if (response.status === 201) {
			notyf.success(response.data.message);

			router.push({ path: "/products" });
		} else {
			notyf.error(response.data.message);
		}
	} catch (error) {
		if (error.response.status === 409) {
			notyf.error(error.response.data.message);
		} else {
			console.error(error.response.data.message);
			notyf.error("Error adding product. Please contact administrator.");
		}
	}
}

watch([name, description, price], (currentValue, oldValue) => {
	if (currentValue.every((input) => input !== "")) {
		isEnabled.value = true;
	} else {
		isEnabled.value = false;
	}
});

onBeforeMount(() => {
	if (!user.token || !user.isAdmin) {
		router.push({ path: "/products" });
	}
});
</script>

<template>
	<div
		class="container my-5"
		style="max-width: 500px"
	>
		<h1 class="text-center">Add New Product</h1>
		<form v-on:submit.prevent="handleSubmit">
			<div class="mb-3">
				<label
					for="productNameInput"
					class="form-label"
					>Product Name</label
				>
				<input
					type="text"
					class="form-control"
					id="productNameInput"
					v-model="name"
				/>
			</div>
			<div class="mb-3">
				<label
					for="productDescription"
					class="form-label"
					>Description</label
				>
				<textarea
					class="form-control"
					id="productDescription"
					v-model="description"
					rows="5"
				></textarea>
			</div>
			<div class="mb-3">
				<label
					for="productPrice"
					class="form-label"
					>Price</label
				>
				<input
					type="number"
					class="form-control"
					id="productPrice"
					v-model="price"
				/>
			</div>
			<button
				type="submit"
				class="btn btn-primary"
				v-if="isEnabled"
			>
				Add Product
			</button>
			<button
				type="submit"
				class="btn btn-danger"
				disabled
				v-else
			>
				Add Product
			</button>
		</form>
	</div>
</template>