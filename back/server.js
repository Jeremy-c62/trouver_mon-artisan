const express = require('express');
const { Pool } = require('pg'); // Remplacez mysql par pg
const cors = require('cors');
const dotenv = require('dotenv');

// Charger les variables d'environnement à partir du fichier .env
dotenv.config();

const app = express();
app.use(cors());

app.use('/images', express.static('images'));

// Configuration de la connexion PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Nécessaire si vous utilisez SSL, par exemple sur Neon.tech
    }
});

// Vérifier la connexion à la base de données
app.get('/', async (req, res) => {
    try {
        const client = await pool.connect();
        res.json('Connecté à PostgreSQL');
        client.release(); // Relâcher le client après la connexion
    } catch (err) {
        console.error('Erreur de connexion à PostgreSQL', err);
        res.status(500).json('Erreur de connexion à PostgreSQL');
    }
});

// Récupérer toutes les branches
app.get('/api/branches', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM branche');
        res.json(result.rows);  // Retourne toutes les branches
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur serveur');
    }
});

// Récupérer les métiers associés à une catégorie (branche)
app.get('/api/metiers', async (req, res) => {
    const categoryId = req.query.categoryId;
    if (!categoryId) {
        return res.status(400).send('ID de catégorie requis');
    }

    try {
        const result = await pool.query('SELECT * FROM metier WHERE branche_id = $1', [categoryId]);
        res.json(result.rows);  // Retourne les métiers associés à la catégorie spécifiée
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur serveur');
    }
});

app.get('/artisan-du-mois', async (req, res) => {
    const sql = `
        SELECT * FROM artisan
        WHERE note >= 1
        ORDER BY note ASC
        LIMIT 3
    `;

    try {
        const result = await pool.query(sql);
        res.json(result.rows);  // Retourne les artisans du mois triés
    } catch (err) {
        console.error('Erreur dans la requête SQL : ', err);
        res.json({ error: 'Erreur dans la récupération des artisans du mois' });
    }
});

app.get('/artisan', async (req, res) => {
    const searchTerm = req.query.search || '';
    if (searchTerm.length < 2) {
        return res.json([]);
    }

    const sql = `SELECT * FROM artisan WHERE nom LIKE $1`;
    try {
        const result = await pool.query(sql, [`%${searchTerm}%`]);
        res.json(result.rows);
    } catch (err) {
        console.error('Erreur dans la requête SQL : ', err);
        res.json({ error: 'Erreur dans la récupération des artisans' });
    }
});

app.get('/artisan/:id', async (req, res) => {
    const artisanId = req.params.id;
    const sql = `
        SELECT a.nom, i.note, i.a_propos, c.ville, c.email, i.image, m.specialite, c.site_web
        FROM artisan a
        JOIN infos i ON a.id = i.artisan_id
        JOIN coordonnees c ON a.id = c.artisan_id
        JOIN metier m ON a.id = m.artisan_id 
        WHERE a.id = $1`;

    try {
        const result = await pool.query(sql, [artisanId]);
        res.json(result.rows[0]);
    } catch (err) {
        res.json(err);
    }
});

app.get('/test-db', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT NOW()');
        client.release();
        res.json({ success: true, time: result.rows[0].now });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Lancer le serveur sur le port 8080
app.listen(8080, () => {
    console.log("Serveur démarré et connecté à PostgreSQL");
});