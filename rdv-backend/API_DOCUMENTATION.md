# API Documentation - Système de Gestion des Rendez-vous Hospitaliers

## Base URL
```
http://localhost:8080/api
```

## Endpoints par entité

### 1. Patients (`/patients`)

#### CRUD Basique
- `GET /patients` - Lister tous les patients
- `GET /patients/{id}` - Récupérer un patient par ID
- `POST /patients` - Créer un nouveau patient
- `PUT /patients/{id}` - Modifier un patient
- `DELETE /patients/{id}` - Supprimer un patient

#### Recherche
- `GET /patients/numero-secu/{numeroSecu}` - Récupérer par numéro de sécurité sociale
- `GET /patients/search?q={query}` - Rechercher des patients

### 2. Médecins (`/medecins`)

#### CRUD Basique
- `GET /medecins` - Lister tous les médecins
- `GET /medecins/{id}` - Récupérer un médecin par ID
- `POST /medecins` - Créer un nouveau médecin
- `PUT /medecins/{id}` - Modifier un médecin
- `DELETE /medecins/{id}` - Supprimer un médecin

#### Recherche
- `GET /medecins/numero-rpps/{numeroRPPS}` - Récupérer par numéro RPPS

### 3. Admins (`/admins`)

#### CRUD Basique
- `GET /admins` - Lister tous les admins
- `GET /admins/{id}` - Récupérer un admin par ID
- `POST /admins` - Créer un nouvel admin
- `PUT /admins/{id}` - Modifier un admin
- `DELETE /admins/{id}` - Supprimer un admin

#### Recherche
- `GET /admins/email/{email}` - Récupérer par email
- `GET /admins/niveau-acces/{niveauAcces}` - Récupérer par niveau d'accès

### 4. Utilisateurs (`/utilisateurs`)

#### CRUD Basique
- `GET /utilisateurs` - Lister tous les utilisateurs
- `GET /utilisateurs/{id}` - Récupérer un utilisateur par ID
- `POST /utilisateurs` - Créer un nouvel utilisateur
- `PUT /utilisateurs/{id}` - Modifier un utilisateur
- `DELETE /utilisateurs/{id}` - Supprimer un utilisateur

#### Recherche
- `GET /utilisateurs/email/{email}` - Récupérer par email

### 5. Rendez-vous (`/rendez-vous`)

#### CRUD Basique
- `GET /rendez-vous` - Lister tous les rendez-vous
- `GET /rendez-vous/{id}` - Récupérer un rendez-vous par ID
- `POST /rendez-vous` - Créer un nouveau rendez-vous
- `PUT /rendez-vous/{id}` - Modifier un rendez-vous
- `DELETE /rendez-vous/{id}` - Supprimer un rendez-vous

#### Recherche et Filtrage
- `GET /rendez-vous/patient/{patientId}` - Rendez-vous d'un patient
- `GET /rendez-vous/medecin/{medecinId}` - Rendez-vous d'un médecin
- `GET /rendez-vous/date-range?debut={date}&fin={date}` - Rendez-vous par plage de dates
- `GET /rendez-vous/statut/{statut}` - Rendez-vous par statut
- `GET /rendez-vous/date/{date}` - Rendez-vous par date

#### Actions sur les statuts
- `POST /rendez-vous/{id}/confirmer` - Confirmer un rendez-vous
- `POST /rendez-vous/{id}/terminer` - Terminer un rendez-vous
- `POST /rendez-vous/{id}/annuler` - Annuler un rendez-vous

#### Rendez-vous par statut
- `GET /rendez-vous/en-attente` - Rendez-vous en attente
- `GET /rendez-vous/confirmes` - Rendez-vous confirmés
- `GET /rendez-vous/annules` - Rendez-vous annulés

### 6. Disponibilités (`/disponibilites`)

#### CRUD Basique
- `GET /disponibilites` - Lister toutes les disponibilités
- `GET /disponibilites/{id}` - Récupérer une disponibilité par ID
- `POST /disponibilites` - Créer une nouvelle disponibilité
- `PUT /disponibilites/{id}` - Modifier une disponibilité
- `DELETE /disponibilites/{id}` - Supprimer une disponibilité

#### Recherche et Filtrage
- `GET /disponibilites/medecin/{medecinId}` - Disponibilités d'un médecin
- `GET /disponibilites/jour/{jourSemaine}` - Disponibilités par jour de la semaine
- `GET /disponibilites/actives` - Disponibilités actives
- `GET /disponibilites/inactives` - Disponibilités inactives

#### Actions sur les disponibilités
- `POST /disponibilites/{id}/activer` - Activer une disponibilité
- `POST /disponibilites/{id}/desactiver` - Désactiver une disponibilité

## Formats de données

### Patient
```json
{
  "id": 1,
  "nom": "Dupont",
  "prenom": "Jean",
  "email": "jean.dupont@email.com",
  "numeroSecu": "1234567890123",
  "dateNaissance": "1980-01-01",
  "adresse": "123 Rue de la Paix, 75001 Paris",
  "sexe": "HOMME",
  "antecedents": "Aucun antécédent notable",
  "motDePasse": "password123"
}
```

### Médecin
```json
{
  "id": 1,
  "nom": "Martin",
  "prenom": "Dr. Sophie",
  "email": "sophie.martin@hopital.fr",
  "numeroRPPS": "12345678901",
  "specialite": "Cardiologie",
  "description": "Spécialiste en cardiologie avec 15 ans d'expérience",
  "motDePasse": "password123"
}
```

### Rendez-vous
```json
{
  "id": 1,
  "patientId": 1,
  "medecinId": 1,
  "dateHeure": "2024-08-05T10:00:00",
  "dureeMinutes": 30,
  "statut": "CONFIRME",
  "motif": "Consultation de routine",
  "notes": "Patient en bonne santé",
  "dateCreation": "2024-07-31T16:00:00",
  "dateModification": "2024-07-31T16:00:00"
}
```

### Disponibilité
```json
{
  "id": 1,
  "medecinId": 1,
  "jourSemaine": "MONDAY",
  "heureDebut": "09:00:00",
  "heureFin": "17:00:00",
  "dureeCreneauMinutes": 30,
  "active": true
}
```

## Codes de statut HTTP

- `200 OK` - Requête réussie
- `201 Created` - Ressource créée avec succès
- `204 No Content` - Requête réussie, pas de contenu à retourner
- `400 Bad Request` - Requête malformée
- `404 Not Found` - Ressource non trouvée
- `500 Internal Server Error` - Erreur serveur

## Exemples d'utilisation avec Postman

### Créer un patient
```
POST http://localhost:8080/api/patients
Content-Type: application/json

{
  "nom": "Dupont",
  "prenom": "Jean",
  "email": "jean.dupont@email.com",
  "numeroSecu": "1234567890123",
  "dateNaissance": "1980-01-01",
  "adresse": "123 Rue de la Paix, 75001 Paris",
  "sexe": "HOMME",
  "antecedents": "Aucun antécédent notable",
  "motDePasse": "password123"
}
```

### Créer un rendez-vous
```
POST http://localhost:8080/api/rendez-vous
Content-Type: application/json

{
  "patientId": 1,
  "medecinId": 1,
  "dateHeure": "2024-08-05T10:00:00",
  "dureeMinutes": 30,
  "statut": "CONFIRME",
  "motif": "Consultation de routine",
  "notes": "Patient en bonne santé"
}
```

### Confirmer un rendez-vous
```
POST http://localhost:8080/api/rendez-vous/1/confirmer
```

### Récupérer les rendez-vous d'un patient
```
GET http://localhost:8080/api/rendez-vous/patient/1
``` 