<template>
  <div class="p-6">
    <table class="min-w-full border border-gray-300 rounded-md overflow-hidden">
      <thead class="bg-brand-orange">
        <tr>
          <th class="px-4 py-4 border-b border-gray-300 text-left text-white">ID</th>
          <th class="px-4 py-4 border-b border-gray-300 text-left text-white">Nome</th>
          <th class="px-4 py-4 border-b border-gray-300 text-left text-white">Estabelecimento</th>
          <th class="px-4 py-4 border-b border-gray-300 text-left text-white">SKU</th>
          <th class="px-4 py-4 border-b border-gray-300 text-left text-white">Preço</th>
          <th class="px-4 py-4 border-b border-gray-300 text-left text-white">Qtd.Estoque</th>
          <th
            class="px-4 py-2 border-b border-gray-300 text-center text-white"
            style="width: 100px"
          ></th>
          <th
            class="px-4 py-2 border-b border-gray-300 text-center text-white"
            style="width: 100px"
          ></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in paginatedProducts" :key="product.id" class="hover:bg-gray-100">
          <td class="px-4 py-2 border-b border-gray-300">{{ product.id }}</td>
          <td class="px-4 py-2 border-b border-gray-300">{{ product.nome }}</td>
          <td class="px-4 py-2 border-b border-gray-300">{{ product.establishment }}</td>
          <td class="px-4 py-2 border-b border-gray-300">{{ product.sku }}</td>
          <td class="px-4 py-2 border-b border-gray-300">{{ formatToCurrency(product.valor) }}</td>
          <td class="px-4 py-2 border-b border-gray-300">{{ product.estoque }}</td>
          <td class="px-4 py-2 border-b border-gray-300 text-center">
            <button
              @click="editProduct(product.id)"
              class="text-gray-700 hover:text-blue-800 font-semibold"
            >
              <font-awesome-icon :icon="['fas', 'pencil']" />
            </button>
          </td>
          <td class="px-4 py-2 border-b border-gray-300 text-center">
            <button
              @click="deleteProduct(product.id)"
              class="text-gray-700 hover:text-red-800 font-semibold"
            >
              <font-awesome-icon :icon="['fas', 'trash']" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-if="products.length === 0" class="mt-4 text-gray-500 text-center">
      Nenhum produto encontrado.
    </p>

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
  import { getProducts } from '../../services/productService';
  import { getEstablishmentRazaoSocial } from '../../services/establishmentService';
  import { formatToCurrency } from '../../utils/utils';
  export default {
    name: 'ProductList',
    data() {
      return {
        products: [],
        currentPage: 1,
        perPage: 11,
      };
    },
    computed: {
      totalPages() {
        return Math.ceil(this.products.length / this.perPage);
      },
      paginatedProducts() {
        const start = (this.currentPage - 1) * this.perPage;
        return this.products.slice(start, start + this.perPage);
      },
    },
    mounted() {
      this.fetchProducts();
    },
    methods: {
      async fetchProducts() {
        try {
          this.products = await getProducts();
          this.products.sort((a, b) => a.id - b.id);

          for (const product of this.products) {
            const establishmentName = await getEstablishmentRazaoSocial(product.estabelecimento_id);
            product.establishment = establishmentName;
          }
        } catch (error) {
          console.error('Erro ao carregar produtos:', error);
        }
      },
      formatToCurrency,
      prevPage() {
        if (this.currentPage > 1) this.currentPage--;
      },
      nextPage() {
        if (this.currentPage < this.totalPages) this.currentPage++;
      },
      goToPage(page) {
        this.currentPage = page;
      },
    },
  };
</script>
