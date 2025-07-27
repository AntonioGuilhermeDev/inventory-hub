<template>
  <div class="px-8 py-2">
    <h1 class="text-header">Usuários</h1>

    <div
      class="w-full mx-auto mt-5 bg-white border border-gray-200 rounded-lg shadow-sm overflow-x-auto"
    >
      <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500">
        <li class="me-2">
          <router-link
            to="/usuarios"
            class="inline-block p-4 rounded-t-lg"
            :class="{
              'text-white bg-brand-green border-b-[4px]': $route.name === 'UserList',
              'hover:text-gray-600 hover:bg-gray-50': $route.name !== 'UserList',
            }"
          >
            Lista de Usuários
          </router-link>
        </li>
        <li class="me-2">
          <router-link
            to="/usuarios/criar"
            class="inline-block p-4 rounded-t-lg"
            :class="{
              'text-white bg-brand-green border-b-[4px]': $route.name === 'CreateUser',
              'hover:text-gray-600 hover:bg-gray-50': $route.name !== 'CreateUser',
            }"
          >
            Criar Usuários
          </router-link>
        </li>
      </ul>

      <div class="p-4">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UsuariosView',
  };
</script>
