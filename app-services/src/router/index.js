import { createRouter, createWebHistory } from 'vue-router';
import Structure from '../components/structure/Structure.vue';
import ContentAccueil from '../components/contentAccueil/ContentAccueil.vue'

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