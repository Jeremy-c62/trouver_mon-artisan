import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';  // Utilisation de Link pour la navigation

import bijoutier from '../images/fab/bijoutier.jpg';
import couturier from '../images/fab/couturier.jpg';
import ferronier from '../images/fab/ferronier.jpg';

import './photosCard.css';

const artisans = [
    {
        id: 9,  // Ajout d'un ID unique pour chaque artisan
        name: "Claude Quinn",
        photo: bijoutier,
        description: "Claude est un bijoutier talentueux, créant des pièces uniques et raffinées, depuis plus de 30 ans.",
        rating: 4.2,
        city: "Aix-les-Bains", // Ajout de la ville
    },
    {
        id: 10,  // ID unique
        name: "Amitee Lécuyer",
        photo: couturier,
        description: "Amitee est une couturière créative, spécialisée dans la confection de vêtements sur mesure.",
        rating: 4.5,
        city: "Annecy", // Ajout de la ville
    },
    {
        id: 11,  // ID unique
        name: "Ernest Carignan",
        photo: ferronier,
        description: "Ernest est un ferronier de talent, créant des pièces métalliques artistiques et fonctionnelles.",
        rating: 5.0,
        city: "Le Puy-en-Velay", // Ajout de la ville
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
            <div className="row d-flex justify-content-center">
                {artisans.map((artisan, index) => (
                    <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
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