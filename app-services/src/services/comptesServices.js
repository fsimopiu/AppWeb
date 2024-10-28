// api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // L'URL de ton backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  // Méthodes pour les comptes
  getComptes(id) {
    return id ? apiClient.get(`/comptes/${id}`) : apiClient.get('/comptes');
  }
}
