import Vue from 'vue';
import HomeComponent from './components/HomeComponent';
import Inventario from './components/Inventario';
import ModeloP from './components/ModeloP';
import ModeloQ from './components/ModeloQ';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeComponent
    },
    {
      path: '/inventario',
      name: 'inventory',
      component: Inventario
    },
    {
      path: '/QModel',
      name: 'modeloQ',
      component: ModeloQ
    },
    {
      path: '/QModel/:id',
      name: 'itemQ',
      component: ModeloQ,
      props: true
    },
    {
      path: '/PModel',
      name: 'modeloP',
      component: ModeloP
    },
    {
      path: '/PModel/:id',
      name: 'itemP',
      component: ModeloP,
      props: true
    }
  ]
})