<script setup>
import api from "@/api";
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import { Notyf } from "notyf";

const notyf = new Notyf();
const emit = defineEmits(["refreshCourses"]);

const props = defineProps({
    coursesData: Array,
});

const router = useRouter();


const handleEdit = async (id) => {
    router.push(`/courses/update/${id}`)
}

const handleArchive = async (id) => {
	try {
		const response = await api.patch(`/courses/${id}/archive`);

		if (response.status === 200 || response.status === 201) {
			notyf.success(response.data.message);
			emit("refreshCourses");
		} else {
			notyf.error(response.data.message);
		}
	} catch (error) {
		if (error.response?.status === 409) {
			notyf.error(error.response.data.message);
		} else {
			console.error(error);
			notyf.error("Error archiving course. Please contact administrator.");
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
            <tr v-for="course in coursesData" :key="course._id">
                <td>{{ course._id }}</td>
                <td>{{ course.name }}</td>
                <td>{{ course.description }}</td>
                <td>{{ course.price }}</td>
                <td>
                    <span v-if="course.isActive" class="text-success">Available</span>
                    <span v-else class="text-danger">Unavailable</span>
                </td>
                <td>
                    <button @click="handleEdit(course._id )" class="btn btn-primary">Edit</button>
                </td>
                <td>
                    <button @click="handleArchive(course._id )" class="btn btn-danger">Archive</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>