import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '../layout/AppLayout.vue';
import LoginView from '../views/Login/LoginView.vue';
import DashboardView from '../views/Dashboard/DashboardView.vue';
import ProdutosView from '../views/Produtos/ProdutosView.vue';
import VendasView from '../views/Vendas/VendasView.vue';
import UsuariosView from '../views/Usuarios/UsuariosView.vue';
import EstabelecimentosView from '../views/Estabelecimentos/EstabelecimentosView.vue';
import CreateProduct from '../views/Produtos/CreateProduct.vue';
import ProductList from '../views/Produtos/ProductList.vue';
import UserList from '../views/Usuarios/UserList.vue';
import CreateUser from '../views/Usuarios/CreateUser.vue';

const roleMainRoutes = {
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
        component: ProdutosView,
        children: [
          {
            path: '',
            name: 'ProductList',
            component: ProductList,
          },
          {
            path: 'criar',
            name: 'CreateProduct',
            component: CreateProduct,
          },
        ],
      },
      {
        path: 'vendas',
        name: 'Vendas',
        component: VendasView,
      },
      {
        path: 'usuarios',
        component: UsuariosView,
        children: [
          {
            path: '',
            name: 'UserList',
            component: UserList,
          },
          {
            path: 'criar',
            name: 'CreateUser',
            component: CreateUser,
          },
        ],
      },
      {
        path: 'estabelecimentos',
        name: 'Estabelecimentos',
        component: EstabelecimentosView,
      },
      {
        path: '/:pathMatch(.*)*',
        redirect: '/dashboard',
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

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

function hasAccess(path, role) {
  const mainRoutes = roleMainRoutes[role] || [];

  const hasPrefixAccess = mainRoutes.some(
    (mainRoute) => path === mainRoute || path.startsWith(`${mainRoute}/`)
  );

  const routeExists = router.resolve(path).matched.length > 0;

  return hasPrefixAccess && routeExists;
}

router.beforeEach((to, from, next) => {
  const loggedIn = isLoggedIn();
  const role = getUserRole();

  if (to.meta.requiresAuth && !loggedIn) {
    return next({ name: 'Login' });
  }

  if (to.meta.requiresGuest && loggedIn) {
    const firstRoute = roleMainRoutes[role]?.[0] || '/dashboard';
    return next({ path: firstRoute });
  }

  if (to.meta.requiresAuth && role) {
    if (!hasAccess(to.fullPath, role)) {
      const firstRoute = roleMainRoutes[role]?.[0] || '/dashboard';
      return next({ path: firstRoute });
    }
  }

  next();
});

export default router;
