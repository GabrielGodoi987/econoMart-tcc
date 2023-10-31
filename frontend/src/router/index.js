import { createRouter, createWebHistory } from 'vue-router'
import { userStore } from '@/store';
import { toRefs } from 'vue';

const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: () => import("@/views/LoginPage.vue"),
  },
  {
    path: '/dashboard',
    name: 'home',
    component: () => import("@/views/HomeView.vue"),
    meta: {
      accessLevel: 1
    }
  },
  {
    path: '/Costumers',
    name: 'Costumers',
    component: () => import('@/views/CostumersPage.vue'),
    meta: {
      accessLevel: [1, 2]
    }
  },
  {
    path: "/Caixa",
    name: 'Caixa',
    component: () => import("@/views/FrenteCaixa.vue"),
    meta: {
      accessLevel: 2
    }
  },
  {
    path: '/productsRegister',
    name: 'productsRegister',
    component: () => import('@/views/ProductsRegister.vue'),
    meta: {
      accessLevel: 1
    }
  },
  {
    path: '/allProducts',
    name: 'allProducts',
    component: () => import('@/views/AllProducts.vue'),
    meta: {
      accessLevel: [1, 2]
    }
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

router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.accessLevel;
  const { user } = toRefs(userStore());

  if (requiresAuth) {
    if (user) {
      // O usuário tem acesso suficiente, permita a rota
      next();
    } else {
      // O usuário não tem acesso suficiente, redirecione para uma página de erro ou outra rota
      next('/'); // Redireciona para uma página de erro, por exemplo
    }
  } else {
    // Rota pública, permita o acesso
    next();
  }
});
export default router
