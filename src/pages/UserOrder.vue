<script setup>
import { onMounted, ref, computed } from 'vue'
import axios from 'axios'

const orders = ref([])
const loading = ref(true)
const searchOrderId = ref('') // 🔍 Search Order ID

// Fetch orders on mount
onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get('http://localhost:4000/orders/all-orders', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    orders.value = res.data.orders
  } catch (error) {
    console.error('Failed to fetch orders', error)
  } finally {
    loading.value = false
  }
})


const filteredOrders = computed(() => {
  if (!searchOrderId.value.trim()) return orders.value

  return orders.value.filter(order =>
    order._id.includes(searchOrderId.value.trim())
  )
})
</script>

<template>
  <div class="container mt-5 text-primary">
    <h2 class="text-center mb-4 ">User Orders</h2>

 
    <div class="mb-4 text-center">
      <input
        v-model="searchOrderId"
        type="text"
        class="form-control w-50 d-inline-block"
        placeholder="Search by Order ID..."
      />
    </div>


    <div v-if="loading">Loading...</div>


    <table v-else class="table table-bordered table-striped text-center align-middle">
      <thead class="table-primary">
        <tr>
          <th>Order ID</th>
          <th>User Name</th>
          <th>Products</th>
          <th>Quantities</th>
          <th>Total Price</th>
          <th>Order Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in filteredOrders" :key="order._id">
          <td>{{ order._id }}</td>
          <td>{{ order.userId?.name || 'N/A' }}</td>
          <td>
            <ul class="list-unstyled mb-0">
              <li v-for="item in order.productsOrdered" :key="item.productId?._id">
                {{ item.productId?.name || 'Unknown Product' }}
              </li>
            </ul>
          </td>
          <td>
            <ul class="list-unstyled mb-0">
              <li v-for="item in order.productsOrdered" :key="item.productId?._id">
                {{ item.quantity }}
              </li>
            </ul>
          </td>
          <td>₱{{ order.totalPrice.toFixed(2) }}</td>
          <td>{{ new Date(order.orderedOn).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
