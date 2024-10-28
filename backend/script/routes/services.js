import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Route pour récupérer un service spécifique ou tous les services
router.get('/:id?', async (req, res) => {
  const id_service = req.params.id ? parseInt(req.params.id) : undefined;

  try {
    if (id_service) {
      const service = await prisma.service.findUnique({
        where: { id_service },
        include: { categorie: true, calendrier: true, compte: true },
      });
      if (service) res.status(200).json(service);
      else res.status(404).json({ message: 'Service non trouvé' });
    } else {
      const services = await prisma.service.findMany({
        include: { categorie: true, calendrier: true, compte: true },
      });
      res.status(200).json(services);
    }
  } catch (error) {
    console.error("Erreur de récupération du service:", error);
    res.status(500).json({ message: 'Erreur serveur', details: error.message });
  }
});

export default router;
