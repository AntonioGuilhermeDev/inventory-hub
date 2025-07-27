<template>
  <div class="p-6">
    <p v-if="users.length === 0" class="mt-4 text-gray-500 text-center">
      Nenhum usuário encontrado.
    </p>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="user in paginatedUsers"
        :key="user.id"
        class="max-w-sm bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <div class="p-6 flex items-center justify-between">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-brand-green">
            {{ user.nome }} {{ user.sobrenome }}
          </h5>
          <div class="flex space-x-4">
            <button
              @click="editUser(user.id)"
              class="text-gray-700 hover:text-blue-800 font-semibold text-lg rounded-lg"
            >
              <font-awesome-icon :icon="['fas', 'pencil']" />
            </button>
            <button
              @click="deleteUser(user.id)"
              class="text-gray-700 hover:text-red-800 font-semibold text-lg rounded-lg"
            >
              <font-awesome-icon :icon="['fas', 'trash']" />
            </button>
          </div>
        </div>
        <div class="px-6">
          <p class="mb-2 font-normal text-gray-700">
            {{ user.id }}
          </p>
          <p class="mb-2 font-normal text-gray-700">
            {{ translateRole(user.role) }}
          </p>
          <p class="mb-8 font-normal text-gray-700">
            {{ user.establishment }}
          </p>
        </div>
      </div>
    </div>

    <div class="flex justify-center mt-6 space-x-2">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-3 py-1 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
      >
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
      </button>

      <button
        v-for="page in totalPages"
        :key="page"
        @click="goToPage(page)"
        :class="[
          'px-3 py-1 rounded-full border border-gray-300 hover:bg-gray-100',
          currentPage === page ? 'bg-brand-orange text-white' : 'bg-white text-gray-700',
        ]"
      >
        {{ page }}
      </button>

      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
      >
        <font-awesome-icon :icon="['fas', 'chevron-right']" />
      </button>
    </div>
  </div>
</template>

<script>
  import { getUsers } from '../../services/userService';
  import { getEstablishmentRazaoSocial } from '../../services/establishmentService';
  import { translateRole } from '../../utils/utils';
  export default {
    name: 'UserList',
    data() {
      return {
        users: [],
        currentPage: 1,
        perPage: 6,
      };
    },
    computed: {
      totalPages() {
        return Math.ceil(this.users.length / this.perPage);
      },
      paginatedUsers() {
        const start = (this.currentPage - 1) * this.perPage;
        return this.users.slice(start, start + this.perPage);
      },
    },
    mounted() {
      this.fetchUsers();
    },
    methods: {
      async fetchUsers() {
        try {
          this.users = await getUsers();
          this.users.sort((a, b) => a.id - b.id);

          for (const user of this.users) {
            const establishmentName = await getEstablishmentRazaoSocial(user.estabelecimento_id);
            user.establishment = establishmentName;
          }
        } catch (error) {
          console.error('Erro ao carregar usuários:', error);
        }
      },
      prevPage() {
        if (this.currentPage > 1) this.currentPage--;
      },
      nextPage() {
        if (this.currentPage < this.totalPages) this.currentPage++;
      },
      goToPage(page) {
        this.currentPage = page;
      },
      translateRole,
    },
  };
</script>
