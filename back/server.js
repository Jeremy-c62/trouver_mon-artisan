require('dotenv').config();// Charger les variables d'environnement depuis .env.dev

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');  // Importation de mysql2

const app = express();

// Middleware pour CORS et JSON
app.use(cors({
    origin: 'https://trouver-mon-artisan.vercel.app',  // Permet uniquement ce domaine
    methods: ['GET', 'POST'],  // Méthodes autorisées
    allowedHeaders: ['Content-Type'],  // En-têtes autorisés
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les images depuis un dossier 'images'
app.use('/images', express.static('images'));

// Vérifier si les variables d'environnement de la base de données sont bien définies
if (!process.env.MYSQL_HOST || !process.env.MYSQL_USER || !process.env.MYSQL_PASSWORD || !process.env.MYSQL_DATABASE) {
    console.error(" Erreur : Les informations de connexion à la base de données ne sont pas définies !");
    process.exit(1);
}

// Connexion à MySQL
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST, // Utilisation de la variable d'environnement
    port: process.env.MYSQL_PORT, // Utilisation de la variable d'environnement
    user: process.env.MYSQL_USER, // Utilisation de la variable d'environnement
    password: process.env.MYSQL_PASSWORD, // Utilisation de la variable d'environnement
    database: process.env.MYSQL_DATABASE // Utilisation de la variable d'environnement
});


// Vérifier la connexion
connection.connect((err) => {
    if (err) {
        console.error(' Erreur de connexion à MySQL :', err);
        process.exit(1);
    }
    console.log(' Connexion réussie à MySQL !');
});

// Vérification de connexion via une route
app.get('/', (req, res) => {
    res.json({ message: ' Connecté à MySQL' });
});

// Récupérer toutes les branches
app.get('/api/branche', (req, res) => {
    connection.query('SELECT * FROM branche', (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des branches :', err);
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
            console.error('Erreur SQL :', err.message || err);
            return res.status(500).json({ error: `Erreur serveur: ${err.message || err}` });
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

// Test de connexion à MySQL
app.get('/test-db', (req, res) => {
    connection.query('SELECT NOW()', (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true, time: results[0] });
    });
});

// Lancer le serveur
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(` Serveur démarré sur http://localhost:${PORT}`);
});