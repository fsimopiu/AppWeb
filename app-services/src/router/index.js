import { createRouter, createWebHistory } from 'vue-router';
import CreerCompte from '../components/comptes/CreerCompte.vue';
import Connexion from '../components/connexion/Connexion.vue';
import ContentAccueil from '../components/contentAccueil/ContentAccueil.vue';
import Structure from '../components/structure/Structure.vue';
import Case_services from '../components/services/Case_services.vue'; // Add this line
import Page_Services from '../components/services/Page_Services.vue'; // Add this line
import Service_Details from '../components/services/Service_Details.vue';


const routes = [
    {
        path: '/',
        redirect: '/ReservationService/Accueil'
    },
    {
        path: '/ReservationService',
        component: Structure,
        children: [
            {
                path: 'Accueil',
                component: ContentAccueil
            }
        ]
    },
    {
        path: '/Connexion',
        component: Connexion,
    },
    {
        path: '/test_case',
        component: Case_services
    },
    {
        path: '/test_page_serv',
        component: Page_Services
    },
    {
        path: '/services/:id',
        component: Service_Details,
        props: true
    },
    {
        path: '/CreerCompte',
        component: CreerCompte
    }

]

const router = createRouter({
    history: createWebHistory('/'),
    routes
})

export default router