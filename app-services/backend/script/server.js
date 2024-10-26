//const express = require('express');
import express from 'express'
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

const app = express();
const PORT = 3000;

app.use(express.json());

// 1. Récupérer un compte spécifique ou tous les comptes
app.get('/api/comptes/:id?', async (req, res) => {
  const id_compte = req.params.id ? parseInt(req.params.id) : undefined;

  try {
    if (id_compte) {
      // Si un ID est fourni, recherche le compte spécifique
      const compte = await prisma.compte.findUnique({
        where: { id_compte: id_compte },
        include: { 
          service: true,
          reservation_reservation_id_clientTocompte: true,
          reservation_reservation_id_prestataireTocompte: true
        }
      });
      if (compte) res.status(200).json(compte);
      else res.status(404).json({ message: 'Compte non trouvé' });
    } else {
      // Si aucun ID, renvoie tous les comptes
      const comptes = await prisma.compte.findMany();
      res.status(200).json(comptes);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// 2. Récupérer un service spécifique ou tous les services
app.get('/api/services/:id?', async (req, res) => {
  const id_service = req.params.id ? parseInt(req.params.id) : undefined;

  try {
    if (id_service) {
      const service = await prisma.service.findUnique({
        where: { id_service: id_service },
        include: { categorie: true, calendrier: true, compte: true }
      });
      if (service) res.status(200).json(service);
      else res.status(404).json({ message: 'Service non trouvé' });
    } else {
      const services = await prisma.service.findMany({
        include: { categorie: true, calendrier: true, compte: true }
      });
      res.status(200).json(services);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// 3. Récupérer une réservation spécifique ou toutes les réservations
app.get('/api/reservations/:id?', async (req, res) => {
  const id_reservation = req.params.id ? parseInt(req.params.id) : undefined;

  try {
    if (id_reservation) {
      const reservation = await prisma.reservation.findUnique({
        where: { id_reservation: id_reservation },
        include: { service: true, compte_reservation_id_clientTocompte: true }
      });
      if (reservation) res.status(200).json(reservation);
      else res.status(404).json({ message: 'Réservation non trouvée' });
    } else {
      const reservations = await prisma.reservation.findMany({
        include: { service: true, compte_reservation_id_clientTocompte: true }
      });
      res.status(200).json(reservations);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// 4. Récupérer une catégorie spécifique ou toutes les catégories
app.get('/api/categories/:id?', async (req, res) => {
  const id_categorie = req.params.id ? parseInt(req.params.id) : undefined;

  try {
    if (id_categorie) {
      const categorie = await prisma.categorie.findUnique({
        where: { id_categorie: id_categorie },
        include: { service: true }
      });
      if (categorie) res.status(200).json(categorie);
      else res.status(404).json({ message: 'Catégorie non trouvée' });
    } else {
      const categories = await prisma.categorie.findMany({
        include: { service: true }
      });
      res.status(200).json(categories);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
