import Vue from 'vue'
import App from './App.vue'
import router from './router'
// Bootstrap
import {
  BootstrapVue,
  BootstrapVueIcons
} from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

// my css
import './assets/css/main.css'

// notification vue
import VueToast from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(VueToast)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')