import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import 'bootstrap/dist/css/bootstrap.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css';

import * as BootstrapVueNext from 'bootstrap-vue-next';



const app = createApp(App);
app.use(router);

// Enregistre tous les composants BootstrapVueNext globalement
for (const [key, component] of Object.entries(BootstrapVueNext)) {
    app.component(key, component);
}

app.mount('#app');

