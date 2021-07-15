import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router';
import routes from './routes';

const isServer = typeof window === 'undefined';

const history = isServer ? createMemoryHistory() : createWebHistory();

const router = createRouter({
  routes,
  history,
});

export default router;
