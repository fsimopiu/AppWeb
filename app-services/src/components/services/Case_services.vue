<template>
  <div class="service-box border border-black p-4
  box-border rounded overflow-auto shadow-lg
  bg-white flex flex-row items-center"
       @click="navigatetoDetails">
    <div class="text-left flex-1">
      <p class="mb-2 font-bold text-lg"> {{ nom }}</p>
      <p class="mb-2 text-gray-600"> {{ addr }}</p>
      <p class="mb-2 text-gray-600"> {{ profession }}</p>
    </div>
    <div class="image-container">
      <img class="scaled-image" :src="imageSrc"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Case_services',
  props: {
    id: Number,
    nom: String,
    addr: String,
    profession: String,
    imageSrc: String
  },
  methods: {
    navigatetoDetails() {
      this.$router.push({path:`/ReservationService/service/${this.id}` });
    }
  }
}
</script>

<style scoped>
.service-box {
  transition: background-color 0.3s ease, transform 0.3s ease;
  cursor: pointer;
}

.service-box:hover {
  background-color: #f0f0f0;
  transform: scale(1.02);
}

.scaled-image {
  max-height: 100px;
  max-width: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.image-container {
  flex-shrink: 0;
  margin-left: 16px;
}
</style>