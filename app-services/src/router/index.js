import { createRouter, createWebHistory } from 'vue-router';
import Structure from '../components/structure/Structure.vue';
import Case_services from '../components/services/Case_services.vue'; // Add this line
import Page_Services from '../components/services/Page_Services.vue'; // Add this line
import Service_Details from '../components/services/Service_Details.vue';


const routes = [
    {
        path: '/',
        redirect: '/Accueil'
    },
    {
        path: '/Accueil',
        component: Structure
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
    }

]

const router = createRouter({
    history: createWebHistory('/'),
    routes
})

export default router