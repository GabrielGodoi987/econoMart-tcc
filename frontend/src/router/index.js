import { createRouter, createWebHistory } from 'vue-router'

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
    path: '/sellers',
    name:'sellers',
    component: () => import('@/views/AllSellers.vue')
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
