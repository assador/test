import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import UsersView from '../views/UsersView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/users',
    name: 'users',
    component: UsersView,
  }, {
    path: '/users/:id(\\d+)',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '../views/UserView.vue'),
    props: true,
  }, {
    path: '/:catchAll(.*)*',
    redirect: '/users',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
