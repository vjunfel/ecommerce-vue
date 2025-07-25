<script setup>
	import {ref, onMounted} from 'vue'
  import axios from 'axios'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const products = ref([])

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get ('http://localhost:4000/products/all',{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      products.value = res.data
    } catch (error) {
      console.error ('Error getting the product!', error)
    }
  }
  onMounted(fetchProducts)

  const goToAddProduct = () => {
    router.push('/add-product')
  }

  const updateProduct = (id) => {
    router.push({ name: 'UpdateProduct', params: { id } })
  }

  const toggleAvailability = async (product) => {
    const token = localStorage.getItem('token')
    const action = product.isActive ? 'archive' : 'activate'

    try {
      await axios.patch ( `http://localhost:4000/products/${product._id}/${action}`, {},
      {

        headers: {
          Authorization: `Bearer ${token}`
        }

      }

      )
       alert(`Product ${product.isActive ? 'disabled' : 'enabled'} successfully!`)
    await fetchProducts()
    } catch (error) {
      console.error(`Failed to ${action} product`, error)
      alert(`Failed to ${action} product.`)
    }
  }

  const goToUserOrders = () => {
    router.push('/user-orders')
  }

</script>

<template>
  <div class="container mt-4">
    <h1 class="my-5 pt-3 text-primary text-center">Admin Dashboard</h1>
    
    <section class="mb-3 text-center">
      <button class="btn btn-primary m-3" @click="goToAddProduct">Add Product</button>
      <button class="btn btn-success m-3" @click="goToUserOrders">Show User Orders</button>
    </section>

    <section class="container">
      <table class="table table-striped border mt-3">
        <thead class="text-center table-dark">
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Availability</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product._id">
            <td>{{ product.name }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.price }}</td>
            <td>
              <span :class="product.isActive ? 'text-success' : 'text-danger'">
                {{ product.isActive ? 'Active' : 'Not Available' }}
              </span>
            </td>
            <td>
              <button class="btn btn-primary btn-sm me-2" @click="updateProduct(product._id)">
                Update
              </button>
              <button
                class="btn btn-sm"
                :class="product.isActive ? 'btn-danger' : 'btn-success'"
                @click="toggleAvailability(product)"
              >
                {{ product.isActive ? 'Disable' : 'Enable' }}
              </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</div>
</template>
