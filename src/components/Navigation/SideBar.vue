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
    <div class="h-full flex flex-col">
      <div class="flex-1 px-3 pb-4 overflow-y-auto">
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

      <div class="p-4 border-t border-gray-700 bg-white">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <ProfileImage />
            <div class="flex flex-col">
              <span class="text-base">
                {{ userData?.user?.nome }} {{ userData?.user?.sobrenome }}
              </span>
              <span class="text-xs text-gray-400"> {{ translateRole(userData?.user?.role) }} </span>
            </div>
          </div>

          <div class="flex items-center">
            <div class="h-6 w-px bg-gray-600 mx-3"></div>
            <button
              @click="logout"
              class="p-1 text-brand-green hover:text-brand-orange transition-colors rounded-full cursor-pointer"
            >
              <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
  import { getUser, clearUser } from '../../utils/user';
  import ProfileImage from './ProfileImage.vue';

  export default {
    name: 'SideBar',
    components: {
      ProfileImage,
    },
    props: {
      open: Boolean,
      isLargeScreen: Boolean,
    },
    data() {
      return {
        menuItems: [],
        userData: null,
      };
    },
    created() {
      this.userData = getUser();
      const roleMenu = {
        OWNER: [
          { label: 'Dashboard', icon: 'chart-line', path: '/dashboard' },
          { label: 'Produtos', icon: 'box', path: '/produtos' },
          { label: 'Vendas', icon: 'shopping-cart', path: '/vendas' },
          { label: 'Usuários', icon: 'users', path: '/usuarios' },
          { label: 'Estabelecimentos', icon: 'store', path: '/estabelecimentos' },
        ],
        MANAGER: [
          { label: 'Produtos', icon: 'box', path: '/produtos' },
          { label: 'Vendas', icon: 'shopping-cart', path: '/vendas' },
          { label: 'Usuários', icon: 'users', path: '/usuarios' },
        ],
        SELLER: [
          { label: 'Produtos', icon: 'box', path: '/produtos' },
          { label: 'Vendas', icon: 'shopping-cart', path: '/vendas' },
        ],
      };

      if (this.userData && this.userData.user) {
        this.menuItems = roleMenu[this.userData.user.role] || [];
      }
    },
    methods: {
      logout() {
        clearUser();
        this.$emit('close-sidebar');
        this.$router.push('/login');
      },
      translateRole(role) {
        if (!role) return '';

        const roleTranslations = {
          OWNER: 'Proprietário',
          MANAGER: 'Gerente',
          SELLER: 'Vendedor',
        };

        return roleTranslations[role] || role;
      },
    },
  };
</script>
