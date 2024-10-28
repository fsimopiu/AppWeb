import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Route pour récupérer un compte spécifique ou tous les comptes
router.get('/:id?', async (req, res) => {
  const id_compte = req.params.id ? parseInt(req.params.id) : undefined;

  try {
    if (id_compte) {
      const compte = await prisma.compte.findUnique({
        where: { id_compte },
        include: {
          service: true,
          reservation_reservation_id_clientTocompte: true,
          reservation_reservation_id_prestataireTocompte: true,
        },
      });
      if (compte) res.status(200).json(compte);
      else res.status(404).json({ message: 'Compte non trouvé' });
    } else {
      const comptes = await prisma.compte.findMany();
      res.status(200).json(comptes);
    }
  } catch (error) {
    console.error("Erreur de récupération du compte:", error);
    res.status(500).json({ message: 'Erreur serveur', details: error.message });
  }
});

export default router;
