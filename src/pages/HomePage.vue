<script setup>
import BannerComponent from '../components/BannerComponent.vue'
import HighlightsComponent from '../components/HighlightsComponent.vue'

const bannerProps = {
  title: 'CapCAKES',
  tagline: 'DreamCakes is a cozy neighborhood spot where artistry meets indulgence. From elegantly crafted birthday cakes to whimsical custom designs, each creation is baked fresh using premium ingredients and a whole lot of love.',
  destination: 'Products',
  buttonLabel: 'View Our Products'
}
</script>

<template>
  <div class="container-fluid text-white pb-5">
    <BannerComponent :bannerProps=bannerProps />
    <HighlightsComponent />
  </div>
</template>