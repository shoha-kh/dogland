import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('../views/Main.vue'),
  },
  {
    path: '/breed/:breed',
    component: () => import('../views/DogBreed.vue'),
  },
  {
    path: '/favorites',
    component: () => import('../views/Favorites.vue'),
  },
  { path: "/:catchAll(.*)", redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active"
})

export default router
