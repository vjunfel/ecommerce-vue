<script setup>
import { ref, onMounted } from "vue";
import "notyf/notyf.min.css";
import api from "@/api";
import BestSellerProduct from "./BestSellerProduct.vue";

const products = ref([]);
const loading = ref(false);

const bestSellerItem = async () => {
  loading.value = true;
	try {
		const res = await api.get("/products/active");
    
    if(res.status === 200) {
      const bestSeller = res.data.filter((item) => {
        return (item.bestseller)
      })
      products.value = bestSeller || [];
    }
	} catch (error) {
		console.error(error);
	} finally {
		loading.value = false;
	}
};

onMounted( bestSellerItem );
</script>

<template>
	<section class="container" v-if="products">
    <div class="col mb-5">
      <h1 class="text-center text-dark pt-1 pb-3">Best Sellers</h1>
		</div>
		
		<div class="text-center p-5 text-dark" v-if="loading"> 
			<div class="spinner-border m-3 text-warning"></div>
			<p>Loading...</p>
		</div>

    <div v-else="!loading" class="row g-4 mb-5">
      <BestSellerProduct
        v-for="product in products"
        :key="product._id"
        :productData="product"
      />
    </div>
	</section>
</template>

<style scoped>
.custom-search {
	display: flex;
	align-items: center;
	justify-content: center;
}

.custom-form {
	max-width: 800px;
	margin-bottom: 1rem;
	margin-bottom: 2rem;
}

.list-group-item + .list-group-item {
	margin-top: 0.5rem;
}

.search-results {
	margin-top: 2rem;
	border-left: 5px solid #ffc107; 
	background-color: #fef9e7;
}
</style>


