import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Route pour récupérer un service spécifique ou tous les services
router.get('/', async (req, res) => {
  const { id_service, titre, description, adresse, id_categorie, id_calendrier } = req.query; // Récupérer les paramètres de la requête

  const filters = {}; // Objet pour construire les filtres

  // Validation et ajout des filtres en fonction des paramètres fournis
  if (id_service) {
    if (isNaN(id_service)) {
      return res.status(400).json({ message: 'id_service doit être un nombre.' });
    }
    filters.id_service = parseInt(id_service);
  }
  if (titre) filters.titre = { contains: titre, mode: 'insensitive' }; // Recherche insensible à la casse
  if (description) filters.description = { contains: description, mode: 'insensitive' };
  if (adresse) filters.adresse = { contains: adresse, mode: 'insensitive' };
  if (id_categorie) {
    if (isNaN(id_categorie)) {
      return res.status(400).json({ message: 'id_categorie doit être un nombre.' });
    }
    filters.id_categorie = parseInt(id_categorie);
  }
  if (id_calendrier) {
    if (isNaN(id_calendrier)) {
      return res.status(400).json({ message: 'id_calendrier doit être un nombre.' });
    }
    filters.id_calendrier = parseInt(id_calendrier);
  }

  try {
    // Récupérer les services en fonction des filtres
    const services = await prisma.service.findMany({
      where: filters, // Utiliser les filtres construits
      include: { categorie: true, calendrier: true, compte: true },
    });

    res.status(200).json(services);
  } catch (error) {
    console.error("Erreur de récupération des services:", error);
    res.status(500).json({ message: 'Erreur serveur', details: error.message });
  }
});

export default router;

