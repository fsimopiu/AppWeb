<template>
  <div>
    <h1>Mon Compte</h1>
    <div v-if="account">
      <p><strong>Nom :</strong> {{ account.nom }}</p>
      <p><strong>Prénom :</strong> {{ account.prenom }}</p>
      <p><strong>Email :</strong> {{ account.mail }}</p>
      <p><strong>Type :</strong> {{ account.type === 1 ? 'Prestataire' : 'Client' }}</p>
      <button @click="goToReservations">Consulter mes réservations</button>
    </div>
    <div v-else>
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
