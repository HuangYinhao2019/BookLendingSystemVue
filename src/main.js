import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import VueCookies from 'vue-cookies'
import Global from './components/Global'
Vue.prototype.IPaddress = Global;

Vue.use(VueCookies)
Vue.config.productionTip = false;

window.IPaddress = '121.199.66.169'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
