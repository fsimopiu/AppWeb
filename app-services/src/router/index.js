import { createRouter, createWebHistory } from 'vue-router';
import CreerCompte from '../components/comptes/CreerCompte.vue';
import pageCompte from '../components/comptes/pageCompte.vue';
import Connexion from '../components/connexion/Connexion.vue';
import ContentAccueil from '../components/contentAccueil/ContentAccueil.vue';
import ReservationsPage from '../components/reservation/reservation.vue';
import CreerService from '../components/services/CreerService.vue';
import Page_Services from '../components/services/Page_Services.vue';
import Service_Details from '../components/services/Service_Details.vue';
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
            },
            {
                path:'PageServices/:categoryId',
                component: Page_Services
            },
            {
                path: 'service/:id',
                component: Service_Details,
                props: true
            },
            {
                path: '/compte/:id', 
                name: 'page de compte',
                component: pageCompte
            },
            {   
                path: '/compte/:id/reservations', 
                name: 'Page Reservations ', 
                component: ReservationsPage 
            }
        ]
    },
    {
        path: '/Connexion',
        component: Connexion,
        name: 'Connexion'
    },

    {
        path: '/CreerCompte',
        component: CreerCompte,
        name: 'Inscription'
    },
    {
        path: '/CreerService',
        component: CreerService,
        name: 'CreerService'
    }
]

const router = createRouter({
    history: createWebHistory('/'),
    routes
})

export default router
/*,
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
            }*/