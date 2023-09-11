import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/logPage',
    name: 'LoginPage',
    component: () => import("@/views/LoginPage.vue")
  },
  {
    path: '/',
    name: 'home',
    component: () => import("@/views/HomeView.vue")
  },
  {
    path: "/employes",
    name: 'employes',
    component: () => import("@/views/EconoEmployes.vue")
  },
  {
    path: '/productsRegister',
    name: 'productsRegister',
    component: () => import('@/views/ProductsRegister.vue')
  },
  {
    path: '/allProducts',
    name: 'allProducts',
    component: () => import('@/views/AllProducts.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
