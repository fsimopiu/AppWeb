-- Insérer des données

INSERT INTO categorie (nom, photo)
VALUES 
('Médecin', 'a completer'),
('Coiffeur', 'a completer');

INSERT INTO calendrier (lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche)
VALUES 
('08:00:00-16:00:00', '08:00:00-16:00:00', '08:00:00-16:00:00', '08:00:00-16:00:00', '08:00:00-16:00:00', '08:00:00-16:00:00', '08:00:00-16:00:00'),
('10:00:00-17:00:00', '10:00:00-17:00:00', '10:00:00-17:00:00', '10:00:00-17:00:00', '10:00:00-17:00:00', '10:00:00-17:00:00', '10:00:00-17:00:00');

INSERT INTO compte (nom, prenom, mail, type, password)
VALUES 
('Dubois', 'Pierre', 'pierre.dubois@email.com', 1, 'monSuperMotDePasse123'),
('Dupont', 'Antoine', 'antoine.dupont@email.com', 1, 'allezlUBB'),
('Daniel', 'Antoine', 'antoine.Daniel@email.com', 0, 'magie');

INSERT INTO service (titre, description, adresse, profession, id_categorie, id_calendrier, id_prestataire)
VALUES 
('Psychologue pour Enfant', 'Psychologue pour enfant. Je réalise un suivi régulier afin d aider au mieux votre enfant.', '4 rue camichel Toulouse 31100', 'Psychologue', 1, 1, 1),
('Coiffeur de star', 'Spécialiste en coiffure. J ai réalisé différentes coiffures originales. Je peux vous écrire votre liste de course dans votre chevelure, vous faire un MCD de votre base de donnee ou encore un schéma UML.', '41 rue clovis Marseille 13000', 'Hairware', 2, 2, 2);

INSERT INTO reservation (date_rdv, time_rdv, id_service, id_prestataire, id_client)
VALUES 
('2024-10-25', '10:00:00-11:00:00', 1, 1, 3), 
('2024-10-25', '14:00:00-15:00:00', 2, 2, 3);
