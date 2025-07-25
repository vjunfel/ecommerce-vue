
<script setup>
 import { ref } from 'vue'
 import axios from 'axios'
 import { useRouter } from 'vue-router'

 const router = useRouter()

 // Gamitin para ma-bind sa form
 const product = ref({
   name: '',
   description: '',
   price: 0
 })

 const submitProduct = async () => {
   console.log('Product Submitted', product.value)

   const token = localStorage.getItem('token')

   try {
     await axios.post('http://localhost:4000/products', product.value, {
       headers: {
         Authorization: `Bearer ${token}`
       }
     })

     alert('Product added successfully')

     product.value = {
       name: '',
       description: '',
       price: 0
     }

     router.push('/dashboard') // balik sa dashboard

   } catch (error) {
     console.error('Error adding product:', error)
     alert('Failed to add product. Check console.')
   }
 }



</script>

<template>
  <div class="container my-5 d-flex justify-content-center text-primary">
    <div class="card shadow-lg rounded-4 p-4 w-100" style="max-width: 640px;">
      <!-- Header -->
      <h2 class="text-center mb-4 fw-bold bg-primary text-white py-3 rounded-4 shadow-sm">
        🛒 Add New Product
      </h2>

      <!-- Form -->
      <form @submit.prevent="submitProduct">
        <!-- Product Name -->
        <div class="mb-3">
          <label for="name" class="form-label fw-semibold">Product Name</label>
          <input
            v-model="product.name"
            type="text"
            id="name"
            class="form-control rounded-pill px-3 py-2 shadow-sm"
            placeholder="Enter product name"
            required
          />
        </div>

        <!-- Description -->
        <div class="mb-3">
          <label for="description" class="form-label fw-semibold">Description</label>
          <textarea
            v-model="product.description"
            id="description"
            class="form-control rounded-3 px-3 py-2 shadow-sm"
            rows="3"
            placeholder="Describe the product..."
            required
          ></textarea>
        </div>

        <!-- Price -->
        <div class="mb-3">
          <label for="price" class="form-label fw-semibold">Price (₱)</label>
          <input
            v-model.number="product.price"
            type="number"
            id="price"
            class="form-control rounded-pill px-3 py-2 shadow-sm"
            min="1"
            placeholder="Enter product price"
            required
          />
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn btn-warning w-100 py-2 fw-bold rounded-pill shadow-sm mt-4">
          Add Product
        </button>
      </form>
    </div>
  </div>
</template>
