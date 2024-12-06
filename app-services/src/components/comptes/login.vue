<template>
  <div class="login">
    <h1>Connexion</h1>
    <form @submit.prevent="loginUser">
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
      <button type="submit">Se connecter</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        mail: '',
        password: '',
      },
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await fetch('http://localhost:3000/api/comptes/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.formData),
        });

        const data = await response.json();
        if (response.ok) {
          alert('Connexion réussie.');
          console.log(data.user); // Vous pouvez stocker cet utilisateur dans un état global ou un token
          this.$router.push({ name: 'home' }); // Naviguer vers la page d'accueil ou tableau de bord
        } else {
          alert(`Erreur : ${data.message}`);
        }
      } catch (error) {
        console.error('Erreur lors de la connexion :', error);
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
