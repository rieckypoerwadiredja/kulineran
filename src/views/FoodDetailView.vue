<template lang="">
  <div class="food-detail">
      <NavBar />
    <div class="container">
      <!-- breadcrumb -->
      <div class="row mt-4">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link class="text-dark" to="/" href="#"
                  >Home</router-link
                >
              </li>
              <li class="breadcrumb-item">
                <router-link class="text-dark" to="/foods" href="#"
                  >Foods</router-link
                >
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                {{ detailProduct.nama }}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <!-- detail -->
      <div class="row mt-4">
        <div class="col-md-6">
          <img
            :src="require(`../assets/images/${detailProduct.gambar}`)"
            class="img-fluid shadow"
            alt="..."
          />
        </div>
        <div class="col-md-6">
          <h2>
            <Strong> {{ detailProduct.nama }}</Strong>
          </h2>
          <h4>
            Harga: <strong>Rp. {{ detailProduct.harga }}</strong>
          </h4>
          <h3>
            <span :class="`badge badge-${detailProduct.class}`">{{
              detailProduct.is_ready
            }}</span>
          </h3>
          <!-- pas submit tidak reload krn prevent devault -->
          <form v-on:submit.prevent>
            <div class="form-group">
              <label for="jumlah_pemesanan">Jumlah Pemesanan</label>
              <!-- data input dimskin ke order di key count -->
              <input
                type="number"
                class="form-control"
                v-model="order.jumlah_product"
              />
            </div>
            <div class="form-group">
              <label for="keterangan">Keterangan</label>
              <!-- data input msk ke object order di key desc -->
              <textarea
                v-model="order.desc"
                class="form-control"
                placeholder="Keterangan pesananm ms: tidak pakai bawang"
              ></textarea>
            </div>
            <button class="btn btn-success" type="submit" @click="orderSubmit">
              <b-icon-cart></b-icon-cart> Order
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import NavBar from '../components/NavBar.vue'
export default {
  name: "FoodDetail",
 components: {
    NavBar
  },
  data() {
    return {
      detailProduct: {},
      // data daro form mks ke sini
      order: {},
    };
  },

  methods: {
    setDetailProduct(data) {
      if (data.is_ready) {
        data.is_ready = "Ready";
        data.class = "success";
      } else {
        data.is_ready = "Not Ready";
        data.class = "danger";
      }
      this.detailProduct = data;
    },

    orderSubmit() {
      // pesanan yg diisi sama dengan menu yg di detail halaman ini
      if (this.order.jumlah_product && this.order.desc) { //jika jml diisi maka
        this.order.detailproduct = this.detailProduct;
        axios
          .post(`http://localhost:3000/keranjangs`, this.order)
          .then(() => {
            this.$router.push('/keranjang')
            this.$toast.success(`Item dimasukan ke keranjang}`, {
              // optional options Object
              type: "success",
              position: "bottom-right",
            });
          })
          .catch((error) => {
            this.$toast.error(`Item fafal dimasukan ke keranjang ${error}`, {
              // optional options Object
              type: "error",
              position: "bottom-right",
            });
          });
      } else {
        this.$toast.error(`Isi item`, {
              // optional options Object
              type: "warning",
              position: "bottom-right",
            });
      }
    },
  },

  mounted() {
    axios
      .get(`http://localhost:3000/products/${this.$route.params.id}`)
      .then((response) => this.setDetailProduct(response.data))
      .catch((error) => console.log(error));
  },
};
</script>
<style lang=""></style>
