<template>
  <div class="service_container">
    <Case_services
        v-for="service in services"
        :key="service.id_service"
        :id="service.id_service"
        :nom="service.compte.nom"
        :addr="service.adresse"
        :profession="service.profession"
        :image-src="getImagePath(service.id_categorie)"
    />
  </div>
</template>

<script>
import Case_services from './Case_services.vue';
import doctorImage from '../../assets/img_services/doctor.jpg';
import hairstylistImage from '../../assets/img_services/hairstylist.jpg';
import axios from 'axios';

export default {
  components: { Case_services },
  data() {
    return {
      services: [],
      images: {
        doctor: doctorImage,
        hairstylist: hairstylistImage
      }
    };
  },
  async created() {
    await this.fetchServices();
  },
  watch: {
    '$route.params.categoryId': 'fetchServices'
  },
  methods: {
    async fetchServices() {
      const categoryId = this.$route.params.categoryId;
      try {
        const response = await axios.get(`http://localhost:3000/api/services?id_categorie=${categoryId}`);
        this.services = response.data;
        console.log('Services fetched:', this.services);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      }
    },
    getImagePath(categoryId) {
      switch (categoryId) {
        case 1:
          return this.images.doctor;
        case 2:
          return this.images.hairstylist;
        default:
          return this.images.doctor;
      }
    }
  }
}
</script>

<style scoped>

.service-container > * {
  flex: 0 0 calc(50% - 32px);
  box-sizing: border-box;
}
</style>