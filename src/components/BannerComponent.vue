<template>
  <div class="container-fluid">
    <div class="row mb-5 py-5" id="banner">
      <div class="col-md-10 p-5 ms-5">
        <h1 class="mb-3" id="banner-title">{{bannerProps.title}}</h1>
        <p class="mb-5" id="motto">{{bannerProps.tagline}}</p>
        <router-link class="btn btn-primary btn-lg rounded-pill px-3" :to="{ name: bannerProps.destination }">{{bannerProps.buttonLabel}} <i class="bi bi-arrow-right"></i></router-link>
      </div>
    </div>
  </div>
  
</template>

<script>
  //export default allows us to define the components registration and its properties using Options API or Composition API. 
  //Options API was first used in VueJS Development and is mostly used for smaller scaled applications. Composition API was added in Vue 3.
  //Defining the props property using the Options API will allow components to be completely resuable. It will allow us to pass data from a parent component to a child component.

  export default {
      props: {
      bannerProps: Object
    },
    mounted(){
      console.log(this.title);
      console.log(this.tagline);
    }
  }
  
</script>