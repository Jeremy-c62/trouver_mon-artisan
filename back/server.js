require('dotenv').config({ path: '.env.development.local' }); // Charger les variables d'environnement depuis .env.dev

const express = require('express');
const cors = require('cors');  // Importation de cors
const { neon } = require('@neondatabase/serverless');

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

// Vérifier si l'URL de la base est bien définie
if (!process.env.DATABASE_URL) {
    console.error(" Erreur : DATABASE_URL non défini dans l'environnement !");
    process.exit(1);
}

// Connexion à Neon
let sql;
try {
    sql = neon(process.env.DATABASE_URL);
    console.log(' Connexion réussie à PostgreSQL (Neon) !');
} catch (err) {
    console.error(' Erreur de connexion à PostgreSQL (Neon) :', err);
    process.exit(1);
}

// Vérification de connexion via une route
app.get('/', async (req, res) => {
    res.json({ message: ' Connecté à PostgreSQL (Neon)' });
});

// Récupérer toutes les branches
app.get('/api/branche', async (req, res) => {
    try {
        const result = await sql`SELECT * FROM mon_artisan.branche`;  // Retirer "mon_artisan."
        res.json(result);
    } catch (err) {
        console.error('Erreur lors de la récupération des branches :', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

//  Récupérer les métiers par branche
app.get('/api/metiers', async (req, res) => {
    const categoryId = req.query.categoryId;
    if (!categoryId) return res.status(400).json({ error: 'ID de catégorie requis' });

    try {
        const result = await sql`SELECT * FROM "mon_artisan"."metier" WHERE "branche_id" = ${categoryId}`;
        res.json(result);
    } catch (err) {
        console.error('Erreur SQL :', err.message || err);
        res.status(500).json({ error: `Erreur serveur: ${err.message || err}` });
    }
});

// Artisan du mois (top 3 artisans les mieux notés)
app.get('/artisan-du-mois', async (req, res) => {
    try {
        const result = await sql`
            SELECT * FROM artisan 
            WHERE note >= 1 
            ORDER BY note DESC 
            LIMIT 3
        `;
        res.json(result);
    } catch (err) {
        console.error(' Erreur SQL :', err);
        res.status(500).json({ error: 'Erreur récupération artisans du mois' });
    }
});

// Recherche artisan par nom
app.get('/artisan', async (req, res) => {
    const searchTerm = req.query.search || '';
    if (searchTerm.length < 2) return res.json([]);

    try {
        const result = await sql`SELECT * FROM mon_artisan.artisan WHERE nom ILIKE ${'%' + searchTerm + '%'}`;
        res.json(result);
    } catch (err) {
        console.error(' Erreur SQL :', err);
        res.status(500).json({ error: 'Erreur récupération artisans' });
    }
});

// Récupérer les détails d'un artisan
app.get('/artisan/:id', async (req, res) => {
    const artisanId = req.params.id;
    try {
        const result = await sql`
            SELECT 
                a.nom, i.note, i.a_propos, c.ville, c.email, i.image, 
                ARRAY_AGG(m.specialite) AS specialites, c.site_web
            FROM artisan a
            JOIN infos i ON a.id = i.artisan_id
            JOIN coordonnees c ON a.id = c.artisan_id
            LEFT JOIN metier m ON a.id = m.artisan_id
            WHERE a.id = ${artisanId}
            GROUP BY a.nom, i.note, i.a_propos, c.ville, c.email, i.image, c.site_web;
        `;
        res.json(result[0]);
    } catch (err) {
        console.error('Erreur SQL :', err);
        res.status(500).json({ error: 'Erreur récupération artisan' });
    }
});

// Test de connexion à PostgreSQL
app.get('/test-db', async (req, res) => {
    try {
        const result = await sql`SELECT NOW()`;
        res.json({ success: true, time: result[0].now });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Lancer le serveur
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(` Serveur démarré sur http://localhost:${PORT}`);
});