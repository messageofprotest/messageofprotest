import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
require('dotenv').config()

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
