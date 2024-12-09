import '@fortawesome/fontawesome-free/css/all.min.css';
import * as BootstrapVueNext from 'bootstrap-vue-next';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import 'bootstrap/dist/css/bootstrap.css';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import CreerCompte from './components/comptes/CreerCompte.vue';
import Connexion from './components/connexion/Connexion.vue';
import ContentAccueil from './components/contentAccueil/ContentAccueil.vue';
import router from './router';
import './style.css';


const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);

// Enregistre tous les composants BootstrapVueNext globalement
for (const [key, component] of Object.entries(BootstrapVueNext)) {
    app.component(key, component);
}

app.component("Accueil", ContentAccueil);
app.component("Connexion", Connexion);
app.component("CreerCompte", CreerCompte);
app.mount('#app');

