import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import VueCookies from 'vue-cookies'
import IPaddress from './components/Global.vue'

Vue.use(VueCookies)

Vue.config.productionTip = false
Vue.prototype.IPaddress = IPaddress.IPaddress;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
