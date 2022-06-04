<template lang="">
  <div class="cart">
    <NavBar :updateKeranjang="keranjangs" />
    <div class="container">
      <div class="row mt-4">
        <div class="col">
          <!-- breadcrumb -->
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
              <li class="breadcrumb-item text-dark">Keranjang</li>
            </ol>
          </nav>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <h2>Keranjang <strong>Saya</strong></h2>
          <div class="table-responsive-lg mt-4">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Photo</th>
                  <th scope="col">Makanan</th>
                  <th scope="col">Jumlah</th>
                  <th scope="col">Keterangan</th>
                  <th scope="col">Total Harga</th>
                  <th scope="col">Hapus</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(keranjang, index) in keranjangs"
                  :key="keranjang.id"
                >
                  <th>{{ index + 1 }}</th>
                  <td>
                    <img
                      :src="
                        require(`../assets/images/${keranjang.detailproduct.gambar}`)
                      "
                      class="img-fluid shadow"
                      alt="..."
                      style="width: 150px"
                    />
                  </td>
                  <td>
                    <strong>{{ keranjang.detailproduct.nama }}</strong>
                  </td>
                  <td>{{ keranjang.jumlah_product }}</td>
                  <td align="left">{{ keranjang.desc }}</td>
                  <td align="center">
                    <strong
                      >Rp.
                      {{
                        keranjang.detailproduct.harga * keranjang.jumlah_product
                      }}</strong
                    >
                  </td>
                  <td align="center" class="text-danger">
                    <b-icon-trash
                      @click="
                        hapusKeranjang(
                          keranjang.id,
                          keranjang.detailproduct.nama
                        )
                      "
                    ></b-icon-trash>
                  </td>

                  <!-- price -->
                </tr>

                <tr>
                  <td colspan="6" align="right">
                    <strong>Total Harga:</strong>
                  </td>
                  <td align="right">
                    <strong>Rp. {{ totaHarga }}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- form pesan -->
      <div class="row justify-content-end">
        <div class="col-md-4">
          <form v-on:submit.prevent>
            <div class="form-group">
              <label for="nama">Nama</label>
              <input type="text" class="form-control" v-model="order.nama" />
            </div>

            <div class="form-group">
              <label for="noMeja">Nomor Meja</label>
              <input
                type="number"
                class="form-control"
                v-model="order.noMeja"
              />
            </div>

            <button class="btn btn-success" type="submit" @click="checkout">
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
import NavBar from "../components/NavBar.vue";

export default {
  name: "CartView",
  components: {
    NavBar,
  },
  data() {
    return {
      keranjangs: [],
      order: {},
    };
  },

  methods: {
    setKeranjangs(data) {
      this.keranjangs = data;
    },

    hapusKeranjang(id, nama) {
      axios
        .delete(`http://localhost:3000/keranjangs/${id}`)
        .then(() => {
          this.$toast.error(`Item ${nama} telah dihapus`, {
            // optional options Object
            type: "error",
            position: "bottom-right",
          });
          axios
            .get(`http://localhost:3000/keranjangs/`)
            .then((response) => this.setKeranjangs(response.data))
            .catch((error) => console.log(error));
        })

        .catch((error) => {
          this.$toast.warning(`Item ${error} gagal dihapus`, {
            // optional options Object
            type: "error",
            position: "bottom-right",
          });
        });
    },

    // checkout pesanan
    checkout() {
      if (this.order.nama && this.order.noMeja) {
        // didalam array order diksh key keranjang yg isinya dari array keanjang
        this.order.keranjangs = this.keranjangs;

        axios
          .post(`http://localhost:3000/pesanans`, this.order)
          .then(() => {
            this.$router.push("/pesanan");
            this.$toast.success(`Item berhasil diproses`, {
              // optional options Object
              type: "success",
              position: "bottom-right",
            });
            // ambil semua sis keranjangs dan di delete satu"
            this.keranjangs.map((item) => {
              return axios
                .delete(`http://localhost:3000/keranjangs/${item.id}`)
                .then() // karena tiap msk pesanan dipindah dari keranjang ke pesan, maka ges ada aler klo berhasil
                .catch((error) => {
                  this.$toast.error(`Item gagal diproses ${error}`, {
                    // optional options Object
                    type: "error",
                    position: "bottom-right",
                  });
                });
            });
          })
          .catch((error) => {
            this.$toast.error(`Item gagal diproses ${error}`, {
              // optional options Object
              type: "error",
              position: "bottom-right",
            });
          });
      } else {
        this.$toast.warning(`Nama dan Meja wajib diisi`, {
          // optional options Object
          type: "warning",
          position: "bottom-right",
        });
      }
    },
  },

  mounted() {
    axios
      .get(`http://localhost:3000/keranjangs`)
      .then((response) => this.setKeranjangs(response.data))
      .catch((error) => console.log(error));
  },

  computed: {
    totaHarga() {
      return this.keranjangs.reduce((items, data) => {
        return items + data.detailproduct.harga * data.jumlah_product;
      }, 0);
    },
  },
};
</script>
<style lang=""></style>
