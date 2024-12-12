// api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // L'URL du backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {

  // Service pour créer un nouveau service
  createService(serviceData) {
    return apiClient.post('/services/create', serviceData);
  },
}
