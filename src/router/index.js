import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../views/Dashboard/DashboardView.vue';
import ProdutosView from '../views/Produtos/ProdutosView.vue';
import VendasView from '../views/Vendas/VendasView.vue';
import UsuariosView from '../views/Usuarios/UsuariosView.vue';
import EstabelecimentosView from '../views/Estabelecimentos/EstabelecimentosView.vue';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardView,
  },
  {
    path: '/produtos',
    name: 'Produtos',
    component: ProdutosView,
  },
  {
    path: '/vendas',
    name: 'Vendas',
    component: VendasView,
  },
  {
    path: '/usuarios',
    name: 'Usuarios',
    component: UsuariosView,
  },
  {
    path: '/estabelecimentos',
    name: 'Estabelecimentos',
    component: EstabelecimentosView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
