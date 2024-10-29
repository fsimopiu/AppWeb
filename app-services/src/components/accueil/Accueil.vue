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
            <main class="flex-1 p-8 bg-gray-100 text-black h-full">
                
                <div class="h-full w-full flex flex-col items-center justify-center p-8 bg-gray-100">
                    <div class="bienvenue text-center">
                        <h1 class="text-4xl font-bold mb-4 text-purple-700">Réservations de services sur Toulouse</h1>
                        <img src="./../../assets/toulouse.jpeg" alt="Image de Toulouse" class="image-style mx-auto">
                    </div>

                    <div style="margin-top: 10px; font-size: larger">
                        <p class="font-serif leading-relaxed text-2xl text-gray-800">
                            Bienvenue sur notre plateforme de réservations dédiée aux services à Toulouse, où chaque utilisateur peut facilement trouver ou proposer un service 
                            dans des catégories variées, telles que la médecine, la coiffure, le bien-être, et bien plus encore. Notre objectif est de simplifier la prise de rendez-vous 
                            pour les demandeurs en leur permettant de consulter la disponibilité des prestataires qualifiés, de comparer les offres, et de réserver en quelques clics.
                            <br><br>
                            En tant que prestataire de services, vous pouvez également tirer parti de notre plateforme pour attirer une clientèle élargie en vous inscrivant et en présentant 
                            vos disponibilités, afin que chaque demandeur puisse réserver vos services en fonction de ses besoins. Grâce à notre interface intuitive et accessible, nous facilitons 
                            les échanges et renforçons la connexion entre les professionnels et les particuliers, rendant chaque expérience de réservation rapide, fiable et personnalisée.
                            <br><br>
                            Notre plateforme est conçue pour répondre aux exigences modernes de flexibilité et de praticité, vous offrant ainsi un moyen simple et efficace de gérer les réservations 
                            pour divers services dans la région toulousaine. Profitez d’une expérience fluide, sécurisée, et adaptée à vos attentes, et rejoignez dès maintenant notre communauté de services de confiance.
                        </p>
                    </div>

                    <!-- à supprimer : Exemple pour tester l'api backend -->
                    <div class="bg-white rounded-lg shadow-md p-6 max-w-lg w-full">
                        <h2 class="text-2xl font-semibold text-purple-600 mb-4">J'affiche les comptes</h2>
                        <ul class="list-disc list-inside">
                            <li v-for="compte in comptes" :key="compte.id_compte" class="text-gray-700">
                                {{ compte.nom }} - {{ compte.prenom }}
                            </li>
                        </ul>
                    </div>
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

    import compteServices from '../../services/comptesServices';

    export default {
    data() {
        return {
        comptes: []
        };
    },
    async created() {
        try {
        const response = await compteServices.getComptes();
        this.comptes = response.data;
        console.log(this.comptes);
        } catch (error) {
        console.error("Erreur lors de la récupération des comptes:", error);
        }
    }
    };
</script>
