<script setup>
	import {ref} from 'vue'
	import { useRouter } from 'vue-router'

	const router = useRouter()

	const products = ref ([
		{
			_id: '1',
			name: 'Fluppy Cake Japanesse',
			description: 'is a cake with a fluppy feelinng when you bite it everytime',
			price: '1400',
			isActive: true
		},
		{
			_id: '1',
			name: 'Matcha Japanesse Cake',
			description: 'is a cake with a matcha feelinng when you bite it everytime',
			price: '900',
			isActive: false
		}
	])

	const goToAddProduct = () => {
		router.push('/add-product')
	}

	const toggleAvailability = (product) => {
		product.isActive = !product.isActive
	}

	const updateProduct =(id) => {
		alert(`Update form for product ID: ${ID} (feature no yet implemented)`)
	}
</script>

<template>
  <div class="container mt-4">
    <h1 class="my-5 pt-3 text-primary text-center">Admin Dashboard</h1>
    
    <section class="mb-3 text-center">
      <button class="btn btn-primary m-3">Add Product</button>
      <button class="btn btn-success m-3">Show User Orders</button>
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
