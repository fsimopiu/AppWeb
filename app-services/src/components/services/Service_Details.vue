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
    <div class="agenda">
      <vue-meeting-selector
          ref="meetingSelector"
          class="agenda_meeting-selector"
          v-model="reservations"
          :date="date"
          :loading="false"
          multi
          :meetings-days="reservationDay"
          @next-date="nextDate"
          @previous-date="previousDate"
          @update:modelValue="change"
      />
    </div>
  </div>
  <div v-else class="loading-container">
    <p>Loading...</p>
  </div>
</template>

<script>
import axios from 'axios';
import { defineComponent, ref } from "vue";
import VueMeetingSelector from "vue-meeting-selector";
import "vue-meeting-selector/dist/style.css";
import slotsGenerator from "./slotsGenerator.js";

export default defineComponent({
  components: {
    VueMeetingSelector
  },
  setup() {
    const reservations = ref([]);
    const reservationDay = ref([]);
    const date = ref(new Date());
    const service = ref (null);
    const meetingSelector = ref(null);


    const up = () => meetingSelector.value.previousMeetings();
    const down = () => meetingSelector.value.nextMeetings();

    const nextDate = () => {
      const d = new Date(date.value);
      const newDate = new Date(d.setDate(d.getDate() + 7));
      date.value = newDate;
      this.updateReservationDays(newDate);
    };

    const previousDate = () => {
      const d = new Date(date.value);
      d.setDate(d.getDate() - 7);
      const newDate = d < new Date() ? new Date() : d;
      date.value = newDate;
      this.updateReservationDays(newDate);
    };

    const change = () => {
      console.log(reservations.value);
    };

    return {
      reservations,
      reservationDay,
      date,
      meetingSelector,
      up,
      down,
      nextDate,
      previousDate,
      change,
      service,
    };
  },
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
        if (this.service) {
          await this.initreservationDay(this.service);
        }
      } catch (error) {
        console.error('Failed to fetch service:', error);
      }
    },
    async initreservationDay(service) {
      try {

        await this.updateReservationDays(service);
      } catch (error) {
        console.error('Failed to fetch service:', error);
      }
    },
    async updateReservationDays(service) {
      try {
        const response = await axios.get(`http://localhost:3000/api/services?id_calendrier=${service.calendrier.id_calendrier}`);
        const openingHours = response.data[0].calendrier;

        if (!openingHours) {
          console.error('No opening hours found for service:', service);
          return;
        }

        const daysOfWeek = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
        let reservationDaysArray = [];

        const newDate = new Date();

        daysOfWeek.forEach((day, index) => {
          if (openingHours[day]) {
            const [startTime, endTime] = openingHours[day].split('-');
            const start = { hours: parseInt(startTime.split(':')[0]), minutes: parseInt(startTime.split(':')[1]) };
            const end = { hours: parseInt(endTime.split(':')[0]), minutes: parseInt(endTime.split(':')[1]) };

            const dayIndex = (index + 1) % 7;
            const dayDate = new Date(newDate);
            dayDate.setDate(newDate.getDate() + (dayIndex - newDate.getDay() + 7) % 7);


            const daySlots = slotsGenerator(dayDate, 1, start, end, 30);
            reservationDaysArray.push(...daySlots);
            console.log('reservation days:', daySlots);
          }
        });
        this.reservationDay = reservationDaysArray;

        console.log('Updated reservation days:', this.reservationDay);
      } catch (error) {
        console.error('Failed to fetch service:', error);
      }
    }
  }
});
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

.agenda_meeting-selector {
  margin-top: 20px;
}
</style>