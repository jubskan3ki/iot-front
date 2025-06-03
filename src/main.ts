// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import {
	faCancel,
	faCog,
	faEdit,
	faHome,
	faPlus,
	faSave,
	faSearch,
	faTrash,
	faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';

// Styles globaux
import '@/styles/main.scss';

// Ajouter les icônes à la bibliothèque
library.add(faUser, faHome, faCog, faSearch, faPlus, faEdit, faTrash, faSave, faCancel, faHeart, faGithub, faTwitter);

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.component('FontAwesomeIcon', FontAwesomeIcon);

app.mount('#app');
