<script setup>
import { ref, onMounted } from "vue";
import "notyf/notyf.min.css";
import BestSellerProduct from "./BestSellerProduct.vue";
import axios from "axios";
import { useProductStore } from "@/stores/productStore";

const products = ref([]);
const loading = ref(false);

const productStore = useProductStore();

const bestSellerItem = async () => {
  loading.value = true;
	try {
		// const res = await axios.get("https://vvro2vmufk.execute-api.us-west-2.amazonaws.com/production/products/active");
    
    // if(res.status === 200) {
		// 	const bestSeller = res.data.filter((item) => {
		// 		return (item.bestseller)
    //   })
    //   products.value = bestSeller || [];
    // }
		
		// console.log("ACTIVE PRODUCTS ========>> ", res.data);
		// console.log("BestSeller ========>> ", products);
		
		productStore.fetchActiveProducts()
		
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
