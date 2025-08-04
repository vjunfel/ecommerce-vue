<script setup>
import axios from "axios";
import { onMounted, ref, computed, reactive } from "vue";

const orders = ref([]);
const loading = ref(true);
const searchOrderId = ref("");

const products = reactive({ data: null });

onMounted(async () => {
	try {
		const token = localStorage.getItem("token");
		const res = await axios.get("https://vvro2vmufk.execute-api.us-west-2.amazonaws.com/production/orders/my-orders",
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		orders.value = res.data.orders;

		const productsData = await axios.get("https://vvro2vmufk.execute-api.us-west-2.amazonaws.com/production/products/active",
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		products.data = productsData.data;

	} catch (error) {
		console.error("Failed to fetch orders", error);
	} finally {
		loading.value = false;
	}
});

const filteredOrders = computed(() => {
	if (!searchOrderId.value.trim()) return orders.value;

	return orders.value.filter((order) =>
		order._id.includes(searchOrderId.value.trim())
	);
});
</script>

<template>
	<div class="d-flex flex-column flex-md-row justify-content-between align-items-center my-4 px-2">
		<!-- Page Title -->
		<h1 class="text-center text-md-start text-warning text-nowrap mt-2 p-2 w-100">Orders List</h1>

		<!-- Search Input + Button -->
		<div class="text-end w-100 w-md-100 ">
			<div class="input-group d-inline-flex justify-content-center">
				<input
					v-model="searchOrderId"
					type="text"
					class="form-control rounded-start-pill py-2 border-warning shadow-sm"
					placeholder="Search by Order ID..."
				/>
				<button class="btn btn-warning d-inline-flex rounded-end-pill">
					Search
				</button>
			</div>
		</div>
	</div>

	<!-- Loading Indicator -->
	<div
		v-if="loading"
		class="text-center text-muted fs-5"
	>
		Loading...
	</div>

	<!-- Orders Table -->
	<table
		v-else
		class="table table-bordered border-primary table-striped text-center align-middle shadow-sm"
	>
		<thead class="table-primary text-white">
			<tr>
				<th>Order ID</th>
				<th>Product ID</th>
				<th>Products</th>
				<th>Quantities</th>
				<th>Total Price</th>
				<th>Order Date</th>
				<th>Status</th>
			</tr>
		</thead>
		<tbody>
			<tr
				v-for="order in filteredOrders"
				:key="order._id"
			>
				<td class="text-start">{{ order._id }}</td>
				<td class="text-start">
					<ul class="list-unstyled mb-0">
						<li
								v-for="item in order.productsOrdered"
								:key="item.productId"
								class="p-1 text-start"
							>
								{{ item.productId._id || "Unknown Product" }}
							</li>
						</ul>
				</td>

				<!-- Product Names -->
				<td>
					<ul class="list-unstyled mb-0">
						<li
							v-for="item in order.productsOrdered"
							:key="item.productId"
							class="p-1 text-start"
						>
							{{
								products.data.find(
									(prod) => prod._id === item.productId._id
								)?.name || "Unknown Product"
							}}
						</li>
					</ul>
				</td>

				<td>
					<ul class="list-unstyled mb-0">
						<li
							v-for="item in order.productsOrdered"
							:key="item.productId"
						>
							{{ item.quantity }}
						</li>
					</ul>
				</td>
        
				<td class="text-end pe-3">₱{{ order.totalPrice.toFixed(2) }}</td>
				<td class="text-start">{{ new Date(order.orderedOn).toLocaleString() }}</td>
        <td
          class="fw-semibold"
          :class="{
            'text-secondary': order.status === 'Pending',
            'text-primary': order.status === 'Processing',
            'text-danger': order.status === 'Cancelled',
            'text-warning': order.status === 'Shipped',
            'text-success': order.status === 'Delivered'
          }"
        >
          {{ order.status }}
        </td>
      </tr>
		</tbody>
	</table>
</template>
