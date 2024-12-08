import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Route pour récupérer une réservation spécifique ou toutes les réservations
router.get('/', async (req, res) => {
    const { id_reservation, date_rdv, time_rdv, id_service, id_client, id_prestataire } = req.query; // Récupérer les paramètres de la requête
  
    const filters = {}; // Objet pour construire les filtres
  
    // Validation et ajout des filtres en fonction des paramètres fournis
    if (id_reservation) {
        if (isNaN(id_reservation)) {
            return res.status(400).json({ message: 'id_reservation doit être un nombre.' });
        }
        filters.id_reservation = parseInt(id_reservation);
    }
    if (date_rdv) filters.date_rdv = { contains: date_rdv, mode: 'insensitive' }; // Recherche insensible à la casse
    if (time_rdv) filters.time_rdv = { contains: time_rdv, mode: 'insensitive' };
    if (id_service) {
        if (isNaN(id_service)) {
            return res.status(400).json({ message: 'id_service doit être un nombre.' });
        }
        filters.id_service = parseInt(id_service);
    }
    if (id_client) {
        if (isNaN(id_client)) {
            return res.status(400).json({ message: 'id_client doit être un nombre.' });
        }
        filters.id_client = parseInt(id_client);
    }
    if (id_prestataire) {
        if (isNaN(id_prestataire)) {
            return res.status(400).json({ message: 'id_prestataire doit être un nombre.' });
        }
        filters.id_prestataire = parseInt(id_prestataire);
    }
  
    try {
        // Récupérer les réservations en fonction des filtres
        const reservations = await prisma.reservation.findMany({
            where: filters, // Utiliser les filtres construits
            include: { service: true, compte_reservation_id_clientTocompte: true },
        });
  
        res.status(200).json(reservations);
    } catch (error) {
        console.error("Erreur de récupération des réservations:", error);
        res.status(500).json({ message: 'Erreur serveur', details: error.message });
    }
});

//route pour créer une nouvelle réservation
router.post('/', async (req, res) => {
    const { date_rdv, time_rdv, id_service, id_client, id_prestataire } = req.body;

    // Validation des données
    if (!date_rdv || !time_rdv || !id_service || !id_client || !id_prestataire) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    try {
        // Création de la nouvelle réservation
        const newReservation = await prisma.reservation.create({
            data: {
                date_rdv,
                time_rdv,
                id_service: parseInt(id_service),
                id_client: parseInt(id_client),
                id_prestataire: parseInt(id_prestataire)
            }
        });

        res.status(201).json(newReservation);
    } catch (error) {
        console.error("Erreur lors de la création de la réservation:", error);
        res.status(500).json({ message: 'Erreur serveur', details: error.message });
    }
});

export default router;
