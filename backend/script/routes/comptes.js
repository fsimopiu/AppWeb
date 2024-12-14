import { PrismaClient } from '@prisma/client';
import express from 'express';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    const { id_compte, nom, prenom, mail } = req.query; // Récupérer les paramètres de la requête
  
    const filters = {}; 
  
    // Validation du paramètre id_compte
    if (id_compte) {
        if (isNaN(id_compte)) {
            return res.status(400).json({ message: 'id_compte doit être un nombre.' }); //erreur si l'id est pas un chiffre
        }
        filters.id_compte = parseInt(id_compte);
    }
    
    // Ajoutez les filtres en fonction des paramètres fournis
    if (nom) filters.nom = { contains: nom, mode: 'insensitive' }; // Recherche insensible à la casse
    if (prenom) filters.prenom = { contains: prenom, mode: 'insensitive' }; // Recherche insensible à la casse
    if (mail) filters.mail = { contains: mail, mode: 'insensitive' }; // Recherche insensible à la casse
  
    try {
        const comptes = await prisma.compte.findMany({
            where: filters, // Utiliser les filtres construits
            include: {
                service: true,
                reservation_reservation_id_clientTocompte: true,
                reservation_reservation_id_prestataireTocompte: true,
            },
        });
  
        res.status(200).json(comptes);
    } catch (error) {
        console.error("Erreur de récupération des comptes:", error);
        res.status(500).json({ message: 'Erreur serveur', details: error.message });
    }
});

export default router;
