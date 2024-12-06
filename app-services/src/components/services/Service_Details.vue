<template>
  <div v-if="service" class="service-details-container">
    <h1 class="service-title">{{ service.titre }}</h1>
    <p class="service-description">{{ service.description }}</p>
    <p class="service-address">{{ service.adresse }}</p>
    <p class="service-profession">{{ service.profession }}</p>
    <p v-if="service.compte" class="service-account">Nom du compte: {{ service.compte.nom }}</p>
    <p v-if="service.compte" class="service-account">Prénom du compte: {{ service.compte.prenom }}</p>
    <p v-if="service.categorie" class="service-category">Catégorie: {{ service.categorie.nom }}</p>
    <div v-if="service.calendrier" class="service-calendar">
      <p>Disponibilités:</p>
      <ul>
        <li>Lundi: {{ service.calendrier.lundi }}</li>
        <li>Mardi: {{ service.calendrier.mardi }}</li>
        <li>Mercredi: {{ service.calendrier.mercredi }}</li>
        <li>Jeudi: {{ service.calendrier.jeudi }}</li>
        <li>Vendredi: {{ service.calendrier.vendredi }}</li>
        <li>Samedi: {{ service.calendrier.samedi }}</li>
        <li>Dimanche: {{ service.calendrier.dimanche }}</li>
      </ul>
    </div>
  </div>
  <div v-else class="loading-container">
    <p>Loading...</p>
  </div>
</template>

<script>
import axios from 'axios';

export function getDisponibilites (jour, heureOuverture, reservations) {
  if (!heureOuverture[jour]) return [];
  const [openTime, closeTime] = heureOuverture[jour].split("-");
  const temps_creneaux = 1;

  const slots = [];
  let currentSlot = openTime;
  while (currentSlot < closeTime) {
    const [hours, minutes] = currentSlot.split(":");
    const nextSlot = new Date(0, 0, 0, hours + temps_creneaux, minutes).toTimeString().slice(0, 5);
    if (nextSlot >= closeTime) break;
    slots.push({ start: currentSlot, end: closeTime });
    currentSlot = nextSlot;
  }
  return slots.filter(slot => {
    return !reservations.some(res =>
        (slot.start >= res.start_time && slot.start < res.end_time) ||
        (slot.end > res.start_time && slot.end <= res.end_time)
    );
  });
}

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      service: null
    };
  },
  mounted() {
    this.fetchServiceDetails();
  },
  methods: {
    async fetchServiceDetails() {
      const serviceId = parseInt(this.id, 10);
      console.log('Fetching service details for ID:', serviceId);
      try {
        const response = await axios.get(`http://localhost:3000/api/services?id_service=${serviceId}`);
        this.service = response.data[0];
        console.log('Service fetched:', this.service);
        console.log('Profession du service:', this.service.profession);
        if (!this.service) {
          console.error('Service not found for ID:', this.id);
        }
      } catch (error) {
        console.error('Failed to fetch service:', error);
      }
    }
  }
}
</script>

<style scoped>
.service-details-container {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  max-width: 600px;
  margin: 20px auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.service-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.service-description,
.service-address,
.service-profession,
.service-account,
.service-category {
  font-size: 16px;
  margin-bottom: 8px;
}

.service-calendar {
  margin-top: 20px;
}

.service-calendar ul {
  list-style-type: none;
  padding: 0;
}

.service-calendar li {
  font-size: 14px;
  margin-bottom: 4px;
}

.loading-container {
  text-align: center;
  padding: 20px;
}
</style>