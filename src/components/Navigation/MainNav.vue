<template>
  <header class="w-full h-32">
    <div class="fixed left-0 top-0 h-16 w-full bg-white">
      <div class="ml-15 flex h-full items-center px-4">
        <img src="/favicon.png" alt="Logo" class="h-10 object-contain" />
        <span class="text-header">Inventory Hub</span>
        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none">
            <li v-for="menuItem in menuItems" :key="menuItem" class="ml-20 h-full first:ml-5">
              <a
                href=""
                class="flex h-full text-base items-center py-2.5 hover:text-brand-green transition-colors duration-300"
              >
                {{ menuItem }}
              </a>
            </li>
            <div class="ml-70 flex h-full items-center">
              <a>Usuário</a>
            </div>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'MainNav',
    data() {
      return {
        menuItems: ['Dashboard', 'Produtos', 'Vendas', 'Usuários', 'Estabelecimentos'],
      };
    },
  };
</script>
