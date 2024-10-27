<template>
  <div class = service_container>
    <!-- creer une case par service contenu dans services (services sauvegardés) -->
    <Case_services
        v-for="service in services"
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
import servicesData from './test_service.json';
export default {
  components: {Case_services},
  data() {
    return {
      services: servicesData,
      imagePath: imagePath
    };
  },
}
</script>

<style scoped>
.service_container{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.service_container > *{
  flex: 1 1 calc(33.333% - 32px); /* Adjust size and spacing */
  box-sizing: border-box;
}
</style>