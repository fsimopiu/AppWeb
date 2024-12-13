import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // L'URL du backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  getCategories(id) {
    return id ? apiClient.get(`/categories/${id}`) : apiClient.get('/categories');
  }
}
