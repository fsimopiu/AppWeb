-- Créer la base de données
-- En SQLite, la base de données est créée automatiquement lorsque tu l'ouvres

-- Créer les tables dans le bon ordre

CREATE TABLE IF NOT EXISTS categorie (
    id_categorie INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT,
    photo TEXT
);

CREATE TABLE IF NOT EXISTS calendrier (
    id_calendrier INTEGER PRIMARY KEY AUTOINCREMENT,
    lundi TEXT,
    mardi TEXT,
    mercredi TEXT,
    jeudi TEXT,
    vendredi TEXT,
    samedi TEXT,
    dimanche TEXT
);

-- Table compte : type : 0 pour client et 1 pour prestataire
CREATE TABLE IF NOT EXISTS compte (
    id_compte INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT,
    prenom TEXT,
    mail TEXT UNIQUE,
    type INTEGER,
    password TEXT
);

-- Table service : lien avec la table categorie et calendrier
CREATE TABLE IF NOT EXISTS service (
    id_service INTEGER PRIMARY KEY AUTOINCREMENT,
    titre TEXT,
    description TEXT,
    adresse TEXT,
    profession TEXT,
    id_categorie INTEGER,
    id_calendrier INTEGER,
    id_prestataire INTEGER,
    FOREIGN KEY (id_categorie) REFERENCES categorie(id_categorie),
    FOREIGN KEY (id_calendrier) REFERENCES calendrier(id_calendrier),
    FOREIGN KEY (id_prestataire) REFERENCES compte(id_compte)
);

-- Table reservation : lien avec service, prestataire et client (compte)
CREATE TABLE IF NOT EXISTS reservation (
    id_reservation INTEGER PRIMARY KEY AUTOINCREMENT,
    date_rdv TEXT,
    time_rdv TEXT,
    id_service INTEGER,
    id_prestataire INTEGER,
    id_client INTEGER,
    FOREIGN KEY (id_service) REFERENCES service(id_service),
    FOREIGN KEY (id_prestataire) REFERENCES compte(id_compte),
    FOREIGN KEY (id_client) REFERENCES compte(id_compte)
);

-- Insérer des données

-- Catégories
INSERT INTO categorie (nom, photo)
VALUES 
('Médecin', 'a completer'),
('Coiffeur', 'a completer');

-- Calendriers
INSERT INTO calendrier (lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche)
VALUES 
('08:00:00-16:00:00', '08:00:00-16:00:00', '08:00:00-16:00:00', '08:00:00-16:00:00', '08:00:00-16:00:00', '08:00:00-16:00:00', '08:00:00-16:00:00'),
('10:00:00-17:00:00', '10:00:00-17:00:00', '10:00:00-17:00:00', '10:00:00-17:00:00', '10:00:00-17:00:00', '10:00:00-17:00:00', '10:00:00-17:00:00');

-- Comptes utilisateurs
INSERT INTO compte (nom, prenom, mail, type, password)
VALUES 
('Dubois', 'Pierre', 'pierre.dubois@email.com', 1, '$2b$10$BFMm/HE6VCvb9vXelgk8J.82N55DfM3J1iajGn3ndAvxn27YFYBkm'),
('Dupont', 'Antoine', 'antoine.dupont@email.com', 1, '$2b$10$zzu7joasZ9.FGLCjG9SJxu.7A6HWGE7cfL2sA3s5rph2gdeVwwPHe'),
('Daniel', 'Antoine', 'antoine.Daniel@email.com', 0, '$2b$10$vqErNlZj7x3mR6MUOFnELuV68DQyhTaWYzWJCHLOHcYxmGMvjvf1O');

--('Dubois', 'Pierre', 'pierre.dubois@email.com', 1, 'monSuperMotDePasse123'),
--('Dupont', 'Antoine', 'antoine.dupont@email.com', 1, 'allezlUBB'),
--('Daniel', 'Antoine', 'antoine.Daniel@email.com', 0, 'magie');

-- Services (liens avec catégories, calendriers, et prestataires)
INSERT INTO service (titre, description, adresse, profession, id_categorie, id_calendrier, id_prestataire)
VALUES 
('Psychologue pour Enfant', 'Psychologue pour enfant. Je réalise un suivi régulier afin d aider au mieux votre enfant.', '4 rue camichel Toulouse 31100', 'Psychologue', 1, 1, 1),
('Coiffeur de star', 'Spécialiste en coiffure. J ai réalisé différentes coiffures originales. Je peux vous écrire votre liste de course dans votre chevelure, vous faire un MCD de votre base de donnee ou encore un schéma UML.', '41 rue clovis Marseille 13000', 'Hairware', 2, 2, 2);

-- Réservations
INSERT INTO reservation (date_rdv, time_rdv, id_service, id_prestataire, id_client)
VALUES 
('2024-12-15', '10:00:00-11:00:00', 1, 1, 3),
('2024-12-15', '14:00:00-15:00:00', 2, 2, 3);
