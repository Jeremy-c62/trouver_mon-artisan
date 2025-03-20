const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

app.use('/images', express.static('images'));

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'mon_artisan'
});

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
            res.json(result);  // Retourne toutes les branches
        }
    });
});

// Récupérer les métiers associés à une catégorie (branche)
app.get('/api/metiers', (req, res) => {
    const categoryId = req.query.categoryId;
    if (!categoryId) {
        return res.status(400).send('ID de catégorie requis');
    }

    const sql = 'SELECT * FROM metier WHERE branche_id = ?'; // Utiliser branche_id pour filtrer les métiers par catégorie
    db.query(sql, [categoryId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erreur serveur');
        }
        return res.json(result);  // Retourne les métiers associés à la catégorie spécifiée
    });
});

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
        return res.json(data);  // Retourne les artisans du mois triés
    });
});

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

app.listen(8080, () => {
    console.log("Serveur démarré et connecté à MySQL");
});