import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Importation du Link pour la navigation dynamique

import royden from '../images/service/royden.jpg';
import leala from '../images/service/leala.jpg';
import suphair from '../images/service/sup-hair.jpg';
import fleuriste from '../images/service/fleuriste.jpg';
import toiletteur from '../images/service/toiletteur.jpg';
import webdesign from '../images/service/webdesign.jpg';

import './photosCard.css';

const artisans = [
    {
        id: 12, // ID unique pour chaque artisan
        name: "Royden Charbonneau",
        photo: royden,
        description: "Royden est un coiffeur expérimenté, connu pour ses coupes modernes et soignées.",
        rating: 3.8,
        city: "Saint-Priest" // Ajout de la ville
    },
    {
        id: 13, // ID unique
        name: "Leala Dennis",
        photo: leala,
        description: "Leala est une coiffeuse passionnée et créative, offrant des services personnalisés.",
        rating: 3.8,
        city: "Chambéry" // Ajout de la ville
    },
    {
        id: 14, // ID unique
        name: "C'est sup'hair",
        photo: suphair,
        description: "Sup'hair est un salon de coiffure réputé pour son accueil chaleureux et ses coupes de qualité.",
        rating: 4.1,
        city: "Romans-sur-Isère" // Ajout de la ville
    },
    {
        id: 15, // ID unique
        name: "Le monde des fleurs",
        photo: fleuriste,
        description: "Un fleuriste créatif et passionné, offrant des arrangements floraux exceptionnels.",
        rating: 4.6,
        city: "Annonay" // Ajout de la ville
    },
    {
        id: 16, // ID unique
        name: "Valérie Laderoute",
        photo: toiletteur,
        description: "Valérie est une toiletteur expérimentée, offrant des soins de qualité pour vos animaux.",
        rating: 4.5,
        city: "Valence" // Ajout de la ville
    },
    {
        id: 17, // ID unique
        name: "CM Graphisme",
        photo: webdesign,
        description: "CM Graphisme est une agence spécialisée dans le webdesign et la création visuelle.",
        rating: 4.4,
        city: "Valence" // Ajout de la ville
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
                {artisans.slice(0, 4).map((artisan, index) => (
                    <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
                        <ArtisanCard artisan={artisan} />
                    </div>
                ))}
            </div>
            {/* Ajout de la ligne centrée pour la 2ème ligne */}
            <div className="row d-flex justify-content-center">
                {artisans.slice(4).map((artisan, index) => (
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