<template>
    <div class="page flex flex-col h-full w-full items-center justify-center">
        <!-- Page de connexion -->
        <div class="login-container bg-blue-200 shadow-md rounded-lg p-8">
            <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Connexion</h2>
            <form @submit.prevent="handleSubmit">
                <!-- Champ Email -->
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 font-bold mb-2">Adresse email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        v-model="email" 
                        class="input-field bg-white border border-gray-300 rounded w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="Entrez votre email">
                </div>
                <!-- Champ Mot de passe -->
                <div class="mb-4">
                    <label for="password" class="block text-gray-700 font-bold mb-2">Mot de passe</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        v-model="password" 
                        class="input-field bg-white border border-gray-300 rounded w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="Entrez votre mot de passe">
                </div>
                <!-- Bouton Valider -->
                <div class="flex items-center justify-start mb-4">
                    <button
                        :disabled="email == '' || password == ''" 
                        type="submit" 
                        class="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
                        Valider
                    </button>
                </div>
                <!-- Bouton Créer un compte -->
                <div class="flex items-center justify-end">
                    <button 
                        type="button" 
                        @click="redirectToSignup"
                        class="btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded">
                        Créer un compte
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useUserStore } from '../../services/store/user'; // Importer le store utilisateur

export default {
    name: "Connexion",
    data() {
        return {
            email: "", // Stocke l'adresse email saisie
            password: "" // Stocke le mot de passe saisi
        };
    },
    setup() {
        const userStore = useUserStore(); // Accéder au store utilisateur
        return { userStore };
    },
    methods: {
        async handleSubmit() {
            console.log("Email:", this.email);
            console.log("Password:", this.password);

            try {
                // Envoi de la requête de connexion
                const response = await axios.post('http://localhost:3000/api/connexion/login', {
                    mail: this.email,
                    password: this.password
                });

                // Gérer la réponse du serveur
                if (response.status === 200) {
                    console.log('Connexion réussie:', response.data);

                    // Stocker les données utilisateur dans le store
                    this.userStore.setUser(response.data.user);

                    // Redirection vers la page d'accueil
                    this.$router.push('/ReservationService/Accueil');
                }
            } catch (error) {
                if (error.response) {
                    console.log('Erreur:', error.response.data.message);
                    alert(error.response.data.message);
                } else {
                    console.log('Erreur serveur:', error);
                    alert('Une erreur serveur est survenue.');
                }
            }
        },
        redirectToSignup() {
            this.$router.push('/CreerCompte');
        }
    }
};
</script>


<style scoped>
.page {
    height: 100vh;
    background-image: url('./../../assets/fond_menu.avif');
    background-size: cover;
    background-repeat: no-repeat;
}

.signup-container {
    width: 90%;
    max-width: 400px;
}

.input-field {
    transition: all 0.3s ease-in-out;
}

.input-field:focus {
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
}

button {
    transition: background-color 0.3s ease;
}
</style>
