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
import 'vue-awesome/icons/brands/github';
import Icon from 'vue-awesome/components/Icon';
import CloseIcon from 'vue-material-design-icons/Close.vue';
import ContentCopyIcon from 'vue-material-design-icons/ContentCopy.vue';
import { isDevelopmentMode, GA_ID } from './utils';
import VueCookies from 'vue-cookies';
import VueRouter from 'vue-router';

Vue.component('close-icon', CloseIcon);
Vue.component('content-copy-icon', ContentCopyIcon);

// globally (in your main .js file)
Vue.component('v-icon', Icon)

Vue.use(VueScrollTo, {
    offset: -20,
});
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueCookies);
Vue.use(VueRouter);

Vue.config.productionTip = false;
let vueAnalyticsConfig = { id: GA_ID };
const isGoogleAnalyticsDisabled = Vue.$cookies.get('enable_google_analytics') === 'false';

// || isDevelopmentMode
if(isGoogleAnalyticsDisabled || isDevelopmentMode) {
  vueAnalyticsConfig.disabled = true;
}

Vue.use(VueAnalytics, vueAnalyticsConfig);

// support lodash functions in all components
Vue.set(Vue.prototype, '_', _);

new Vue({
  render: h => h(App),
  router: new VueRouter(),
}).$mount('#app');
