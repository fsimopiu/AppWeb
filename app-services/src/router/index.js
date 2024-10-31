import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '../components/accueil/Accueil.vue'
import Case_services from '../components/services/Case_services.vue'
import Page_Services from "../components/services/Page_Services.vue";

const routes = [
    {
        path: '/',
        redirect: '/Accueil'
    },
    {
        path: '/Accueil',
        component: Accueil
    },
    {
        path: '/test_case',
        component: Case_services
    },
    {
        path: '/test_page_serv',
        component: Page_Services
    },

]

const router = createRouter({
    history: createWebHistory('/'),
    routes
})

export default router