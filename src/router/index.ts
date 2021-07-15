import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router';
import AboutLayout from '../layouts/about.vue';

const isServer = typeof window === 'undefined';

const history = isServer ? createMemoryHistory() : createWebHistory();

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/Home.vue'),
  },
  {
    path: '/page/:id',
    name: 'page',
    component: () => import('../pages/Page.vue'),
    props: true,
    meta: {
      layout: AboutLayout,
    },
  },
];

export default function () {
  return createRouter({
    routes,
    history,
  });
}
