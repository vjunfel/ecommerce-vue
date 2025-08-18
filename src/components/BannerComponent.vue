<script setup>

const props = defineProps({
	bannerProps: Object,
}); 

</script>

<template>
  <div id="banner" class="row mb-5 py-5   row d-flex justify-content-center text-center" >
    <div id="content" class="content col-md-8 p-5 ">
      <h1 class="mb-3" id="banner-title">
        {{bannerProps.title.slice(0,3)}}<span class="text-warning">{{bannerProps.title.slice(3)}}</span>
      </h1>
      <p class="mb-5" id="motto">{{bannerProps.tagline}}</p>
      <router-link class="btn btn-warning btn-lg rounded-pill px-4" :to="{ name: bannerProps.destination }">{{bannerProps.buttonLabel}} <i class="bi bi-arrow-right"></i></router-link>
    </div>
  </div>
</template>

<style scoped>
#banner-title {
  font-family: 'Trebuchet MS', sans-serif;
  font-weight: bolder;
  font-size: 32px;
  
  @media (min-width: 768px) {
    font-size: 54px;
  }
}

#motto {
  font-family: 'Trebuchet MS', sans-serif;
  font-size: 1.3rem;
  
  @media (min-width: 768px) {
    font-size: 1.7rem;
  }
}

#banner {
  background: url(../assets/images/bg-cake.jpg),
    linear-gradient(to right, rgb(255, 255, 255), 70%, rgba(126, 209, 247, 0.5));
  background-size: cover;
  background-position: center;
  height: 600px;
}

#banner::before {
  content: "";
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  height: 675px;
}

#banner > * {
  position: relative;
  z-index: 1;
}

</style>