<script setup>
import api from "@/api";
import { useRouter } from "vue-router";
import { Notyf } from "notyf";

const notyf = new Notyf();
const emit = defineEmits(["refreshProducts"]);

const props = defineProps({
    productsData: Array,
});

const router = useRouter();


const handleEdit = async (id) => {
    router.push(`/products/update/${id}`)
}

const handleArchive = async (id) => {
	try {
		const response = await api.patch(`/products/${id}/archive`);

		if (response.status === 200 || response.status === 201) {
			notyf.success(response.data.message);
			emit("refreshProducts");
		} else {
			notyf.error(response.data.message);
		}
	} catch (error) {
		if (error.response?.status === 409) {
			notyf.error(error.response.data.message);
		} else {
			console.error(error);
			notyf.error("Error archiving product. Please contact administrator.");
		}
	}
};
</script>

<template>
    <h1 class="text-center text-primary mt-5">Admin Dashboard</h1>
    <table class="table table-striped border">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Availability</th>
                <th colspan="2">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="product in productsData" :key="product._id">
                <td>{{ product._id }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.description }}</td>
                <td>{{ product.price }}</td>
                <td>
                    <span v-if="product.isActive" class="text-success">Available</span>
                    <span v-else class="text-danger">Unavailable</span>
                </td>
                <td>
                    <button @click="handleEdit(product._id )" class="btn btn-primary">Edit</button>
                </td>
                <td>
                    <button @click="handleArchive(product._id )" class="btn btn-danger">Archive</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>