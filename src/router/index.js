import { createRouter, createWebHistory } from 'vue-router';
import { isLoggedIn } from '../utils/user';
import AppLayout from '../layout/AppLayout.vue';
import LoginView from '../views/Login/LoginView.vue';
import DashboardView from '../views/Dashboard/DashboardView.vue';
import ProdutosView from '../views/Produtos/ProdutosView.vue';
import VendasView from '../views/Vendas/VendasView.vue';
import UsuariosView from '../views/Usuarios/UsuariosView.vue';
import EstabelecimentosView from '../views/Estabelecimentos/EstabelecimentosView.vue';

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { requiresGuest: true },
  },
  {
    path: '/',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: DashboardView,
      },
      {
        path: 'produtos',
        name: 'Produtos',
        component: ProdutosView,
      },
      {
        path: 'vendas',
        name: 'Vendas',
        component: VendasView,
      },
      {
        path: 'usuarios',
        name: 'Usuarios',
        component: UsuariosView,
      },
      {
        path: 'estabelecimentos',
        name: 'Estabelecimentos',
        component: EstabelecimentosView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = isLoggedIn();

  if (to.meta.requiresAuth && !loggedIn) {
    next({ name: 'Login' });
  } else if (to.meta.requiresGuest && loggedIn) {
    next({ name: 'Dashboard' });
  } else {
    next();
  }
});

export default router;
