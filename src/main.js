import { createApp } from 'vue'
import App from './App.vue';
import router from './router';
import '../src/css/app.css'
import '../src/css/tailwind.css'

createApp(App).use(router).mount('#app')
