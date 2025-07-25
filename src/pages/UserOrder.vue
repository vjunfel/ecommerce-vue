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
    <!-- Page Title -->
    <h2 class="text-center mb-4 fw-semibold bg-primary text-white py-3 rounded shadow-sm">
      User Orders
    </h2>

    <!-- Search Input + Button -->
    <div class="mb-4 text-center">
      <div class="input-group w-50 d-inline-flex justify-content-center">
        <input
          v-model="searchOrderId"
          type="text"
          class="form-control rounded-start-pill px-4 py-2 border-warning shadow-sm"
          placeholder="Search by Order ID..."
        />
        <button class="btn btn-warning rounded-end-pill px-4" @click="triggerSearch">
          Search
        </button>
      </div>
    </div>

    <!-- Loading Indicator -->
    <div v-if="loading" class="text-center text-muted fs-5">Loading...</div>

    <!-- Orders Table -->
    <table v-else class="table table-bordered border-primary table-striped text-center align-middle shadow-sm">
      <thead class="table-primary text-white">
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
                🍰 {{ item.productId?.name || 'Unknown Product' }}
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
          <td class="fw-bold">₱{{ order.totalPrice.toFixed(2) }}</td>
          <td>{{ new Date(order.orderedOn).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchOrderId: '',
      loading: false,
      orders: [], // original orders array
    };
  },
  computed: {
    filteredOrders() {
      if (!this.searchOrderId) return this.orders;
      return this.orders.filter(order =>
        order._id.toLowerCase().includes(this.searchOrderId.toLowerCase())
      );
    },
  },
  methods: {
    triggerSearch() {
      // You can add custom logic here if needed
      console.log("Searching for:", this.searchOrderId);
    },
  },
};
</script>
