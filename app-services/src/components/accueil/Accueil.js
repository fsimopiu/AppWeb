
export default {
  data() {
    return {
      comptes: []
    };
  },
  async created() {
    try {
      const response = await api.getComptes();
      this.comptes = response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des comptes:", error);
    }
  }
};