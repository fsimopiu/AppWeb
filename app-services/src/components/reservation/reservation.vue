<template>
  <div class="reservations-container p-6">
    <h2 class="text-2xl font-bold mb-4">Mes Réservations</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="reservation in reservations"
        :key="reservation.id_reservation"
        class="card bg-white shadow-md p-4 rounded-lg border border-gray-200"
      >
        <!-- Affichage des informations de la réservation -->
        <p class="text-lg font-semibold">Date : <span class="font-normal">{{ reservation.date_rdv }}</span></p>
        <p class="text-lg font-semibold">Heure : <span class="font-normal">{{ reservation.time_rdv }}</span></p>
        <p class="text-lg font-semibold">Service : <span class="font-normal">{{ reservation.service.titre }}</span></p>
        <p class="text-lg font-semibold">Adresse : <span class="font-normal">{{ reservation.service.adresse }}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
  name: 'ReservationsPage',
  data() {
    return {
      reservations: [],
    };
  },
  setup() {
    const route = useRoute();
    return { route };
  },
  mounted() {
    const id = this.route.params.id;
    const type = this.route.query.type;

    const queryParam = type === '1' ? 'id_prestataire' : 'id_client';


    axios
      .get(`http://localhost:3000/api/reservations?${queryParam}=${id}`)
      .then((response) => {
        this.reservations = response.data;
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des réservations :', error);
      });
  },
};
</script>
