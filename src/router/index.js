import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '../layout/AppLayout.vue';
import LoginView from '../views/Login/LoginView.vue';
import DashboardView from '../views/Dashboard/DashboardView.vue';
import ProdutosView from '../views/Produtos/ProdutosView.vue';
import VendasView from '../views/Vendas/VendasView.vue';
import UsuariosView from '../views/Usuarios/UsuariosView.vue';
import EstabelecimentosView from '../views/Estabelecimentos/EstabelecimentosView.vue';


const roleRoutes = {
  OWNER: ['/dashboard', '/produtos', '/vendas', '/usuarios', '/estabelecimentos'],
  MANAGER: ['/produtos', '/vendas', '/usuarios'],
  SELLER: ['/produtos', '/vendas'],
};

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
// Funções auxiliares
function isLoggedIn() {
  const currentUser = sessionStorage.getItem('currentUser');
  if (!currentUser) return false;

  try {
    const userData = JSON.parse(currentUser);
    return !!userData.token;
  } catch {
    return false;
  }
}

function getUserRole() {
  const currentUser = sessionStorage.getItem('currentUser');
  if (!currentUser) return null;

  try {
    const userData = JSON.parse(currentUser);
    return userData.user?.role || null;
  } catch {
    return null;
  }
}

router.beforeEach((to, from, next) => {
  const loggedIn = isLoggedIn();
  const role = getUserRole();

  if (to.meta.requiresAuth && !loggedIn) {
    return next({ name: 'Login' });
  }

  if (to.meta.requiresGuest && loggedIn) {
    return next({ path: roleRoutes[role]?.[0] || '/dashboard' });
  }

  if (to.meta.requiresAuth && role) {
    const allowedRoutes = roleRoutes[role] || [];
    if (!allowedRoutes.includes(to.path)) {
      return next({ path: allowedRoutes[0] });
    }
  }

  next();
});

export default router;