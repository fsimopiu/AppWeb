import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Route pour récupérer une catégorie spécifique ou toutes les catégories
router.get('/', async (req, res) => {
  const { id_categorie, nom } = req.query; // Récupérer les paramètres de la requête

  const filters = {};

  // Validation et ajout des filtres en fonction des paramètres fournis
  if (id_categorie) {
    if (isNaN(id_categorie)) {
      return res.status(400).json({ message: 'id_categorie doit être un nombre.' }); //erreur si l'id est pas un chiffre
    }
    filters.id_categorie = parseInt(id_categorie);
  }
  if (nom) filters.nom = { contains: nom, mode: 'insensitive' }; // Recherche insensible à la casse

  try {
    // Récupérer les catégories en fonction des filtres
    const categories = await prisma.categorie.findMany({
      where: filters,
      include: { service: true },
    });

    res.status(200).json(categories);
  } catch (error) {
    console.error("Erreur de récupération des catégories:", error);
    res.status(500).json({ message: 'Erreur serveur', details: error.message });
  }
});

export default router;
