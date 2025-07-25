<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import api from '@/api'

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
      const res = await api.get(`/products/${productId}`)
      product.value = {
        name: res.data.name,
        description: res.data.description,
        price: res.data.price
      }
    } catch (error) {
      console.error('Error fetching product', error)
      Swal.fire('', 'Product not found', 'danger');
      router.push('/')
    }
  })

  const handleUpdateProduct = async () => {
    isLoading.value = true;

    try {
      console.log("Sending updated data:", product.value);

      await api.patch(`/products/${productId}/update`, product.value);

      Swal.fire('Product', 'Updated successfully', 'success');
      router.push("/dashboard");
    } catch (err) {
      // console.error("Update failed:", err.response?.data || err.message);
      // alert("Update failed. Check the console for details.");
      Swal.fire('Product', 'Failed to update', 'error');
    } finally {
      isLoading.value = false;
    }
  };

  const cancelUpdate = () => {
    router.push('/dashboard');
  };
</script>

<template>
  <div class="container my-5 d-flex justify-content-center">
    <div
			class="card shadow-lg p-4 w-100"
			style="max-width: 600px"
		>
      <h2 class="text-center text-warning mb-4">Update Product</h2>
      
      <form @submit.prevent="handleUpdateProduct">
        <!-- Product Name -->
        <div class="mb-3">
          <label for="name" class="form-label fw-bold">Product Name</label>
          <input
            v-model="product.name"
            type="text"
            id="name"
            class="form-control px-3 py-2"
            placeholder="Enter product name"
            required
          />
        </div>

        <!-- Description -->
        <div class="mb-3">
          <label for="description" class="form-label fw-bold">Description</label>
          <textarea
            v-model="product.description"
            id="description"
            class="form-control rounded-3 px-3 py-2"
            rows="4"
            placeholder="Enter product description"
            required
          ></textarea>
        </div>

        <!-- Price -->
        <div class="mb-3">
          <label for="price" class="form-label fw-bold">Price (₱)</label>
          <input
            v-model.number="product.price"
            type="number"
            id="price"
            class="form-control px-3 py-2"
            min="0"
            step="0.01"
            placeholder="Enter product price"
            required
          />
        </div>

        <!-- Buttons -->
        <div class="d-grid gap-3 mt-5">
          <button
            type="submit"
            class="btn btn-warning py-2"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Updating...' : 'Update Product' }}
          </button>
          <button
            type="button"
            class="btn btn-outline-dark py-2"
            @click="cancelUpdate"
            :disabled="isLoading"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

