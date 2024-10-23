import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    // Requête pour trouver le compte avec id_compte = 1
    const compte = await prisma.compte.findUnique({
      where: {
        id_compte: 1,
      },
    });
  
    console.log(compte);

    // Ajout d'une réservation
    const nouvelleReservation = await prisma.reservation.create({
    data: {
        date_rdv: new Date('2024-10-25'),      // La date du rendez-vous
        time_rdv: '10:00:00-11:00:00',         // L'heure du rendez-vous
        id_service: 1,                         // L'ID du service (1 pour "Psychologue pour Enfant")
        id_prestataire: 1,                     // L'ID du prestataire (1 pour "Pierre Dubois")
        id_client: 3,                          // L'ID du client (3 pour "Antoine Daniel")
    },
    });
    
    console.log(nouvelleReservation);

  }
   
main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });



//const compte = await prisma.$queryRaw`SELECT * FROM compte WHERE id_compte = 1`;
//console.log(compte);

/*
Bien que Prisma soit conçu pour éviter d'écrire des requêtes SQL manuelles, il est possible d'exécuter des commandes SQL brutes en cas de besoin avec la méthode prisma.$queryRaw. 
Cependant, ce n'est pas recommandé pour des cas d'usage simples comme celui-ci. Voici comment tu pourrais faire une requête SQL brute pour récupérer le compte d'id_compte = 1 :
*/