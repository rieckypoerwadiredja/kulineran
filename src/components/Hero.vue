<template lang="">
  <div class="hero">
    <!-- Dekstop -->
    <div class="d-none d-md-block">
      <div class="row mt-4">
        <div class="col-md-6">
          <div class="d-flex h-100">
            <div class="justify-content-center align-self-center">
              <h2>
                <strong>Delicious Menu, </strong> <br />
                in Your Gadget
              </h2>
              <p>let's choose and order your favorite food</p>
              <router-link class="btn btn-md btn-success" to="/foods">
                Order Now <b-icon-arrow-right></b-icon-arrow-right>
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <img
            src="../assets/images/hero.png"
            alt="Eating Ilustration"
            style="width: 100%"
          />
        </div>
      </div>
    </div>

    <!-- mobile -->
    <div class="d-md-none d-sm-block">
      <div class="row mt-4">
        <div class="col-md-6 mb-5">
          <img
            src="../assets/images/hero.png"
            alt="Eating Ilustration"
            style="width: 100%"
          />
        </div>
        <div class="col-md-6">
          <div class="d-flex">
            <div class="justify-content-center align-self-center w-100">
              <h2 class="text-center">
                <strong>Delicious Menu, </strong> <br />
                in Your Gadget
              </h2>
              <p class="text-center">
                let's choose and order your favorite food
              </p>
              <div class="d-flex justify-content-center align-content-center">
                <router-link class="btn btn-md btn-success" to="/foods">
                  Order Now <b-icon-arrow-right></b-icon-arrow-right>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeroView",
};
</script>

<style lang=""></style>
