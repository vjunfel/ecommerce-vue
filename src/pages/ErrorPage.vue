<script>
  import BannerComponent from '../components/BannerComponent.vue';

  export default {
    components: {
      BannerComponent
    },
    data(){
      return {
          bannerProps: {
            title: "404 - Not Found",
            tagline: "The page you are looking for cannot be found.",
            destination: "Home",
            buttonLabel: "Back to Home"
          }
      };
    }
  }
</script>

<template>
  <div class="container-fluid">
    <BannerComponent :bannerProps=bannerProps />
  </div>
</template>