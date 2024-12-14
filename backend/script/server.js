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

// Middleware de débogage pour afficher toutes les requetes qui arrive au serv
/*app.use((req, res, next) => {
  console.log(`[DEBUG] Requête reçue : ${req.method} ${req.url}`);
  console.log(`[DEBUG] Corps de la requête :`, req.body);
  next();
});*/

// Autoriser les requêtes depuis http://localhost:5173
app.use(cors({
  origin: 'http://localhost:5173' 
}));

// Charger les routes
app.use('/api/comptes', comptesRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/reservations', reservationsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/connexion/login', loginRoutes);
app.use('/api/connexion/register', registerRoutes);

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
