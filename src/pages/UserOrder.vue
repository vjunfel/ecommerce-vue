<template>
  <div class="container mt-5">
    <h2 class="text-center text-primary mb-4">User Orders</h2>

    <!-- Search by Order ID -->
    <div class="mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by Order ID"
        class="form-control"
      />
    </div>

    <div v-if="filteredOrders.length === 0" class="alert alert-info text-center">
      No matching orders found.
    </div>

    <table v-else class="table table-striped border">
      <thead class="table-dark text-center">
        <tr>
          <th>Order ID</th>
          <th>User</th>
          <th>Product</th>
          <th>Quantity</th>
          <th>Total Price</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in filteredOrders" :key="order._id">
          <td>{{ order._id }}</td>
          <td>{{ order.userName }}</td>
          <td>{{ order.productName }}</td>
          <td>{{ order.quantity }}</td>
          <td>₱{{ order.total }}</td>
          <td>
            <span :class="order.status === 'Completed' ? 'text-success' : 'text-warning'">
              {{ order.status }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const searchQuery = ref('')

const orders = ref([])

// Simulated orders — replace with API later
onMounted(() => {
  orders.value = [
    {
      _id: 'ORD1001',
      userName: 'Juan Dela Cruz',
      productName: 'Matcha Cake',
      quantity: 2,
      total: 1800,
      status: 'Completed'
    },
    {
      _id: 'ORD1002',
      userName: 'Maria Clara',
      productName: 'Fluppy Cake',
      quantity: 1,
      total: 1400,
      status: 'Pending'
    },
    {
      _id: 'ORD1003',
      userName: 'Jose Rizal',
      productName: 'Ube Cheesecake',
      quantity: 3,
      total: 2100,
      status: 'Completed'
    }
  ]
})

const filteredOrders = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return orders.value.filter(order =>
    order._id.toLowerCase().includes(query)
  )
})
</script>
