<script setup>
import NavbarComponent from "@/components/NavbarComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

</script>

<template>
	<div class="d-flex flex-column min-vh-100">
		<NavbarComponent />
		<router-view />
		<FooterComponent />
	</div>
</template>
