<template>
  <img class="h-8 w-8 rounded-3xl object-contain" :src="imageLink" alt="user profile image" />
</template>

<script>
  export default {
    name: 'ProfileImage',
    data() {
      return {
        imageLink:
          'https://www.pngitem.com/pimgs/m/487-4876417_link-head-png-toon-link-face-png-transparent.png',
      };
    },
  };
</script>
