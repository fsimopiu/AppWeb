<template>
  <div class="home_client">
    <h1>Bienvenue</h1>
    <p>Vous êtes :</p>
    <button @click="navigateTo('register', 0)">Client</button>
    <button @click="navigateTo('register', 1)">Prestataire</button>
  </div>
</template>

<script>
export default {
  methods: {
    navigateTo(route, type) {
      this.$router.push({ name: route, query: { type } });
    },
  },
};
</script>

<style>
/* Ajoutez votre style ici */
button {
  margin: 10px;
  padding: 10px 20px;
  cursor: pointer;
}
</style>
