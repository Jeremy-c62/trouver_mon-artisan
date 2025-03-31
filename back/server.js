const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());  //  Ajout pour parser JSON
app.use(express.urlencoded({ extended: true }));

app.use('/images', express.static('images'));

// 🔐 Connexion PostgreSQL sécurisée
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Vérification connexion DB
app.get('/', async (req, res) => {
    try {
        const client = await pool.connect();
        res.json('Connecté à PostgreSQL');
        client.release();
    } catch (err) {
        console.error('Erreur de connexion à PostgreSQL', err);
        res.status(500).json('Erreur de connexion à PostgreSQL');
    }
});

// Récupérer toutes les branches
app.get('/api/branches', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM branche');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Récupérer métiers par branche
app.get('/api/metiers', async (req, res) => {
    const categoryId = req.query.categoryId;
    if (!categoryId) return res.status(400).json({ error: 'ID de catégorie requis' });

    try {
        const result = await pool.query('SELECT * FROM metier WHERE branche_id = $1', [categoryId]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Artisan du mois (meilleures notes en premier)
app.get('/artisan-du-mois', async (req, res) => {
    const sql = `
        SELECT * FROM artisan
        WHERE note >= 1
        ORDER BY note DESC
        LIMIT 3
    `;
    try {
        const result = await pool.query(sql);
        res.json(result.rows);
    } catch (err) {
        console.error('Erreur SQL : ', err);
        res.status(500).json({ error: 'Erreur récupération artisans du mois' });
    }
});

// Recherche artisan par nom
app.get('/artisan', async (req, res) => {
    const searchTerm = req.query.search || '';
    if (searchTerm.length < 2) return res.json([]);

    try {
        const result = await pool.query('SELECT * FROM artisan WHERE nom ILIKE $1', [`%${searchTerm}%`]);
        res.json(result.rows);
    } catch (err) {
        console.error('Erreur SQL : ', err);
        res.status(500).json({ error: 'Erreur récupération artisans' });
    }
});

// Récupérer détails d'un artisan
app.get('/artisan/:id', async (req, res) => {
    const artisanId = req.params.id;
    const sql = `
        SELECT 
            a.nom, i.note, i.a_propos, c.ville, c.email, i.image, 
            ARRAY_AGG(m.specialite) AS specialites, c.site_web
        FROM artisan a
        JOIN infos i ON a.id = i.artisan_id
        JOIN coordonnees c ON a.id = c.artisan_id
        LEFT JOIN metier m ON a.id = m.artisan_id
        WHERE a.id = $1
        GROUP BY a.nom, i.note, i.a_propos, c.ville, c.email, i.image, c.site_web;
    `;
    try {
        const result = await pool.query(sql, [artisanId]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Erreur SQL : ', err);
        res.status(500).json({ error: 'Erreur récupération artisan' });
    }
});

// Test de connexion à PostgreSQL
app.get('/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ success: true, time: result.rows[0].now });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 🚀 Lancer le serveur
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});