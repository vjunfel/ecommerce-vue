<script setup>
import { Notyf } from 'notyf'
import { useUserStore } from '../stores/userStore'

const { user } = useUserStore()
const notyf = new Notyf()

defineProps({
  courseData: Object
})

</script>

<template>
	<div class="col-12 col-md-6 col-lg-4 my-3">
		<div id="CourseCard" class="card p-2 cardHighlights shadow-sm" style="min-height: 100%;">
			<img 
                class="card-img-top"
                :src="`https://placehold.co/600x400/63c3ff/ffffff?font=raleway&text=${encodeURIComponent(courseData.name)}`"
                :alt="courseData.name"
            >
	     	<div class="card-body">
	         	<h4 class="card-title fw-bold mb-2">
	            	{{courseData.name}}
	         	</h4>
	         	<p class="card-text text-muted mb-2">
	             	{{courseData.description.slice(0, 100) + (courseData.description.length > 100 ? '...' : '')}}
	         	</p>
	         	<p class="mb-1">
	             	<span class="fw-semibold">Price:</span> PHP {{courseData.price}}
	         	</p>
	         	<div class="d-grid mt-3">
	         		<router-link class="btn btn-outline-primary d-block" :to="{path:`/products/${courseData._id}`}">View Course</router-link>
	         	</div>
	         	
	     	</div>
		</div>
	</div>
	
</template>
