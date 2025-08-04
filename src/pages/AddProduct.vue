<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const router = useRouter();

const product = ref({
	name: "",
	description: "",
	price: 0,
});

const submitProduct = async () => {
	console.log("Product Submitted", product.value);
	
	
	try {
		const token = localStorage.getItem("token");
		const response = await axios.post("https://vvro2vmufk.execute-api.us-west-2.amazonaws.com/production/products/", 
			product.value, 
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		console.log(response);
		
		if (response.status !== 201) {
			Swal.fire("Product", "Failed to Add ", "error");
		}
		
		if (response.status === 201) {
			Swal.fire("Product", "Added successfully", "success");

			product.value = {
				name: "",
				description: "",
				price: 0,
			};

			router.push("/dashboard");
		}
		
	} catch (error) {
		console.error("Error adding product:", error);
		alert("Failed to add product. Check console.");
	}
};
</script>

<template>
	<div class="container my-5 d-flex justify-content-center">
		<div
			class="card shadow-lg p-4 w-100"
			style="max-width: 600px"
		>
			<h2 class="text-center text-warning mb-4">Add New Product</h2>

			<form @submit.prevent="submitProduct">
				<div class="mb-3">
					<label
						for="name"
						class="form-label fw-bold"
						>Product Name</label
					>
					<input
						v-model="product.name"
						type="text"
						id="name"
						class="form-control"
						placeholder="Enter product name"
						required
					/>
				</div>

				<div class="mb-3">
					<label
						for="description"
						class="form-label fw-bold"
						>Description</label
					>
					<textarea
						v-model="product.description"
						id="description"
						class="form-control"
						rows="3"
						placeholder="Describe the product..."
						required
					></textarea>
				</div>

				<div class="mb-3">
					<label
						for="price"
						class="form-label fw-bold"
						>Price (₱)</label
					>
					<input
						v-model.number="product.price"
						type="number"
						id="price"
						class="form-control"
						placeholder="Enter product price"
						min="1"
						required
					/>
				</div>

				<button
					type="submit"
					class="btn btn-warning w-100 mt-4"
				>
					Add Product
				</button>
			</form>
		</div>
	</div>
</template>
