import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
    const { mail, password } = req.body;

    try {
        const user = await prisma.compte.findUnique({
            where: { mail },
        });

        if (!user) {
            return res.status(400).json({ message: 'Utilisateur introuvable.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Mot de passe incorrect.' });
        }

        const { password: _, ...userWithoutPassword } = user;
        res.status(200).json({ message: 'Connexion réussie', user: userWithoutPassword });
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

export default router;