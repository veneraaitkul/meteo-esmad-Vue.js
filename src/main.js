import Vue from 'vue'
import App from './App.vue'
import router from './routes/index.js';
import Axios from 'axios'

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import vBScrollspy from 'bootstrap-vue/es/directives/scrollspy/scrollspy';


import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faCoffee)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.directive('b-scrollspy', vBScrollspy);
Vue.config.productionTip = false
Vue.use(BootstrapVue);


Vue.prototype.$http = Axios

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
