const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();  // Pour charger les variables d'environnement depuis .env

const app = express();
app.use(cors());

// Configurer la connexion MySQL avec les variables d'environnement
const db = mysql.createConnection({
    host: process.env.HOST_DB,       // Hôte MySQL, à récupérer depuis .env
    user: process.env.USER_DB,       // Utilisateur MySQL
    password: process.env.PASSWORD_DB, // Mot de passe MySQL
    database: process.env.NAME_DB    // Nom de la base de données
});

// Vérifier la connexion MySQL
db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à MySQL :', err);
        return;
    }
    console.log('Connecté à la base de données MySQL');
});

// Route d'accueil pour tester la connexion à la base de données
app.get('/', (req, res) => {
    return res.json('Connecté à MySQL');
});

// Récupérer toutes les branches
app.get('/api/branches', (req, res) => {
    db.query('SELECT * FROM branche', (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erreur serveur');
        } else {
            res.json(result);
        }
    });
});

// Récupérer les métiers associés à une catégorie (branche)
app.get('/api/metiers', (req, res) => {
    const categoryId = req.query.categoryId;
    if (!categoryId) {
        return res.status(400).send('ID de catégorie requis');
    }

    const sql = 'SELECT * FROM metier WHERE branche_id = ?';
    db.query(sql, [categoryId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erreur serveur');
        }
        return res.json(result);
    });
});

// Récupérer les artisans du mois
app.get('/artisan-du-mois', (req, res) => {
    const sql = `
        SELECT * FROM artisan
        WHERE note >= 1
        ORDER BY note ASC
        LIMIT 3
    `;

    db.query(sql, (err, data) => {
        if (err) {
            console.error('Erreur dans la requête SQL : ', err);
            return res.json({ error: 'Erreur dans la récupération des artisans du mois' });
        }
        return res.json(data);
    });
});

// Recherche d'artisans par nom
app.get('/artisan', (req, res) => {
    const searchTerm = req.query.search || '';
    if (searchTerm.length < 2) {
        return res.json([]);
    }

    const sql = `SELECT * FROM artisan WHERE nom LIKE ?`;
    db.query(sql, [`%${searchTerm}%`], (err, data) => {
        if (err) {
            console.error('Erreur dans la requête SQL : ', err);
            return res.json({ error: 'Erreur dans la récupération des artisans' });
        }
        return res.json(data);
    });
});

// Récupérer les informations détaillées d'un artisan
app.get('/artisan/:id', (req, res) => {
    const artisanId = req.params.id;
    const sql = `
        SELECT a.nom, i.note, i.a_propos, c.ville, c.email, i.image, m.specialite, c.site_web
        FROM artisan a
        JOIN infos i ON a.id = i.artisan_id
        JOIN coordonnees c ON a.id = c.artisan_id
        JOIN metier m ON a.id = m.artisan_id 
        WHERE a.id = ?`;

    db.query(sql, [artisanId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data[0]);
    });
});

// Démarrer le serveur sur le port défini dans les variables d'environnement ou 8080 par défaut
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT} et connecté à MySQL`);
});