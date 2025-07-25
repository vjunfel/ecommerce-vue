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
    <!-- Dashboard Header -->
    <h1 class="my-5 pt-3 text-center text-white fw-bold bg-primary p-3 rounded shadow-sm">
      Admin Dashboard
    </h1>

    <!-- Top Action Buttons -->
    <section class="mb-3 text-center">
      <button class="btn btn-primary m-3 px-4 py-2 shadow-sm" @click="goToAddProduct">
        Add Product
      </button>
      <button class="btn btn-primary m-3 px-4 py-2 shadow-sm" @click="goToUserOrders">
        Show User Orders
      </button>
    </section>

    <!-- Products Table -->
    <section class="container">
      <table class="table table-bordered border-primary mt-3 shadow-sm">
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
          <tr v-for="product in products" :key="product._id">
            <td>{{ product.name }}</td>
            <td>{{ product.description }}</td>
            <td>₱{{ product.price.toFixed(2) }}</td>
            <td>
              <span :class="product.isActive ? 'text-white fw-bold bg-primary px-2 py-1 rounded' : 'text-primary fw-bold bg-light px-2 py-1 rounded'">
                {{ product.isActive ? 'Active' : 'Not Available' }}
              </span>
            </td>
            <td>
              <div class="d-flex flex-column flex-md-row justify-content-center align-items-center gap-2">
                <button class="btn btn-warning btn-sm shadow-sm px-3" @click="updateProduct(product._id)">
                  Update
                </button>
                <button
                  class="btn btn-sm shadow-sm px-3"
                  :class="product.isActive ? 'btn-danger' : 'btn-success'"
                  @click="toggleAvailability(product)"
                >
                  {{ product.isActive ? 'Disable' : 'Enable' }}
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
.bg-primary {
  background-color: #0d6efd;
}

.border-primary {
  border-color: #0d6efd !important;
}

.table-primary {
  background-color: #0d6efd;
}

.btn-primary {
  background-color: #0d6efd;
  border: none;
  color: #fff;
}

.text-primary {
  color: #0d6efd !important;
}

.btn-warning {
  background-color: #ffc107;
  border: none;
  color: #212529;
}
</style>
