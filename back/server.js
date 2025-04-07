require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

// Configuration CORS (sécuriser après test)
app.use(cors({
    origin: 'https://trouver-mon-artisan.vercel.app',
    methods: ['GET', 'POST'],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Vérifier les variables d'environnement
if (!process.env.MYSQL_HOST || !process.env.MYSQL_USER || !process.env.MYSQL_PASSWORD || !process.env.MYSQL_DATABASE) {
    console.error("Erreur : Les informations de connexion MySQL ne sont pas définies !");
    process.exit(1);
}

// Connexion MySQL
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT || 51874,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à MySQL :', err);
        process.exit(1);
    }
    console.log('Connexion réussie à MySQL !');
});

// Vérification API
app.get('/', (req, res) => {
    res.json({ message: 'API Fonctionnelle !' });
});

// Test de connexion à la BDD
app.get('/test-db', (req, res) => {
    connection.query('SELECT NOW()', (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true, time: results[0] });
    });
});

// Servir les images
app.use('/images', express.static('images'));

// Récupérer toutes les branches
app.get('/api/branche', (req, res) => {
    connection.query('SELECT * FROM branche', (err, results) => {
        if (err) {
            console.error('Erreur récupération branches :', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.json(results);
    });
});

// Récupérer les métiers par branche
app.get('/api/metiers', (req, res) => {
    const categoryId = req.query.categoryId;
    if (!categoryId) return res.status(400).json({ error: 'ID de catégorie requis' });

    connection.query('SELECT * FROM metier WHERE branche_id = ?', [categoryId], (err, results) => {
        if (err) {
            console.error('Erreur SQL :', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.json(results);
    });
});

// Artisan du mois (top 3 artisans les mieux notés)
app.get('/artisan-du-mois', (req, res) => {
    connection.query(`
        SELECT * FROM artisan 
        WHERE note >= 1 
        ORDER BY note DESC 
        LIMIT 3
    `, (err, results) => {
        if (err) {
            console.error('Erreur SQL :', err);
            return res.status(500).json({ error: 'Erreur récupération artisans du mois' });
        }
        res.json(results);
    });
});

// Recherche artisan par nom
app.get('/artisan', (req, res) => {
    const searchTerm = req.query.search || '';
    if (searchTerm.length < 2) return res.json([]);

    connection.query('SELECT * FROM artisan WHERE nom LIKE ?', [`%${searchTerm}%`], (err, results) => {
        if (err) {
            console.error('Erreur SQL :', err);
            return res.status(500).json({ error: 'Erreur récupération artisans' });
        }
        res.json(results);
    });
});

// Récupérer les détails d'un artisan
app.get('/artisan/:id', (req, res) => {
    const artisanId = req.params.id;
    connection.query(`
        SELECT 
            a.nom, i.note, i.a_propos, c.ville, c.email, i.image, 
            GROUP_CONCAT(m.specialite) AS specialites, c.site_web
        FROM artisan a
        JOIN infos i ON a.id = i.artisan_id
        JOIN coordonnees c ON a.id = c.artisan_id
        LEFT JOIN metier m ON a.id = m.artisan_id
        WHERE a.id = ?
        GROUP BY a.nom, i.note, i.a_propos, c.ville, c.email, i.image, c.site_web;
    `, [artisanId], (err, results) => {
        if (err) {
            console.error('Erreur SQL :', err);
            return res.status(500).json({ error: 'Erreur récupération artisan' });
        }
        res.json(results[0]);
    });
});

// Lancer le serveur
const PORT = process.env.PORT || 8080;
app.listen(PORT, "127.0.0.1", () => {
    console.log(`Serveur en ligne sur http://0.0.0.0:${PORT}`);
    console.log("Connexion MySQL à :", process.env.MYSQL_HOST, "Port :", process.env.MYSQL_PORT);
});