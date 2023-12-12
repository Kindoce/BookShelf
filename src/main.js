import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import axios from 'axios';

import VueRouter from "vue-router";

import router from './router';

import store from './store';

Vue.prototype.$axios = axios;

console.log(window.location.hostname);
Vue.prototype.$httpUrl = 'http://'+window.location.hostname+':3000'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(ElementUI)
// Vue.use(ElementUI, { size: "small" });


new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
