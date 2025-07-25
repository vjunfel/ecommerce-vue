<script setup>
import { onBeforeMount, reactive } from "vue";
import { useRoute } from "vue-router";
import api from "../api";
import AdminDashBoard from "@/components/AdminDashBoard.vue";

const product = reactive({ data: null });
const route = useRoute();

onBeforeMount(async () => {
	let { data } = await api.get(`/products/specific/${route.params.id}`);
	product.data = data;
});

</script>

<template>
	<div class="container-fluid">
		<div class="container mt-4">
			<h1 class="mt-5 text-center text-warning">
      	Admin Dashboard
    	</h1>
		</div>
		<AdminDashBoard />
	</div>
</template>
