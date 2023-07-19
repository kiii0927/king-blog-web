import Vue from 'vue';
import App from './App.vue';

import Cookies from 'js-cookie';

import 'normalize.css/normalize.css'; // A modern alternative to CSS resets
import 'font-awesome/css/font-awesome.min.css'; // A great set of icon font library and CSS framework
import 'animate.css'; // A powerful CSS3 animation library
import 'swiper/dist/css/swiper.min.css'; // Most modern mobile touch slider and framework with hardware accelerated transitions

import store from './store';
import router from './router';
import API from './api';
import VueLazyload from 'vue-lazyload';
import VueClipboard from 'vue-clipboard2'; // Simple vuejs 2 binding.js for clipboard
import VueTypedJs from 'vue-typed-js';

import Highlight from '@/directive/highlight';
import Clickoutside from 'element-ui/src/utils/clickoutside'; // Click outside directive
import mavonEditor from 'mavon-editor';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'mavon-editor/dist/css/index.css';

import '@/style/index.scss'; // global css

import '@/icons';
import * as filters from './filters'; // global filters
import '@/permission'; // permission control

Vue.directive('clickoutside', Clickoutside);

Vue.use(Highlight);
Vue.use(mavonEditor);
Vue.use(VueLazyload);
Vue.use(VueClipboard);
Vue.use(VueTypedJs);
Vue.use(ElementUI, {
    size: Cookies.get('size') || 'medium', // set element-ui default size
});

// register global utility filters
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

// close productionTip
Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    beforeMount() {
        Vue.prototype.$bus = this;
        Vue.prototype.$API = API;
        Vue.prototype.$notify = ElementUI.Notification;
        Vue.prototype.$message = ElementUI.Message;
    },
    store,
    router,
}).$mount('#app');
