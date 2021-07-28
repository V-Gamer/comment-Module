import Vue from 'vue'
import App from './App.vue'
import router from './router'
import mockData from './api/mock';
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
Vue.prototype.$axios = axios;
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  mockData
}).$mount('#app')
