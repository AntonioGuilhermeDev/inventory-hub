<template>
  <div class="bg-brand-body min-h-screen">
    <TopNav @toggle-sidebar="sidebarOpen = !sidebarOpen" />
    <SideBar :open="sidebarOpen" />

    <div :class="['pt-16 transition-padding duration-300', sidebarOpen ? 'pl-64' : 'pl-0']">
      <router-view />
    </div>
  </div>
</template>

<script>
  import TopNav from './components/Navigation/TopNav.vue';
  import SideBar from './components/Navigation/SideBar.vue';

  export default {
    components: { TopNav, SideBar },
    data() {
      return {
        sidebarOpen: false,
      };
    },
  };
</script>
