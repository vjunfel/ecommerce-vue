<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import axios from "axios";

const router = useRouter();
const products = ref([]);

const fetchAllProducts = async () => {
	try {
		const token = localStorage.getItem("token");
		const res = await axios.get("https://vvro2vmufk.execute-api.us-west-2.amazonaws.com/production/products/all",
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		products.value = res.data;
	} catch (error) {
		console.error("Error getting the product!", error);
	}
};

onMounted(
		fetchAllProducts
);

const goToUserOrders = () => {
  router.push("/orders");
};

const goToAddProduct = () => {
	router.push("/add-product");
};

const updateProduct = (id) => {
	console.log("PRODUCT ID: ", id);
	router.push({ name: "UpdateProduct", params: { id } });
};

const toggleAvailability = async (product) => {
	const action = product.isActive ? "archive" : "activate";

	try {   
		const token = localStorage.getItem("token");
		const res = await axios.patch(`https://vvro2vmufk.execute-api.us-west-2.amazonaws.com/production/products/${product._id}/${action}`, 
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		console.log(res);
		if (res.status !== 200) {
			
			Swal.fire("", `Product ${product.isActive ? "disabled" : "enabled"} successfully!`, "success");
			return;
		} 
    
		Swal.fire("", `Product ${product.isActive ? "disabled" : "enabled"} successfully!`, "success");
		await fetchAllProducts();
		
		router.push("/dashboard");
    
	} catch (error) {
		console.error(`Failed to ${action} product`, error);
		alert(`Failed to ${action} product.`);
	}
};
</script>

<template>
	<div class="container mt-4 p-1">
		<div class="mb-4 p-2 text-center">
			<button @click="goToAddProduct" class="btn btn-custom-outline mx-2">
        <i class="bi bi-cake2"></i>
				<span class="ms-2">Add Product</span>
			</button>
			<button @click="goToUserOrders" class="btn btn-custom-dark mx-2">
        <i class="bi bi-cart-check"></i>
        <span class="ms-2">Show User Orders</span>
			</button>
		</div>

		<!-- Products Table -->
		<section>
			<table class="table table-bordered border-secondary mt-3 shadow-sm">
				<thead class="table-primary text-white text-center">
					<tr>
						<th>Name</th>
						<th>Description</th>
						<th>Price</th>
						<th>Availability</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="product in products"
						:key="product._id"
					>
						<td class="text-nowrap">{{ product.name }}</td>
						<td>{{ product.description }}</td>
						<td class="text-end">₱{{ product.price.toFixed(2) }}</td>
						<td class="text-center">
							<span
								:class="
									product.isActive
										? 'text-success'
										: 'text-danger text-nowrap px-1'
								"
							>
								{{ product.isActive ? "Active" : "Not Available" }}
							</span>
						</td>
						<td>
							<div class="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
								<button
									class="btn-custom-outline-sm btn"
									@click="updateProduct(product._id)"
								>
									Update
								</button>
								<button
                  style="width: 70px;"
									class="btn btn-sm shadow-sm"
									:class="
										product.isActive ? 'btn-secondary' : 'btn-success'
									"
									@click="toggleAvailability(product)"
								>
									{{ product.isActive ? "Disable" : "Enable" }}
								</button>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</section>
	</div>
</template>

<style scoped>
.btn-custom-dark {
  background-color: #333;
  color: white;
  padding: 8px 1.2rem;
  text-align: center;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 400;
  outline: 1px solid;
  transition: background-color 0.2s ease;
}
.btn-custom-dark:hover {
  background-color: hsl(46, 100%, 55%);
  color: #333;
  outline: 1px solid hsl(46, 100%, 55%);;
  text-align: center;
  border-radius: 5px;
}

.btn-custom-outline {
  background-color: #fff;
  color: #333;
  outline: 1px solid;
  padding: 8px 1.2rem;
  text-align: center;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 400;
  
  transition: background-color 0.2s ease;
}
.btn-custom-outline:hover {
  background-color: hsl(46, 100%, 55%);
  color: #333;
  outline: 1px solid hsl(46, 100%, 55%);;
  text-align: center;
  border-radius: 5px;
}

.btn-custom-outline-sm {
  background-color: #fff;
  color: #333;
  padding: 2px 8px;
  text-align: center;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 400;
  box-shadow: 0 0 4px rgba(0, 0, 0, .3);
  transition: background-color 0.1s ease;
}
.btn-custom-outline-sm:hover {
  background-color: hsl(46, 100%, 55%);
  color: #333;
  outline: 1px solid hsl(46, 100%, 55%);;
  text-align: center;
  border-radius: 5px;
}
</style>
