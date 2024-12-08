-- CreateTable
CREATE TABLE "calendrier" (
    "id_calendrier" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lundi" TEXT,
    "mardi" TEXT,
    "mercredi" TEXT,
    "jeudi" TEXT,
    "vendredi" TEXT,
    "samedi" TEXT,
    "dimanche" TEXT
);

-- CreateTable
CREATE TABLE "categorie" (
    "id_categorie" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT,
    "photo" TEXT
);

-- CreateTable
CREATE TABLE "compte" (
    "id_compte" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT,
    "prenom" TEXT,
    "mail" TEXT,
    "type" INTEGER,
    "password" TEXT
);

-- CreateTable
CREATE TABLE "reservation" (
    "id_reservation" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date_rdv" TEXT,
    "time_rdv" TEXT,
    "id_service" INTEGER,
    "id_prestataire" INTEGER,
    "id_client" INTEGER,
    CONSTRAINT "reservation_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "compte" ("id_compte") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "reservation_id_prestataire_fkey" FOREIGN KEY ("id_prestataire") REFERENCES "compte" ("id_compte") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "reservation_id_service_fkey" FOREIGN KEY ("id_service") REFERENCES "service" ("id_service") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "service" (
    "id_service" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titre" TEXT,
    "description" TEXT,
    "adresse" TEXT,
    "profession" TEXT,
    "id_categorie" INTEGER,
    "id_calendrier" INTEGER,
    "id_prestataire" INTEGER,
    CONSTRAINT "service_id_prestataire_fkey" FOREIGN KEY ("id_prestataire") REFERENCES "compte" ("id_compte") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "service_id_calendrier_fkey" FOREIGN KEY ("id_calendrier") REFERENCES "calendrier" ("id_calendrier") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "service_id_categorie_fkey" FOREIGN KEY ("id_categorie") REFERENCES "categorie" ("id_categorie") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateIndex
CREATE UNIQUE INDEX "compte_mail_key" ON "compte"("mail");
