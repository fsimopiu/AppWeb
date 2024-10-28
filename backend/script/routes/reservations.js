import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Route pour récupérer une réservation spécifique ou toutes les réservations
router.get('/:id?', async (req, res) => {
  const id_reservation = req.params.id ? parseInt(req.params.id) : undefined;

  try {
    if (id_reservation) {
      const reservation = await prisma.reservation.findUnique({
        where: { id_reservation },
        include: { service: true, compte_reservation_id_clientTocompte: true },
      });
      if (reservation) res.status(200).json(reservation);
      else res.status(404).json({ message: 'Réservation non trouvée' });
    } else {
      const reservations = await prisma.reservation.findMany({
        include: { service: true, compte_reservation_id_clientTocompte: true },
      });
      res.status(200).json(reservations);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

export default router;
