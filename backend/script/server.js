import cors from 'cors';
import express from 'express';
import categoriesRoutes from './routes/categories.js';
import comptesRoutes from './routes/comptes.js';
import reservationsRoutes from './routes/reservations.js';
import servicesRoutes from './routes/services.js';
import loginRoutes from './routes/login.js';
import registerRoutes from './routes/register.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// Autoriser les requêtes depuis l'origine spécifique (par exemple, http://localhost:5173)
// Configuration CORS
app.use(cors({
  origin: 'http://localhost:5173' // L'URL du frontend
}));

// Charger les routes
app.use('/api/comptes', comptesRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/reservations', reservationsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/comptes/register', loginRoutes);
app.use('/api/comptes/login', registerRoutes);

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
