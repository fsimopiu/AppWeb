<template>
    <div class="page flex flex-col h-full w-full">
        <!-- Navbar -->
        <nav class="menu absolute top-0 left-0 w-full text-white p-4 shadow flex justify-between items-center">
            <div class="text-xl font-bold">Reservation des services</div>
            <div class="flex items-center">
                <div style="margin-right: 30px; color:brown"  class="flex items-center justify-center rounded-full">
                    <i class="fas fa-user text-6xl"></i> <!-- Icône d'utilisateur -->
                </div>
                <div class="flex flex-col space-y-2">
                    <button class="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Se connecter
                    </button>

                    <!-- Bouton Créer un compte -->
                    <button class="btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
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
                                <span><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg></span>
                                <span class="dropdown-text">Mes Catégories</span>
                            </div>
                        </template>
                        <b-dropdown-item>Cat1</b-dropdown-item>
                        <b-dropdown-item>Cat2</b-dropdown-item>
                        <b-dropdown-item>Cat3</b-dropdown-item>
                        <!-- <b-dropdown-divider></b-dropdown-divider> -->
                        <!-- <b-dropdown-item active>Active action</b-dropdown-item>
                        <b-dropdown-item disabled>Disabled action</b-dropdown-item> -->
                    </b-dropdown>
                </div>
            </aside>

            <!-- Contenu principal -->
            <main class="flex-1 p-8 bg-gray-100 text-black">
                
                <div class="h-full w-full">
                    <div class="bienvenue">

                    </div>
                    <h1 class="text-3xl font-bold mb-6">Bienvenue sur notre page d'accueil</h1>
                    <p class="mb-4">Dans un petit village niché entre les montagnes et la mer, les habitants se réveillaient chaque
                        matin au son des vagues et des oiseaux. Les rues pavées étaient bordées de maisons colorées, chacune racontant
                        une histoire à travers ses fenêtres et ses balcons fleuris. Au centre du village, une place animée accueillait
                        un marché où les artisans vendaient des produits locaux : du pain frais, des légumes croquants et des poteries artisanales.
                        Un jour, un étranger est arrivé, portant un chapeau large et un grand sourire. Il avait une étrange machine en bois qui faisait
                        des bruits amusants. Intrigués, les villageois se sont rassemblés autour de lui, et il a commencé à raconter des histoires incroyable
                        sur des contrées lointaines et des merveilles invisibles à l'œil nu. Les enfants, les yeux écarquillés, l'écoutaient attentivement,
                        rêvant d'aventures et de découvertes. Les adultes, d'abord sceptiques, ont commencé à sourire, se laissant emporter par l'enthousiasme
                        contagieux de l'étranger. Ce jour-là, le village a été plongé dans un tourbillon de joie et d'imagination, comme si le temps s'était arrêté pour accueillir la magie des récits.
                    s</p>
                </div>
                
            </main>
        </div>
         <!-- Footer -->
        <footer class="bg-blue-600 text-white">
            <p class="text-center">© 2024 Mon Application</p>
        </footer>  
    </div>
   
</template>

<style scoped src="./Accueil.css"></style>

<script>
    export default {
    data() {
        return {
        isMenuOpen: true, // Menu déroulant affiché par défaut
        };
    },
    methods: {
        toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen; // Permet de basculer l'état du menu
        },
    },
    };
</script>
