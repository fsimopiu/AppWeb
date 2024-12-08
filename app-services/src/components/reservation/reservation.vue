<template>
  <div>
    <h1>Mes Réservations</h1>
    <div v-if="reservations.length">
      <ul>
        <li v-for="reservation in reservations" :key="reservation.id_reservation">
          <p><strong>Date :</strong> {{ reservation.date_rdv }}</p>
          <p><strong>Heure :</strong> {{ reservation.time_rdv }}</p>
          <p><strong>Service :</strong> {{ reservation.service.titre }}</p>
          <p><strong>Adresse :</strong> {{ reservation.service.adresse }}</p>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Aucune réservation trouvée.</p>
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
    axios
      .get(`http://localhost:3000/api/reservations?id_client=${id}`)
      .then((response) => {
        this.reservations = response.data;
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des réservations :', error);
      });
  },
};
</script>
