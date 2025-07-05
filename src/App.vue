<template>
  <div class="bg-brand-body min-h-screen">
    <top-nav />
  </div>
</template>

<script>
  import TopNav from './components/Navigation/TopNav.vue';

  export default {
    name: 'App',
    components: {
      TopNav,
    },
  };
</script>
