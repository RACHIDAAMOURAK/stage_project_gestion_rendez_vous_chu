# Gestion des Rendez-vous CHU

Ce projet a été réalisé dans le cadre d’un stage au sein du Centre Hospitalier Universitaire (CHU) de Fès.

## Description générale

Ce projet est une application web complète de gestion des rendez-vous hospitaliers, développée pour répondre aux besoins des patients, médecins et administrateurs du CHU.

### 1. Backend (Spring Boot)
- API REST sécurisée pour la gestion des utilisateurs (patients, médecins, admin), des rendez-vous, des disponibilités, des spécialités, etc.
- Authentification JWT, gestion des rôles et droits d’accès.
- Gestion des créneaux horaires, prise de rendez-vous, annulation, historique.
- Documentation API (Swagger/Postman).

### 2. Frontend (Angular)
- Interface moderne et responsive pour patients, médecins et administrateurs.
- Prise de rendez-vous en ligne : sélection du médecin, de la spécialité, de la date et de l’heure.
- Tableau de bord personnalisé selon le rôle (patient, médecin, admin).
- Gestion des disponibilités pour les médecins.
- Inscription et connexion sécurisées, avec menu déroulant dynamique pour la sélection des spécialités.
- Notifications, résumé des rendez-vous, gestion du profil utilisateur.

### 3. Fonctionnalités principales
- Inscription/connexion avec gestion des rôles (patient/médecin/admin).
- Prise de rendez-vous avec filtrage par spécialité et médecin.
- Gestion des disponibilités côté médecin.
- Visualisation, modification et annulation des rendez-vous.
- Interface d’administration pour la gestion des utilisateurs, spécialités, etc.

### 4. Technologies utilisées
- Backend : Java, Spring Boot, Spring Security, JPA/Hibernate, MySQL/PostgreSQL.
- Frontend : Angular, Angular Material, RxJS.
- Authentification : JWT.
- Outils : Git, GitHub, Postman, Swagger.

### 5. Installation
Voir les dossiers `rdv-backend` et `rdv-frontend` pour les instructions spécifiques à chaque partie.
