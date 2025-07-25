<script setup>
  import axios from 'axios'
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import Swal from 'sweetalert2'


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

      Swal.fire('Product', 'Updated successfully', 'success');
      router.push("/dashboard");
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      alert("Update failed. Check the console for details.");
    } finally {
      isLoading.value = false;
    }
  };

  const cancelUpdate = () => {
    router.push('/dashboard');
  };
</script>


<template>
  <div class="container mt-5 mb-5 text-primary">
    <div class="card shadow-lg rounded-4 border-primary-subtle" style="max-width: 640px; margin: 0 auto;">
      <!-- Card Header -->
      <div class="card-header bg-primary text-white text-center py-3 rounded-top-4 shadow-sm">
        <h4 class="mb-0 fw-semibold">Update Product</h4>
      </div>

      <!-- Card Body / Form -->
      <div class="card-body bg-light-subtle rounded-bottom-4">
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
              rows="4"
              placeholder="Enter product description"
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
              min="0"
              step="0.01"
              placeholder="Enter product price"
              required
            />
          </div>

          <!-- Buttons -->
          <div class="d-grid gap-2 mt-4">
            <button
              type="submit"
              class="btn btn-warning fw-bold rounded-pill py-2 shadow-sm"
              :disabled="isLoading"
            >
              {{ isLoading ? 'Updating...' : 'Update Product' }}
            </button>
            <button
              type="button"
              class="btn btn-outline-secondary rounded-pill py-2"
              @click="cancelUpdate"
              :disabled="isLoading"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

