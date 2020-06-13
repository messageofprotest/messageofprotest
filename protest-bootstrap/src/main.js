import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import VueAnalytics from 'vue-analytics'
import App from './App.vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import _ from 'lodash';

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.config.productionTip = false

Vue.use(VueAnalytics, {
  id: 'UA-XXX-X'
})

// support lodash functions in all components
Vue.set(Vue.prototype, '_', _);

new Vue({
  render: h => h(App),
}).$mount('#app')
