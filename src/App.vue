<template>
  <div id="app">
    <div class="container">
      <router-view/>
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Footer from './components/Footer.vue'



export default {
  name: 'App',
  components: {
    Footer,
  }  
}
</script>

<style>

</style>
