<template>
  <div class="border border-black p-4
  box-border rounded overflow-auto shadow-lg
  bg-blue-500 flex flex-row">
    <div class="text-left">
      <p class="mb-12"> {{ nom }}</p>
      <p class="mb-5"> {{ addr }}</p>
      <p class="mb-5"> {{ profession }}</p>
    </div>
    <div>
      <img class="scaled-image" :src="imageSrc"/>
    </div>
  </div>
</template>

<script>
import imagePath from '../../assets/img_services/doctor.jpg';

export default {
  name: 'Case_services',
  props: {
    nom: {
      type: String,
      default: 'Jean Claude'
    },
    addr: {
      type: String,
      default: '5 Rue du Test'
    },
    profession: {
      type: String,
      default: 'Développeur'
    },
    imageSrc: {
      type: String,
      default: imagePath
    }
  }
}
</script>

<style scoped>
.scaled-image {
  max-height: 50%;
  max-width: 50%;
  object-fit: contain;
  margin-left: 2px;
}
</style>
