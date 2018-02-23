// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
// import date from './api/dates'
import store from './store'
import Axios from 'axios';

import './common/css/index.less';

// Vue.use(Axios);
Vue.prototype.$http = Axios;
// Axios.get('/api/seller').then(function(response){
//     console.log(response);
//   })
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
