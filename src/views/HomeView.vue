<template>
  <div class="home">
      <NavBar />
    <div class="container">
      <Hero />

      <!-- favorite foods -->
      <div class="row mt-5">
        <div class="col">
          <h2>Best <strong>Foods</strong></h2>
        </div>
        <div class="col">
          <router-link class="btn btn-success float-right" to="/foods"
            ><b-icon-search></b-icon-search> Lihat Semua</router-link
          >
        </div>
      </div>
      <div class="row mb-3">
        <!-- 4. loop dara array object dari database -->
        <!-- yg tadinya array object menjadi object -->
        <div class="col-md-4 mt-4" v-for="product in bestProducts" :key="product.id">
          <!-- data yang sudah satuan ini di kirimke component card utk diisi -->
          <CardProduct :product = "product" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import Hero from '../components/Hero.vue'
import CardProduct from '../components/CardProduct.vue'
import NavBar from '../components/NavBar.vue'

// axios
import axios from 'axios'

export default {
  name: 'HomeView',
  components: {
    Hero,
    CardProduct,
    NavBar
  },

  data() {
    return {
      bestProducts: [],
    }
  },

  methods: {
    // 1. paramer setPorduct diambil dari database
    setProducts(data){
    // 3. kemudian disimpan ke object product di data()
      this.bestProducts = data
    }
  },

  mounted() {
 axios.get('http://localhost:3000/best-products')
  .then(response => this.setProducts(response.data))
  .catch(error => console.log(error));
  }
} 
</script>
