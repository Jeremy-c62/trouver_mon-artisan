# Projet Fullstack React + Node.js

Ce projet est une application web fullstack composée d’un frontend développé en React 19 et d’un backend en Node.js avec Express. Il intègre des bases de données MySQL, gère les variables d’environnement via dotenv, et utilise Axios pour la communication entre le frontend et le backend.

## Sommaire

- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Structure du projet](#structure-du-projet)
- [Installation](#installation)
  - [Installation du backend](#installation-du-backend)
  - [Installation du frontend](#installation-du-frontend)
- [Tests](#tests)
- [Licence](#licence)
- [Auteur](#auteur)

## Fonctionnalités

- Frontend SPA avec React et React Router
- UI moderne avec React Bootstrap
- Requêtes HTTP avec Axios
- Backend RESTful avec Express
- Connexion base de données PostgreSQL ou MySQL
- Séparation des responsabilités (client / serveur)
- Gestion des variables sensibles via `.env`

## Technologies utilisées

### Frontend

- React 19
- React Router DOM
- Axios
- React Bootstrap
- Bootstrap 5
- dotenv

### Backend

- Node.js
- Express
- MySQL / MySQL2
- dotenv
- CORS

## Structure du projet

back/
├── .vercel # Configuration pour vercel
├── images/ # Pour toutes les images utilisées avec la BDD
├── node.modules  
├── .env (optionnel)
├── package-lock.json
├── package.json
└── README.md

client/
├── public/
├── src/
│ ├── components/
│ ├── pages/
│ ├── \_utils/ # Pour les helpers / logique de la page 404
│ ├── assets/ # Pour les polices, fichiers statiques liés au style
│ ├── images/ # Pour toutes les images utilisées
│ ├── App.js
│ └── index.css
│ └── index.js
├── .env (optionnel)
├── package.json
└── README.md

## Installation du front

```bash
Pour aller dans le dossier `front` :
cd client

npm install

### Prérequis

- Node.js v16+
- npm
- PostgreSQL ou MySQL en local ou distant

### Installation du backend

### Prérequis
Pour aller dans le dossier `back` :

cd back
npm install


Pour travailler en local.

Modifier le .env :

Pour le front:
REACT_APP_API_URL=http://localhost:8080

pour le back:
Crée votre environement.

Exemple:
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database
```
