import Vue from 'vue';
import VueRouter from 'vue-router';
import EmptyLayout from '../layouts/Empty.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: EmptyLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/Home.vue'),
      },
    ]
  },
  {
    path: '/pokemon',
    component: EmptyLayout,
    children: [
      {
        path: '',
        name: 'PokemonList',
        component: () => import('../views/Pokemon.vue'),
      },
      {
        path: ':id',
        name: 'PokemonDetail',
        component: () => import('../views/PokemonDetail.vue'),
      },
    ],
  },
  {
    path: '/items',
    component: EmptyLayout,
    children: [
      {
        path: '',
        name: 'ItemsList',
        component: () => import('../views/Items.vue'),
      },
      {
        path: ':id',
        name: 'ItemDetail',
        component: () => import('../views/ItemDetail.vue'),
      },
    ],
  },
  {
    path: '/moves',
    component: EmptyLayout,
    children: [
      {
        path: '',
        name: 'MovesList',
        component: () => import('../views/Move.vue'),
      },
      {
        path: ':id',
        name: 'MoveDetail',
        component: () => import('../views/MoveDetail.vue'),
      },
    ],
  },
]    
      
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
