import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const router = express.Router();
const prisma = new PrismaClient();

// Route pour s'inscrire
router.post('/register', async (req, res) => {
    const { nom, prenom, mail, password, type } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.compte.findUnique({
        where: { mail },
    });

    if (existingUser) {
        return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà.' });
    }

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = await prisma.compte.create({
            data: {
                nom,
                prenom,
                mail,
                password: hashedPassword,
                type, // 0 pour client, 1 pour prestataire
            },
        });

        res.status(201).json({ message: 'Compte créé avec succès', user: newUser });
    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

export default router;