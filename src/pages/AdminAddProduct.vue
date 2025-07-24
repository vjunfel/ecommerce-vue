<template>
  <div class="container mt-5" style="max-width:600px">
    <h2 class="text-center text-primary mb-4">Add Product</h2>
    <form @submit.prevent="submitProduct">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input v-model="product.name" type="text" id="name" class="form-control" required /></input>
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea v-model="product.description" id="description" class="form-control" required></textarea>
      </div>

      <div class="mb-3">
        <label for="price" class="form-label">Price</label>
        <input v-model.number="product.price" type="number" id="price" class="form-control" required />
      </div>

      <button type="submit" class="btn btn-primary w-100">Add Product</button>
    </form>
  </div>
</template>

<script setup>
  import {ref} from 'vue'
  import {useRouter} from 'vue-router'


  const router = useRouter()


  const product = ref ({

    name:'',
    description:'',
    price: 0
  })

const submitProduct =()=> {
  console.log ('Product Submitted: ', product.value)

  axios.post ('/api/products', product.value)

  alert('Product added successfully')

  product.value = {name:'', description: '', price: 0 }
}


</script>