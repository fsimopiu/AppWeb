<template>
    <div class="page flex flex-col h-full w-full">
        <!-- Navbar -->
        <nav class="menu absolute top-0 left-0 w-full text-white p-4 shadow flex justify-between items-center">
            <div class="text-xl font-bold">Reservation des services</div>
            <div class="flex items-center">
                <div @click="redirectToAccount" style="margin-right: 20px; color:brown; cursor: pointer;"  class="flex items-center justify-center rounded-full">
                    <i class="fas fa-user text-6xl"></i> <!-- Icône d'utilisateur -->
                </div>
                <!-- Si l'utilisateur est connecté, affiche son nom abrégé -->
                <div v-if="userStore.user" class="flex items-center space-x-2">
                    <div 
                        style="margin-right: 30px; color:brown;"  
                        class="flex items-center justify-center text-black text-xl font-bold w-12 h-12">
                        {{ userStore.user.nom[0].toUpperCase() }}.  {{ userStore.user.prenom }}
                    </div>
                </div>

                <!-- Si l'utilisateur n'est pas connecté, affiche les boutons -->
                <div v-else class="flex flex-col space-y-2">
                    <button 
                        @click="redirectToConnexion"
                        class="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Se connecter
                    </button>

                    <button 
                        @click="redirectToSignup"
                        class="btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Créer un compte
                    </button>
                </div>
            </div>
        </nav>

        <div class="contenu flex pt-20">
            <!-- Sidebar -->
            <aside class="w-64 bg-gray-800 text-white p-4">
                <div class="relative mb-4">
                    <b-dropdown class="services m-md-2">
                        <template #button-content>
                            <div class="flex items-center space-x-2">
                                <span>
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                    </svg>
                                </span>
                                <span class="dropdown-text">Mes Catégories</span>
                            </div>
                        </template>
                        <!-- Redirection dynamique pour chaque catégorie -->
                        <b-dropdown-item
                            v-for="categorie in categories"
                            :key="categorie.id"
                            @click="goToCategory(categorie.id_categorie)"
                        >
                            {{ categorie.nom }}
                        </b-dropdown-item>
                    </b-dropdown>
                </div>
            </aside>

            <!-- Contenu principal -->
            <main class="flex-1 p-8 bg-gray-100 text-black h-full">
                <router-view></router-view>
            </main>
        </div>
         <!-- Footer -->
        <footer class="bg-blue-600 text-white">
            <p class="text-center">© 2024 Mon Application</p>
        </footer> 
    </div>
</template>


<style scoped src="./Structure.css"></style>

<script>
import categorieService from '../../services/categorieService';
import { useUserStore } from '../../services/store/user';

export default {
    name: 'Structure',
    data() {
        return {
            comptes: [],
            categories: [], // Liste des catégories
        };
    },
    setup() {
        const userStore = useUserStore(); // Accéder au store utilisateur
        return { userStore };
    },
    async created() {
        try {
            // Récupérer les catégories
            const responseCategories = await categorieService.getCategories();
            this.categories = responseCategories.data;
            console.log("Catégories récupérées :", this.categories);
        } catch (error) {
            console.error("Erreur lors de la récupération des données :", error);
        }
    },
    methods: {
        goToCategory(categoryId) {
            console.log('Redirection vers la catégorie :', categoryId);
            this.$router.push({ path: `/ReservationService/PageServices/${categoryId}` });
        },
        redirectToConnexion() {
            this.$router.push('/Connexion');
        },
        redirectToSignup() {
            this.$router.push('/CreerCompte');
        },
        redirectToAccount() {
            if (this.userStore.user) {
                this.$router.push(`/compte/${this.userStore.user.id_compte}`);
            }
        }
    }
};
</script>

