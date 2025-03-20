import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';  // Utilisation de Link pour la navigation

import chaufagiste from '../images/btp/chaufagiste.jpg';
import electricien from '../images/btp/electricien.jpg';
import menuisier from '../images/btp/menuisier.jpg';
import plombier from '../images/btp/plombier.jpg';

import './photosCard.css';

const artisans = [
    {
        id: 5,
        name: "Orville Salmons",
        photo: chaufagiste,
        description: "Orville est un chauffagiste hautement qualifié, offrant des solutions pour le confort thermique.",
        rating: 5.0,
        city: "Evian", // Ajout de la ville
    },
    {
        id: 6,
        name: "Mont Blanc Eléctricité",
        photo: electricien,
        description: "Mont Blanc Électricité est une entreprise spécialisée dans les services électriques de qualité.",
        rating: 4.5,
        city: "Chamonix", // Ajout de la ville
    },
    {
        id: 7,
        name: "Boutot & fils",
        photo: menuisier,
        description: "Boutot & fils est une menuiserie réputée pour la fabrication de pièces sur mesure en bois.",
        rating: 4.7,
        city: "Bourg-en-Bresse", // Ajout de la ville
    },
    {
        id: 8,
        name: "Vallis Bellemare",
        photo: plombier,
        description: "Vallis Bellemare est un plombier offrant des services fiables et de qualité.",
        rating: 4.0,
        city: "Vienne", // Ajout de la ville
    }
];

const ArtisanCard = ({ artisan }) => {
    return (
        <Card className="mb-4" style={{ display: 'flex', flexDirection: 'column' }}>
            <Card.Img variant="top" src={artisan.photo} className="artisan-image" />
            <Card.Body className="text-center"> {/* Ajout de text-center pour centrer tout le texte */}
                <Card.Title>{artisan.name}</Card.Title>
                <Card.Text>{artisan.description}</Card.Text>
                <Card.Text className="text-muted">{artisan.city}</Card.Text> {/* Affichage de la ville */}
                <div>
                    <span>Note: </span>
                    {[...Array(5)].map((_, index) => (
                        <span key={index} className={index < Math.floor(artisan.rating) ? "text-warning" : "text-muted"}>★</span>
                    ))}
                    <span> {artisan.rating}/5</span>
                </div>
                {/* Lien vers la page spécifique de l'artisan */}
                <Link to={`/artisan/${artisan.id}`} className="mt-2 btn btn-link">
                    En savoir plus <FaArrowRight />
                </Link>
            </Card.Body>
        </Card>
    );
};

const ArtisanList = () => {
    return (
        <div className="container">
            <div className="row d-flex justify-content-center"> {/* Ajout de classes pour centrer les cartes */}
                {artisans.map((artisan, index) => (
                    <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <ArtisanCard artisan={artisan} />
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-center mt-4">
                <Button
                    variant="success"
                    style={{ backgroundColor: '#82b864', borderColor: '#82b864', marginBottom: '20px' }}
                    href="/"
                >
                    Retour
                </Button>
            </div>
        </div>
    );
};

export default ArtisanList;