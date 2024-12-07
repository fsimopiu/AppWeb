import { createRouter, createWebHistory } from 'vue-router';
import Structure from '../components/structure/Structure.vue';
import ContentAccueil from '../components/contentAccueil/ContentAccueil.vue'
import home_compte from '../components/comptes/home_compte.vue';
import Connexion from '../components/comptes/login.vue';
import Inscription from '../components/comptes/register.vue';


const routes = [
    {
        path: '/',
        redirect: '/ReservationService/Acceuil'
    },
    {
        path: '/ReservationService',
        component: Structure,
        children: [
            {
                path: 'Accueil',
                component: ContentAccueil
            },
            {
                path: 'choixCompte',
                component: home_compte,
                name: 'choix compte'
            },
            {
                path: 'Inscription',
                component: Inscription,
                name: 'Inscription'
            },
            {
                path: 'Connexion',
                component: Connexion,
                name: 'Connexion'
            }
        ]
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