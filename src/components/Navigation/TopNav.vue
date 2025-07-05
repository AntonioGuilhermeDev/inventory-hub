<template>
  <header class="w-full h-32">
    <div class="fixed left-0 top-0 h-16 w-full bg-white shadow z-50">
      <div class="relative flex items-center justify-between h-full px-4">
        <div class="flex items-center gap-2">
          <button
            data-drawer-target="default-sidebar"
            data-drawer-toggle="default-sidebar"
            aria-controls="default-sidebar"
            type="button"
            class="lg:hidden p-2 text-md rounded-lg focus:outline-none"
            @click="$emit('toggle-sidebar')"
          >
            <span class="sr-only">Open sidebar</span>
            <font-awesome-icon :icon="['fas', 'bars']" class="text-brand-green" />
          </button>

          <img src="../../assets/logo.svg" alt="Logo" class="h-12 w-auto object-contain" />
          <h1 class="text-header text-brand-green font-semibold text-lg">InventoryHub</h1>
        </div>

        <ProfileImage />
      </div>
    </div>
  </header>
</template>

<script>
  import ProfileImage from './ProfileImage.vue';

  export default {
    name: 'TopNav',
    components: {
      ProfileImage,
    },
  };
</script>
