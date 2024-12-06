<template>
  <div v-if="service" class="service-details-container">
    <h1 class="service-title">{{ service.titre }}</h1>
    <p class="service-description">{{ service.description }}</p>
    <p class="service-address">{{ service.adresse }}</p>
    <p class="service-profession">{{ service.profession }}</p>
    <p v-if="service.compte" class="service-account">Nom du compte: {{ service.compte.nom }}</p>
    <p v-if="service.compte" class="service-account">Prénom du compte: {{ service.compte.prenom }}</p>
    <p v-if="service.categorie" class="service-category">Catégorie: {{ service.categorie.nom }}</p>
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
          console.log('Date fetch', new Date());
          await this.updateReservationDays(this.service, new Date());
        }
      } catch (error) {
        console.error('Failed to fetch service:', error);
      }
    },
    async updateReservationDays(service, date) {
      console.log('COUCOU');
      try {
        let response = await axios.get(`http://localhost:3000/api/services?id_calendrier=${service.calendrier.id_calendrier}`);
        const openingHours = response.data[0].calendrier;

        response = await axios.get(`http://localhost:3000/api/reservations?id_prestataire=${service.id_prestataire}`);
        const reservationsData = response.data;

        const reservations = reservationsData.map(reservation => ({
          date: new Date(reservation.date_rdv),
          time: reservation.time_rdv.split('-')[0] // Extract the start time
        }));

        if (!openingHours) {
          console.error('No opening hours found for service:', service);
          return;
        }

        const daysOfWeek = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
        let reservationDaysArray = [];

        const todayIndex = date.getDay(); // Get the specified day index (0 for Sunday, 1 for Monday, etc.)

        daysOfWeek.forEach((day, index) => {
          const adjustedIndex = (todayIndex + index) % 7;
          if (openingHours[daysOfWeek[adjustedIndex]]) {
            const [startTime, endTime] = openingHours[daysOfWeek[adjustedIndex]].split('-');
            const start = { hours: parseInt(startTime.split(':')[0]), minutes: parseInt(startTime.split(':')[1]) };
            const end = { hours: parseInt(endTime.split(':')[0]), minutes: parseInt(endTime.split(':')[1]) };

            const dayDate = new Date(date);
            dayDate.setDate(date.getDate() + index); // Set the date to the current day plus the index

            const daySlots = slotsGenerator(dayDate, 1, start, end, 60, reservations);
            reservationDaysArray.push(...daySlots);
          }
        });
        this.reservationDay = reservationDaysArray;

      } catch (error) {
        console.error('Failed to fetch service:', error);
      }
    },
    nextDate() {
      const d = new Date(this.date);
      const day = d.getDay();
      const diff = day === 1 ? 7 : (8 - day); // Calculate the difference to the next Monday
      const nextMonday = new Date(d);
      nextMonday.setDate(d.getDate() + diff);
      this.date = nextMonday;
      console.log('Next date:', this.date);
      this.updateReservationDays(this.service, this.date);
    },
    previousDate() {
      const d = new Date(this.date);
      const day = d.getDay();
      const diff = day === 1 ? -7 : -(day - 1); // Calculate the difference to the previous Monday
      const previousMonday = new Date(d);
      previousMonday.setDate(d.getDate() + diff);

      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to midnight for comparison

      if (previousMonday < today) {
        this.date = new Date();
      } else {
        this.date = previousMonday;
      }

      console.log('Previous date:', this.date);
      this.updateReservationDays(this.service, this.date);
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


.loading-container {
  text-align: center;
  padding: 20px;
}

</style>