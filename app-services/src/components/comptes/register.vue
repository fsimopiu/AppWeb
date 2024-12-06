<template>
  <div class="register">
    <h1>Inscription</h1>
    <form @submit.prevent="registerUser">
      <input
        v-model="formData.nom"
        placeholder="Nom"
        required
      />
      <input
        v-model="formData.prenom"
        placeholder="Prénom"
        required
      />
      <input
        v-model="formData.mail"
        placeholder="Email"
        type="email"
        required
      />
      <input
        v-model="formData.password"
        placeholder="Mot de passe"
        type="password"
        required
      />
      <button type="submit">S'inscrire</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        nom: '',
        prenom: '',
        mail: '',
        password: '',
        type: this.$route.query.type || 0, // Récupération du type depuis les paramètres
      },
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await fetch('http://localhost:3000/api/comptes/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.formData),
        });

        const data = await response.json();
        if (response.ok) {
          alert('Compte créé avec succès.');
          this.$router.push({ name: 'login' });
        } else {
          alert(`Erreur : ${data.message}`);
        }
      } catch (error) {
        console.error('Erreur lors de la création du compte :', error);
        alert('Erreur serveur.');
      }
    },
  },
};
</script>

<style>
/* Ajoutez votre style ici */
form {
  display: flex;
  flex-direction: column;
}
input {
  margin: 10px 0;
  padding: 10px;
}
button {
  padding: 10px 20px;
  cursor: pointer;
}
</style>