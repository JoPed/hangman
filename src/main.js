import { createApp } from 'vue'
import App from './App.vue';
import router from './router';
import '../src/css/app.css'
import '../src/css/tailwind.css'
import {library} from '@fortawesome/fontawesome-svg-core';
import {faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faXmark);



createApp(App).use(router)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
