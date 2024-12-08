<template>
  <div class="compte-container p-6">
    <div v-if="account" class="account-card bg-white shadow-lg p-6 rounded-lg border border-gray-200">
      <h1 class="text-3xl font-semibold mb-6 text-center text-gray-700">Mon Compte</h1>
      <div class="account-details text-lg text-gray-700">
        <p><strong>Nom :</strong> {{ account.nom }}</p>
        <p><strong>Prénom :</strong> {{ account.prenom }}</p>
        <p><strong>Email :</strong> {{ account.mail }}</p>
        <p><strong>Type :</strong> {{ account.type === 1 ? 'Prestataire' : 'Client' }}</p>
      </div>
      <div class="text-center mt-6">
        <button
          @click="goToReservations"
          class="btn-reservation bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out"
        >
          Consulter mes réservations
        </button>
      </div>
    </div>
    <div v-else class="loading-state text-center text-xl text-gray-500">
      <p>Chargement...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'AccountPage',
  data() {
    return {
      account: null,
    };
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    return { route, router };
  },
  mounted() {
    const id = this.route.params.id;
    axios
      .get(`http://localhost:3000/api/comptes?id_compte=${id}`)
      .then((response) => {
        this.account = response.data[0]; // Supposons que l'API retourne un tableau
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des informations du compte :', error);
      });
  },
  methods: {
    goToReservations() {
      this.router.push(`/compte/${this.route.params.id}/reservations`);
    },
  },
};
</script>

<style scoped>
/* Container principal */
.compte-container {
  max-width: 800px;
  margin: 0 auto;
  padding-top: 50px;
}

/* Carte contenant les informations du compte */
.account-card {
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 30px;
  margin-top: 20px;
  text-align: left;
}

.account-details {
  margin-bottom: 20px;
}

.account-details p {
  margin: 10px 0;
}

/* Style du bouton "Consulter mes réservations" */
.btn-reservation {
  padding: 10px 30px;
  font-size: 18px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

/* Style du bouton au survol */
.btn-reservation:hover {
  background-color: #2d3748;
}

/* Message de chargement */
.loading-state {
  font-size: 1.25rem;
  color: #718096;
  margin-top: 30px;
}
</style>
