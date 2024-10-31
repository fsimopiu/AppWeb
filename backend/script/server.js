import express from 'express';
import comptesRoutes from './routes/comptestest.js';
import categoriesRoutes from './routes/categories.js';
import reservationsRoutes from './routes/reservations.js';
import servicesRoutes from './routes/services.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// Charger les routes
app.use('/api/comptes', comptesRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/reservations', reservationsRoutes);
app.use('/api/services', servicesRoutes);

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
