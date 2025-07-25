<script setup>
import { onBeforeMount, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../api";
import { useUserStore } from "../stores/userStore";
import { Notyf } from "notyf";
import AdminDashBoard from "@/components/AdminDashBoard.vue";

const notyf = new Notyf();
const userStore = useUserStore();
const router = useRouter();
const product = reactive({ data: null });

async function handleEnroll() {
	let { data } = await api.post(`/enrollments/enroll`, {
		enrolledProducts: [
			{
				productId: product.data._id,
			},
		],
		totalPrice: product.data.price,
	});

	if (data.success === true) {
		notyf.success("Product Enrolled");
		router.push({ path: "/products" });
	} else {
		notyf.error("Enrollment Failed");
	}
}

onBeforeMount(async () => {
	const route = useRoute();

	let { data } = await api.get(`/products/specific/${route.params.id}`);
	product.data = data;
});
</script>

<template>
	<div class="container-fluid">
		<AdminDashBoard />
	</div>
</template>
