// api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // L'URL du backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  // Méthodes pour les comptes
  getCategories(id) {
    return id ? apiClient.get(`/categories/${id}`) : apiClient.get('/categories');
  }
}
