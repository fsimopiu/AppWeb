<template>
  <div>
    <Case_services
    nom="oui oui"
    addr="10 avenue du test"
    profession="beta testeur"
    image-src=imagePath
    />
  </div>
</template>

<script>
import Case_services from './Case_services.vue';
import imagePath from '../../assets/img_services/doctor.jpg';

export default {
  components: {Case_services}
}
</script>