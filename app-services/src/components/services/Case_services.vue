<template>
  <div class="service-box border border-black p-4
  box-border rounded overflow-auto shadow-lg
  bg-blue-500 flex flex-row"
       @click="navigatetoDetails">
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
.scaled-image {
  max-height: 50%;
  max-width: 50%;
  object-fit: contain;
  margin-left: 2px;
}
.service-box {
  transition: background-color 0.3s ease;
}

.service-box:hover {
  background-color: #f0f0f0;
}

</style>
