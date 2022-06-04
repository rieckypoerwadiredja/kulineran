<template lang="">
  <div class="foods">
      <NavBar />
    <div class="container">
      <!-- search bar -->
      <div class="row mt-4">
        <div class="container">
          <div class="input-group mb-3">
            <!-- isi input akan dimasukan ke v-model => search -->
            <!-- dimskin ke API / dungsi searchFood() => tampilkan -->
            <input
              v-model="search" 
              @keyup="searchFoods"
              type="text"
              class="form-control"
              placeholder="Search Menu"
              aria-label="Search"
              aria-describedby="basic-addon1"
            />
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1"
                ><b-icon-search></b-icon-search
              ></span>
            </div>
          </div>
        </div>
      </div>
      <!-- title -->
      <div class="col mt-4">
        <h2>Daftar <strong>Makanan</strong></h2>
      </div>
      <!-- product -->
      <div class="row mb-4">
        <div
          class="col-md-4 mt-4"
          v-for="product in allProducts"
          :key="product.id"
        >
          <CardProduct :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CardProduct from "../components/CardProduct.vue";

// axios
import axios from "axios";
import NavBar from '../components/NavBar.vue'

export default {
  name: "FoodsView",
  components: {
    CardProduct,
    NavBar
  },

  data() {
    return {
      allProducts: [],
      // awaltnya search kosong, maka diinput kosong jg cmn ada place holder
      // tiap input ketik ada event ketup di input
      // dijalanin fungsi searchFoods => ambil keyword dari sini
      search: "",
    };
  },

  methods: {
    // 1. paramer setPorduct diambil dari database
    setAllProducts(data) {
      // 3. kemudian disimpan ke object product di data()
      this.allProducts = data;
    },

    searchFoods() {
      axios
        .get(`http://localhost:3000/products?q=${this.search}`)
        .then((response) => this.setAllProducts(response.data))
        .catch((error) => console.log(error));
    },
  },

  mounted() {
    axios
      .get("http://localhost:3000/products")
      .then((response) => this.setAllProducts(response.data))
      .catch((error) => console.log(error));
  },
};
</script>
<style lang=""></style>
