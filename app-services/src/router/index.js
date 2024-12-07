import { createRouter, createWebHistory } from 'vue-router';
import CreerCompte from '../components/comptes/CreerCompte.vue';
import Connexion from '../components/connexion/Connexion.vue';
import ContentAccueil from '../components/contentAccueil/ContentAccueil.vue';
import Structure from '../components/structure/Structure.vue';

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
        path: '/CreerCompte',
        component: CreerCompte
    }
    // {
    //     path: '/test_case',
    //     component: Case_services
    // },
    // {
    //     path: '/test_page_serv',
    //     component: Page_Services
    // },
    // {
    //     path: '/services/:id',
    //     component: Service_Details,
    //     props: true
    // }

]

const router = createRouter({
    history: createWebHistory('/'),
    routes
})

export default router