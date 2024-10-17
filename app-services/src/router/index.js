import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '/src/components/accueil/Accueil.vue'


const routes = [
    {
        path: '/',
        redirect: '/Accueil'
    },
    {
        path: '/Accueil',
        component: Accueil
    }
]

const router = createRouter({
    history: createWebHistory('/'),
    routes
})

export default router