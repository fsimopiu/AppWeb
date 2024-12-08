import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const router = express.Router();
const prisma = new PrismaClient(); // Instance Prisma pour interagir avec la base de données

// Route POST : Inscription d'un utilisateur
router.post('/register', async (req, res) => {
    const { nom, prenom, mail, password, type } = req.body;

    try {
        // Vérifier si un utilisateur avec cet email existe déjà
        const existingUser = await prisma.compte.findUnique({
            where: { mail },
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà.' });
        }

        // Hashage du mot de passe pour des raisons de sécurité
        const hashedPassword = await bcrypt.hash(password, 10);

        // Création d'un nouvel utilisateur dans la base de données
        const newUser = await prisma.compte.create({
            data: {
                nom,
                prenom,
                mail,
                password: hashedPassword,
                type, // 0 pour client, 1 pour prestataire
            },
        });

        // Réponse en cas de succès
        res.status(201).json({ 
            message: 'Compte créé avec succès', 
            user: { id: newUser.id, nom: newUser.nom, prenom: newUser.prenom, type: newUser.type } // Ne pas renvoyer le mot de passe
        });
    } catch (error) {
        console.error('Erreur lors de la création de l’utilisateur :', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

export default router;
