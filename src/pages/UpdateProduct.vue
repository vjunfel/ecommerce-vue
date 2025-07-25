<script setup>
  import axios from 'axios'
  import {ref, onMounted} from 'vue'
  import { useRoute, useRouter } from 'vue-router'


  const route = useRoute()
  const router = useRouter()

  const productId = route.params.id


  const product = ref({
    name: '',
    description: '',
    price: 0
  })

  const isLoading = ref(false)

  onMounted(async () => {
    try {
      const res = await axios.get(`http://localhost:4000/products/${productId}`)
      product.value = {
        name: res.data.name,
        description: res.data.description,
        price: res.data.price
      }
    } catch (error) {
      console.error('Error fetching product', error)
      alert('Product not found')
      router.push('/')
    }
  })

  const submitProduct = async () => {
    isLoading.value = true;
    const token = localStorage.getItem('token');

    try {
      console.log("Sending updated data:", product.value);

      await axios.patch(
        `http://localhost:4000/products/${productId}/update`,
        product.value,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Product updated successfully!");
      router.push("/dashboard");
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      alert("Update failed. Check the console for details.");
    } finally {
      isLoading.value = false;
    }
  };
</script>


<template>
  <div class="container mt-5" style="max-width: 600px;">
    <h2 class="text-center text-primary mb-4">Update Product</h2>

    <form @submit.prevent="submitProduct">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input v-model="product.name" type="text" id="name" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea v-model="product.description" id="description" class="form-control" required></textarea>
      </div>

      <div class="mb-3">
        <label for="price" class="form-label">Price</label>
        <input v-model.number="product.price" type="number" id="price" class="form-control" required />
      </div>

      <div class="d-grid gap-2">
        <button type="submit" class="btn btn-success" :disabled="isLoading">
          {{ isLoading ? 'Updating...' : 'Update Product' }}
        </button>
        <button type="button" class="btn btn-secondary" @click="cancelUpdate" :disabled="isLoading">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>
