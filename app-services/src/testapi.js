// testAPI.js

// URL de base de l'API
const API_URL = 'http://localhost:3000/api';

// Fonction pour tester l'appel à l'API des services
async function fetchServices() {
  try {
    const response = await fetch(`${API_URL}/services`);
    
    if (!response.ok) {
      throw new Error(`Erreur de récupération : ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Tous les services :', data);
  } catch (error) {
    console.error('Erreur lors de la requête API :', error);
  }
}

// Appel de la fonction pour tester l'API
fetchServices();
