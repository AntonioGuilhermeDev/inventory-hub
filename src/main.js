import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faChartLine,
  faBox,
  faShoppingCart,
  faUsers,
  faStore,
  faSearch,
  faSignOutAlt,
  faBars,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faChevronLeft,
  faChevronRight,
  faTrash,
  faPencil,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faChartLine,
  faBox,
  faShoppingCart,
  faUsers,
  faStore,
  faSearch,
  faSignOutAlt,
  faBars,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faChevronLeft,
  faChevronRight,
  faTrash,
  faPencil
);

createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app');
