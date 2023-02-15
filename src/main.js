import Vue from 'vue'
import App from './App.vue'
import routers from './router'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'

import dayjs from "dayjs";
Vue.prototype.$dayjs = dayjs;
Vue.config.productionTip = false;
axios.defaults.baseURL = 'https://wb-api.ch3n4y.com';

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VueAxios, axios)



const router = new VueRouter({
  routes: routers
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
