import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // L'URL du backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  getComptes(id) {
    return id ? apiClient.get(`/comptes/${id}`) : apiClient.get('/comptes');
  },

  createCompte(compteData) {
    return apiClient.post('/comptes/create', compteData);
  },
}
