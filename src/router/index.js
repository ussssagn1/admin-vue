import { createRouter, createWebHistory } from "vue-router";

// Ссылки
const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import(/* webpackChunkName: "about" */ "../views/v-dashboard.vue"),
    meta: {
      title: 'Dashboard'
    }
  },
  {
    path: "/operations",
    name: "Operations",
    component: () => import(/* webpackChunkName: "about" */ "../views/v-operations.vue"),
    meta: {
      title: 'Operations'
    }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
