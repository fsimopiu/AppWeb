<template>
    <div class="page flex flex-col h-full w-full items-center">
        <!-- En-tête -->
        <header class="header w-full bg-blue-600 text-white py-4 px-6 shadow-md">
            <h1 class="text-3xl font-bold text-center">Offrir un Service</h1>
        </header>

        <div class="service-container bg-blue-200 shadow-md rounded-lg p-8 mt-6">
            <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Créez votre Service</h2>
            <form @submit.prevent="handleCreateService">
                <!-- Titre -->
                <div class="mb-4">
                    <label for="titre" class="block text-gray-700 font-bold mb-2">Titre</label>
                    <input 
                        type="text" 
                        id="titre" 
                        v-model="service.titre" 
                        class="input-field bg-white border border-gray-300 rounded w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="Entrez le titre du service" 
                        required>
                </div>

                <!-- Description -->
                <div class="mb-4">
                    <label for="description" class="block text-gray-700 font-bold mb-2">Description</label>
                    <textarea 
                        id="description" 
                        v-model="service.description" 
                        rows="4" 
                        class="input-field bg-white border border-gray-300 rounded w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="Entrez la description du service (100 mots environ)"
                        required>
                    </textarea>
                </div>

                <!-- Adresse -->
                <div class="mb-4">
                    <label for="adresse" class="block text-gray-700 font-bold mb-2">Adresse</label>
                    <input 
                        type="text" 
                        id="adresse" 
                        v-model="service.adresse" 
                        class="input-field bg-white border border-gray-300 rounded w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="Entrez l'adresse" 
                        required>
                </div>

                <!-- Profession -->
                <div class="mb-4">
                    <label for="profession" class="block text-gray-700 font-bold mb-2">Profession</label>
                    <input 
                        type="text" 
                        id="profession" 
                        v-model="service.profession" 
                        class="input-field bg-white border border-gray-300 rounded w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="Entrez la profession" 
                        required>
                </div>

                <!-- Catégorie -->
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Catégorie</label>
                    <b-dropdown class="w-full" variant="primary" size="lg" block>
                        <template #button-content>
                            <span v-if="selectedCategory">{{ selectedCategory.nom }}</span>
                            <span v-else>Choisir une catégorie</span>
                        </template>
                        <b-dropdown-item
                            v-for="categorie in categories"
                            :key="categorie.id"
                            @click="selectCategory(categorie)"
                        >
                            {{ categorie.nom }}
                        </b-dropdown-item>
                    </b-dropdown>
                </div>

                <!-- Boutons -->
                <div class="flex items-center justify-center mt-6 gap-6">
                    <button 
                        type="submit" 
                        class="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded shadow-lg transition-transform transform hover:scale-105">
                        Valider
                    </button>
                    <button 
                        style="background-color: #ff6347;" 
                        type="button" 
                        @click="redirectToHome"
                        class="btn hover:bg-red-600 text-white font-bold py-2 px-6 rounded shadow-lg transition-transform transform hover:scale-105">
                        Retour à l'accueil
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>


<script>
import categorieService from '../../services/categorieService';
import servicesService from '../../services/servicesService';
import { useUserStore } from '../../services/store/user';

export default {
    name: 'CreerService',
    data() {
        return {
            categories: [], // Liste des catégories
            selectedCategory: null, // Catégorie sélectionnée
            service: {
                titre: '',
                description: '',
                adresse: '',
                profession: '',
                id_categorie: null, // ID de la catégorie
            },
        };
    },
    async created() {
        try {
            // Charger les catégories
            const response = await categorieService.getCategories();
            this.categories = response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des catégories :', error);
        }
    },
    methods: {
        selectCategory(categorie) {
            // Mettre à jour la catégorie sélectionnée
            this.selectedCategory = categorie;
            this.service.id_categorie = categorie.id_categorie;
        },
        async handleCreateService() {
            const userStore = useUserStore();

            // Vérifiez que l'utilisateur est connecté
            if (!userStore.user) {
                alert("Veuillez vous connecter pour créer un service.");
                return;
            }

            try {
                // Ajout de l'ID du prestataire dans les données du service
                const serviceData = {
                    ...this.service,
                    id_prestataire: userStore.user.id_compte,
                };

                // Appel au service API pour créer le service
                console.log(serviceData);
                const response = await servicesService.createService(serviceData);

                alert('Service créé avec succès.');
                this.$router.push('/ReservationService/PageServices');
            } catch (error) {
                console.error('Erreur lors de la création du service :', error);
                alert(error.response?.data?.message || 'Une erreur serveur est survenue.');
            }
        },
        redirectToHome() {
            this.$router.push("/ReservationService/Accueil");
        },
    },
};
</script>

<style scoped>
.header {
    text-align: center;
}

.page {
    height: 100vh;
    background-image: url('./../../assets/fond_menu.avif');
    background-size: cover;
    background-repeat: no-repeat;
}

.service-container {
    width: 90%;
    max-width: 500px;
}
</style>
