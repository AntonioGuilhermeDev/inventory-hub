<template>
  <div class="bg-brand-body min-h-screen">
    <TopNav @toggle-sidebar="sidebarOpen = !sidebarOpen" />
    <SideBar
      :open="sidebarOpen"
      :isLargeScreen="isLargeScreen"
      @close-sidebar="sidebarOpen = false"
    />
    <div :class="['transition-all duration-300', isLargeScreen ? 'pl-64' : '']">
      <router-view />
    </div>
  </div>
</template>

<script>
  import TopNav from '../components/Navigation/TopNav.vue';
  import SideBar from '../components/Navigation/SideBar.vue';

  export default {
    name: 'AppLayout',
    components: { TopNav, SideBar },
    data() {
      return {
        sidebarOpen: true,
        windowWidth: window.innerWidth,
      };
    },
    computed: {
      isLargeScreen() {
        return this.windowWidth >= 1024;
      },
    },
    mounted() {
      window.addEventListener('resize', this.handleResize);
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.handleResize);
    },
    methods: {
      handleResize() {
        this.windowWidth = window.innerWidth;
      },
    },
    watch: {
      $route() {
        if (!this.isLargeScreen) {
          this.sidebarOpen = false;
        }
      },
    },
  };
</script>
