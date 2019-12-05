// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';

import App from './App'
import router from './router'
import store from './store';
import ElementUI from 'element-ui'; 

Vue.config.productionTip = false;
// Vue.prototype.$video = Video;

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.use(ElementUI); 

/* eslint-disable no-new */
new Vue({
  el: '#container',
  store,
  router,
  components: { App },
  template: '<App/>'
})
