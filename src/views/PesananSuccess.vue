<template lang="">
    <div class="pesanan-success">
        <NavBar/>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col text-center">
              <strong>Sukses!!</strong>
              <h4>Pesanan anda segera diproses <br>Selamat menunggu</h4>
              <img src="../assets/images/menunggu.png" alt="menunggu" width="300">
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import NavBar from "../components/NavBar.vue";

export default {
  name: "PesananSuccess",
  components: {
    NavBar,
  },
};
</script>
<style lang="">
</style>