<template>
    <div class="flex flex-col min-h-screen">
        <!-- Navbar -->
        <nav class="fixed top-0 left-0 w-full bg-blue-600 text-white p-4 shadow z-10 flex justify-between items-center">
            <div class="text-xl font-bold">Mon Application</div>
        </nav>

        <div class="flex flex-1 pt-16">
        <!-- Sidebar -->
            <aside class="w-64 bg-gray-800 text-white p-4 h-screen">
                <div class="relative mb-4">
                    <div>
                <b-dropdown class="services m-md-2" text="Mes Service">
                    <template #button-content>
                        <div style="display: inline;">
                            <span><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg></span>
                            <span class="dropdown-text">Mes services</span>
                        </div>
                    </template>
                    <b-dropdown-item class="block px-4 py-2 hover:bg-gray-600">First Action</b-dropdown-item>
                    <b-dropdown-item>Second Action</b-dropdown-item>
                    <b-dropdown-item>Third Action</b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item active>Active action</b-dropdown-item>
                    <b-dropdown-item disabled>Disabled action</b-dropdown-item>
                </b-dropdown>
                </div>
                    <!-- Bouton pour afficher le menu déroulant -->
                    <button @click="toggleMenu" class="flex items-center">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                        <span class="ml-2">Services</span>
                    </button>
                    <!-- Menu déroulant -->
                    <div v-if="isMenuOpen" class="mt-2 bg-gray-700 text-white rounded-md shadow-lg">
                        <a href="#" class="block px-4 py-2 hover:bg-gray-600">Service 1</a>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-600">Service 2</a>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-600">Service 3</a>
                    </div>
                </div>
            </aside>

            <!-- Contenu principal -->
            <main class="flex-1 p-8 bg-gray-100 overflow-y-auto text-black">
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
                </p>
            </main>
        </div>

    <!-- Footer -->
    <footer class="bg-blue-600 text-white p-4">
        <p class="text-center">© 2024 Mon Application</p>
    </footer>
    </div>
</template>

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
