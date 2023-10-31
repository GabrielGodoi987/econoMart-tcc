import { createRouter, createWebHistory } from 'vue-router'
// import { useCounterStore } from '@/store'

const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: () => import("@/views/LoginPage.vue")
  },
  {
    path: '/dashboard',
    name: 'home',
    component: () => import("@/views/HomeView.vue")
  },
  {
    path: '/Costumers',
    name: 'Costumers',
    component: () => import('@/views/CostumersPage.vue')
  },
  {
    path: "/Caixa",
    name: 'Caixa',
    component: () => import("@/views/FrenteCaixa.vue")
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
  },
  {
    path: '/erro-de-acesso',
    name: 'ErrorPage',
    component: () => import('@/views/ErrorPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
