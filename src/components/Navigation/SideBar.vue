<template>
  <aside
    id="logo-sidebar"
    :class="[
      'fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform border-r border-gray-700 bg-brand-sidebar',
      isLargeScreen
        ? open
          ? 'translate-x-0'
          : '-translate-x-full sm:translate-x-0'
        : open
          ? 'translate-x-0'
          : '-translate-x-full',
      !isLargeScreen ? 'bg-opacity-95 backdrop-blur-md' : '',
    ]"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 pb-4 overflow-y-auto bg-brand-sidebar">
      <ul class="space-y-2 font-medium">
        <li v-for="item in menuItems" :key="item.label">
          <router-link
            :to="item.path"
            class="flex items-center p-2 rounded-lg text-white hover:bg-brand-orange-hover transition-colors group"
            @click="$emit('close-sidebar')"
          >
            <font-awesome-icon
              :icon="['fas', item.icon]"
              class="w-5 h-5 text-white transition duration-75"
            />
            <span class="ms-3">{{ item.label }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
  export default {
    name: 'SideBar',
    props: {
      open: Boolean,
      isLargeScreen: Boolean,
    },
    data() {
      return {
        menuItems: [
          { label: 'Dashboard', icon: 'chart-line', path: '/dashboard' },
          { label: 'Produtos', icon: 'box', path: '/produtos' },
          { label: 'Vendas', icon: 'shopping-cart', path: '/vendas' },
          { label: 'Usuários', icon: 'users', path: '/usuarios' },
          { label: 'Estabelecimentos', icon: 'store', path: '/estabelecimentos' },
        ],
      };
    },
  };
</script>
