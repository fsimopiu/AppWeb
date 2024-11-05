<template>
  <div class = service_container>
    <!-- creer une case par service contenu dans services (services sauvegardés) -->
    <Case_services
        v-for="service in services"
        :id="service.id_service"
        :nom="service.compte.nom"
        :addr="service.adresse"
        :profession="service.profession"
        :image-src=imagePath
    />
  </div>
</template>

<script>
import Case_services from './Case_services.vue';
import imagePath from '../../assets/img_services/doctor.jpg';
import axios from 'axios';




export default {
  components: {Case_services},
  data() {
    return {
      services: [],
      imagePath: imagePath,
      selectedService: null
    };
  },
  async created(){
    try {
      const response = await axios.get('http://localhost:3000/api/services');
      this.services = response.data;
      console.log('Services fetched :', this.services);
    } catch (error) {
      console.error('Failed to fetch services :', error);
    }
  }
}
</script>
<style scoped>
.service_container{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 32px;
}
.service_container > *{
  flex: 0 0 calc(50% - 32px); /* Adjust size and spacing */
  box-sizing: border-box;
}
</style>