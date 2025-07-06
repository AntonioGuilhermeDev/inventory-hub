<template>
  <div class="h-screen w-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md flex flex-col items-center w-[430px]">
      <div class="overflow-hidden h-[235px]">
        <img
          src="../../assets/login-logo.svg"
          alt="Logo"
          class="w-auto object-contain -translate-y-10 relative"
        />
      </div>

      <p class="mb-4">Bem vindo! Faça login na sua conta.</p>
      <div class="w-full" :class="emailError ? 'mb-4' : 'mb-1'">
        <div class="relative">
          <font-awesome-icon
            :icon="['fas', 'envelope']"
            :class="[
              'absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5',
              isFocusedEmail ? 'text-brand-green' : 'text-gray-400',
            ]"
          />
          <label for="email" class="sr-only">Email</label>
          <input
            type="text"
            id="email"
            @focus="isFocusedEmail = true"
            @blur="isFocusedEmail = false"
            v-model="email"
            class="pl-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Endereço de e-mail"
            required
          />
        </div>
        <p class="text-red-500 text-sm mt-1 h-4" :class="{ invisible: !emailError }">
          {{ emailError || ' ' }}
        </p>
      </div>
      <div class="w-full" :class="passwordError ? 'mb-4' : 'mb-1'">
        <div class="relative">
          <font-awesome-icon
            :icon="['fas', 'lock']"
            :class="[
              'absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5',
              isFocusedPassword ? 'text-brand-green' : 'text-gray-400',
            ]"
          />
          <label for="password" class="sr-only">Senha</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            @focus="isFocusedPassword = true"
            @blur="isFocusedPassword = false"
            v-model="password"
            class="pl-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Senha"
            required
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-brand-green focus:outline-none"
          >
            <font-awesome-icon :icon="showPassword ? ['fas', 'eye-slash'] : ['fas', 'eye']" />
          </button>
        </div>
        <p class="text-red-500 text-sm mt-1 h-4" :class="{ invisible: !passwordError }">
          {{ passwordError || ' ' }}
        </p>
      </div>

      <button
        v-if="email !== '' && password !== ''"
        type="button"
        class="text-white w-full bg-brand-orange hover:bg-brand-orange-hover focus:ring-4 focus:ring-brand-orange font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer"
        @click="login"
      >
        Entrar
      </button>
      <button
        v-else
        type="button"
        disabled
        class="text-white w-full bg-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 cursor-not-allowed opacity-50"
      >
        Entrar
      </button>
    </div>
  </div>
</template>

<script>
  import { login } from '../../services/authService';
  import { saveUser } from '../../utils/user';
  export default {
    name: 'LoginView',
    data() {
      return {
        email: '',
        password: '',
        isFocusedEmail: false,
        isFocusedPassword: false,
        showPassword: false,
        emailError: '',
        passwordError: '',
      };
    },
    methods: {
      validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      },
      validateFields() {
        let isValid = true;

        this.emailError = '';
        this.passwordError = '';

        if (!this.email) {
          this.emailError = 'O email é obrigatório.';
          isValid = false;
        } else if (!this.validateEmail(this.email)) {
          this.emailError = 'Insira um email válido.';
          isValid = false;
        }

        if (!this.password) {
          this.passwordError = 'A senha é obrigatória.';
          isValid = false;
        } else if (this.password.length < 6) {
          this.passwordError = 'A senha deve ter pelo menos 6 caracteres.';
          isValid = false;
        }

        return isValid;
      },
      async login() {
        if (!this.validateFields()) {
          return;
        }

        try {
          const response = await login(this.email, this.password);
          const { message, ...dataToStore } = response;
          saveUser(dataToStore);
          this.$router.push('/dashboard');
        } catch (error) {
          console.error('Erro ao logar:', error);
          this.passwordError = 'Email ou senha inválidos';
        }
      },
    },
  };
</script>
