import AboutLayout from '@/layouts/about.vue';

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

export default routes;
