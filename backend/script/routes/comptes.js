import { PrismaClient } from '@prisma/client';
import express from 'express';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    const { id_compte, nom, prenom, mail } = req.query; // Récupérer les paramètres de la requête
  
    const filters = {}; // Objet pour construire les filtres
  
    // Validation du paramètre id_compte
    if (id_compte) {
        if (isNaN(id_compte)) {
            return res.status(400).json({ message: 'id_compte doit être un nombre.' });
        }
        filters.id_compte = parseInt(id_compte);
    }
    
    // Ajoutez les filtres en fonction des paramètres fournis
    if (nom) filters.nom = { contains: nom, mode: 'insensitive' }; // Recherche insensible à la casse
    if (prenom) filters.prenom = { contains: prenom, mode: 'insensitive' };
    if (mail) filters.mail = { contains: mail, mode: 'insensitive' };
  
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

router.post('/create', async (req, res) => {
    const { nom, prenom, mail, mot_de_passe } = req.body; // Récupérer les données du corps de la requête

    // Validation des données d'entrée
    if (!nom || !prenom || !mail || !mot_de_passe) {
        return res.status(400).json({ message: 'Tous les champs sont requis : nom, prenom, mail, mot_de_passe.' });
    }

    try {
        // Vérifier si un compte avec le même email existe déjà
        const existingCompte = await prisma.compte.findUnique({
            where: { mail },
        });

        if (existingCompte) {
            return res.status(400).json({ message: 'Un compte avec cet email existe déjà.' });
        }

        // Créer un nouveau compte
        const newCompte = await prisma.compte.create({
            data: {
                nom,
                prenom,
                mail,
                mot_de_passe, // Assurez-vous de hacher le mot de passe en production (ex : avec bcrypt)
            },
        });

        res.status(201).json({
            message: 'Compte créé avec succès.',
            compte: newCompte,
        });
    } catch (error) {
        console.error('Erreur lors de la création du compte:', error);
        res.status(500).json({ message: 'Erreur serveur', details: error.message });
    }
});


export default router;
