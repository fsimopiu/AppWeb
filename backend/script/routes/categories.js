import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Route pour récupérer une catégorie spécifique ou toutes les catégories
router.get('/:id?', async (req, res) => {
  const id_categorie = req.params.id ? parseInt(req.params.id) : undefined;

  try {
    if (id_categorie) {
      const categorie = await prisma.categorie.findUnique({
        where: { id_categorie },
        include: { service: true },
      });
      if (categorie) res.status(200).json(categorie);
      else res.status(404).json({ message: 'Catégorie non trouvée' });
    } else {
      const categories = await prisma.categorie.findMany({ include: { service: true } });
      res.status(200).json(categories);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

export default router;
