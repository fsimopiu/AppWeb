<template>
    <div class="page flex flex-col h-full w-full items-center justify-center">
        <!-- Page de création de compte -->
        <div class="signup-container  bg-blue-200 shadow-md rounded-lg p-8">
            <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Créer un compte</h2>
            <form @submit.prevent="handleSignup">
                <!-- Champ Nom -->
                <div class="mb-4">
                    <label for="nom" class="block text-gray-700 font-bold mb-2">Nom</label>
                    <input 
                        type="text" 
                        id="nom" 
                        name="nom" 
                        v-model="nom" 
                        class="input-field bg-white border border-gray-300 rounded w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="Entrez votre nom" 
                        required>
                </div>
                <!-- Champ Prénom -->
                <div class="mb-4">
                    <label for="prenom" class="block text-gray-700 font-bold mb-2">Prénom</label>
                    <input 
                        type="text" 
                        id="prenom" 
                        name="prenom" 
                        v-model="prenom" 
                        class="input-field bg-white border border-gray-300 rounded w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="Entrez votre prénom" 
                        required>
                </div>
                <!-- Choix Prestataire ou Client -->
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Type de compte</label>
                    <div class="flex space-x-4">
                        <label class="flex items-center">
                            <input type="radio" v-model="typeCompte" value="Prestataire" class="mr-2"> Prestataire
                        </label>
                        <label class="flex items-center">
                            <input type="radio" v-model="typeCompte" value="Client" class="mr-2"> Client
                        </label>
                    </div>
                </div>
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
                <!-- Champ Confirmation du mot de passe -->
                <div class="mb-6">
                    <label for="confirmPassword" class="block text-gray-700 font-bold mb-2">Confirmez votre mot de passe</label>
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        v-model="confirmPassword" 
                        class="input-field bg-white border border-gray-300 rounded w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="Confirmez votre mot de passe">
                </div>
                <!-- Bouton Valider -->
                <div class="flex items-center justify-center">
                    <button 
                        type="submit" 
                        :disabled="!isFormValid" 
                        class="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded disabled:opacity-50 disabled:cursor-not-allowed">
                        Valider
                    </button>
                </div>
                <!-- Retour à la page de connexion -->
                <div style="margin-top: 20px;" class="flex items-center justify-end">
                    <button 
                        type="button" 
                        @click="seConnecter"
                        class="btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded">
                        Se connecter
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>



<script>
export default {
    name: "CreerCompte",
    data() {
        return {
            nom: "", // Nom de l'utilisateur
            prenom: "", // Prénom
            typeCompte: "", // Type de compte
            email: "", // Adresse email
            password: "", // Mot de passe
            confirmPassword: "" // Confirmation mot de passe
        };
    },
    computed: {
        isFormValid() {
            // Vérifie si tous les champs sont remplis et si les mots de passe correspondent
            return (
                this.nom &&
                this.prenom &&
                this.typeCompte &&
                this.email &&
                this.password &&
                this.confirmPassword &&
                this.password === this.confirmPassword
            );
        }
    },
    methods: {
        async handleSignup() {
            if (!this.isFormValid) {
                alert("Veuillez remplir tous les champs et vérifier les mots de passe.");
                return;
            }

            console.log(JSON.stringify({
                        nom: this.nom,
                        prenom: this.prenom,
                        mail: this.email,
                        password: this.password,
                        type: this.typeCompte === "Prestataire" ? 1 : 0, // 1 pour Prestataire, 0 pour Client
                    }));

            try {
                // Appel API pour créer un compte
                const response = await fetch('http://localhost:3000/api/connexion/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nom: this.nom,
                        prenom: this.prenom,
                        mail: this.email,
                        password: this.password,
                        type: this.typeCompte === "Prestataire" ? 1 : 0, // 1 pour Prestataire, 0 pour Client
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Compte créé avec succès.');
                    this.$router.push('/Connexion'); // Redirige vers la page de connexion
                } else {
                    alert(`Erreur : ${data.message}`);
                }
            } catch (error) {
                console.error('Erreur lors de la création du compte :', error);
                alert("Une erreur serveur est survenue.");
            }
        },
        seConnecter() {
            // Redirige vers la page de connexion
            this.$router.push('/Connexion');
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