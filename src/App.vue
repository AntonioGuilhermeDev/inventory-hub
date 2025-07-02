<template>
  <div class="min-h-screen bg-brand-bg flex flex-col items-center justify-center">
    <h1 class="text-4xl font-bold text-brand-green font-sans mb-4">Tailwind v4 funcionando!</h1>
    <p class="text-lg text-brand-orange font-sans mb-2">Esta cor laranja é personalizada.</p>
    <button
      class="px-4 py-2 rounded bg-brand-orange hover:bg-brand-orange-hover text-white font-sans shadow"
    >
      Botão de teste
    </button>
    <div class="bg-brand-bg font-sans text-brand-green">Teste de cor e fonte!</div>
  </div>
  <div class="bg-brand-bg text-brand-green">Funcionando!</div>
</template>

<script>
  export default {
    name: 'App',
  };
</script>
