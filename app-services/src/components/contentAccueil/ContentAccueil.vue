<template>
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
</template>


<script>
import compteServices from '../../services/comptesServices';

export default {
    name: 'ContentAccueil',
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
            console.error("Erreur lors de la récupération des comptes", error);
        };
        
    }
};
</script>

<style scoped src="./ContentAccueil.css"></style>
