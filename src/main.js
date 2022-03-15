import Vue from 'vue'
import App from './App.vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import 'font-awesome/css/font-awesome.min.css'  // A great set of icon font library and CSS framework
import 'animate.css';   // A powerful CSS3 animation library
import "swiper/dist/css/swiper.min.css"; // Most modern mobile touch slider and framework with hardware accelerated transitions

import store from './store'
import router from './router'
import API from './api'
import VueLazyload from 'vue-lazyload'
import VueClipboard from 'vue-clipboard2'  // Simple vuejs 2 binding.js for clipboard
import VueTypedJs from 'vue-typed-js'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '@/style/index.scss' // global css

import "@/icons";
import '@/permission' // permission control

Vue.use(ElementUI);
Vue.use(VueLazyload)
Vue.use(VueClipboard)
Vue.use(VueTypedJs)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeMount() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  store,
  router,
}).$mount('#app')
