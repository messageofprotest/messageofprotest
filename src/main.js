import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import VueAnalytics from 'vue-analytics'
import App from './App.vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import _ from 'lodash';
import VueScrollTo from 'vue-scrollto';
import 'vue-awesome/icons/brands/facebook-square';
import 'vue-awesome/icons/brands/twitter';
import 'vue-awesome/icons/regular/lightbulb';
import Icon from 'vue-awesome/components/Icon';
import CloseIcon from 'vue-material-design-icons/Close.vue';
import ContentCopyIcon from 'vue-material-design-icons/ContentCopy.vue';


Vue.component('close-icon', CloseIcon);
Vue.component('content-copy-icon', ContentCopyIcon);

// globally (in your main .js file)
Vue.component('v-icon', Icon)

Vue.use(VueScrollTo, {
    offset: -20,
});
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.config.productionTip = false;

Vue.use(VueAnalytics, {
  id: 'UA-169344376-1'
});

// support lodash functions in all components
Vue.set(Vue.prototype, '_', _);

new Vue({
  render: h => h(App),
}).$mount('#app');
