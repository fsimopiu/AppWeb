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
      <p> Les créneaux disponibles ne sont que de 1 heure. Merci de votre compréhension.</p>
    </div>
    <button @click="reserveSlot" class="reserve-button">Reserver le(s) créneau(x) selectionné(s)</button>
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
import { useUserStore } from '../../services/store/user';
import { useRouter } from 'vue-router';

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
    const userStore = useUserStore();
    const router = useRouter();

    const up = () => meetingSelector.value.previousMeetings();
    const down = () => meetingSelector.value.nextMeetings();


    const change = () => {
      console.log('reservations dans change', reservations.value);
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
      userStore,
      router,
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
          await this.updateReservationDays(this.service, new Date());
        }
      } catch (error) {
        console.error('Failed to fetch service:', error);
      }
    },
    async updateReservationDays(service, date) {
      try {
        let response = await axios.get(`http://localhost:3000/api/services?id_calendrier=${service.calendrier.id_calendrier}`);
        const openingHours = response.data[0].calendrier;

        response = await axios.get(`http://localhost:3000/api/reservations?id_prestataire=${service.id_prestataire}`);
        const reservationsData = response.data;

        const reservations = reservationsData.map(reservation => {
          const localDate = new Date(reservation.date_rdv);
          const adjustedDate = new Date(localDate.getTime() - (localDate.getTimezoneOffset() * 60000));
          return {
            date: adjustedDate.toISOString(),
            start_time: reservation.time_rdv.split('-')[0],
            end_time: reservation.time_rdv.split('-')[1]
          };
        });


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

      this.updateReservationDays(this.service, this.date);
    },
    async reserveSlot() {
      if (!this.userStore.user || this.userStore.user.id_compte == null) {
        this.router.push('/Connexion');
        return;
      }

      if (this.reservations.length === 0) {
        alert('No slot selected');
        return;
      }

      const formattedReservations = this.reservations.map(reservation => {
        const date = new Date(reservation.date);
        const formattedDate = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD

        // Convert the time to local time and add one hour
        const localTime = new Date(reservation.date);
        const startTime = localTime.toTimeString().split(' ')[0]; // Get local time in HH:MM:SS format
        localTime.setHours(localTime.getHours() + 1);
        const endTime = localTime.toTimeString().split(' ')[0]; // Get local time + 1 hour in HH:MM:SS format

        const formattedTime = `${startTime}-${endTime}`; // Format time as HH:MM:SS-HH:MM:SS

        return {
          date_rdv: formattedDate,
          time_rdv: formattedTime,
          id_service: this.service.id_service,
          id_prestataire: this.service.id_prestataire,
          id_client: this.userStore.user.id_compte // Replace with actual client ID
        };
      });

      const confirmationMessage = formattedReservations.map(res =>
          `Date: ${res.date_rdv}, Time: ${res.time_rdv}`
      ).join('\n');

      if (confirm(`Do these slots work for you?\n\n${confirmationMessage}`)) {
        try {
          for (const reservation of formattedReservations) {
            await axios.post('http://localhost:3000/api/reservations', reservation);
          }
          alert('Reservations successful');
        } catch (error) {
          console.error('Failed to reserve slots:', error);
          alert('Failed to reserve slots');
        }
      } else {
        alert('Reservation cancelled');
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

.reserve-button {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.loading-container {
  text-align: center;
  padding: 20px;
}

</style>