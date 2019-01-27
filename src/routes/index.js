import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/login.vue';
import Home from '@/components/home.vue';
import Meteo from '@/components/meteo.vue';
import Registo from '@/components/registo.vue';
import Navigation from '@/components/navigation.vue';
import configUser from '@/components/configUser.vue';
import configAdmin from '@/components/configAdmin.vue';


Vue.use(Router);

export default new Router({
  routes: [
    
    {
      path: '/configAdmin',
      name: 'configAdmin',
      component: configAdmin
    },
    {
      path: '/config',
      name: 'configUser',
      component: configUser
    },
    {
      path: '/navigation',
      name: 'navigation',
      component: Navigation
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/registo',
      name: 'registo',
      component: Registo
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },

    {
      path: '/meteo',
      name: 'meteo',
      component: Meteo
    }

  ]
});