import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';  // Utilisation de Link pour la navigation
import meatShopImage from '../images/alim/meat-shop.jpg';
import painChaudImage from '../images/alim/pain-chaud.jpg';
import chocolatierImage from '../images/alim/chocolatier.jpg';
import traiteurImage from '../images/alim/traiteur.jpg';

import './photosCard.css';

const artisans = [
    {
        id: 1,
        name: "Boucherie Dumont",
        photo: meatShopImage,
        description: "Boucherie Dumont offre des viandes de qualité supérieure pour tous vos besoins culinaires.",
        rating: 4.5,
        city: "Lyon",
    },
    {
        id: 2,
        name: "Au pain chaud",
        photo: painChaudImage,
        description: "Au pain chaud propose des produits de boulangerie frais et délicieux, faits maison.",
        rating: 4.8,
        city: "Montélimar",
    },
    {
        id: 3,
        name: "Chocolaterie Labbé",
        photo: chocolatierImage,
        description: "La chocolaterie Labbé est un maître dans l'art du chocolat haut de moderne et raffiné.",
        rating: 4.9,
        city: "Lyon",
    },
    {
        id: 4,
        name: "Traiteur Truchon",
        photo: traiteurImage,
        description: "Traiteur Truchon vous offre une large gamme de plats raffinés pour tous vos événements.",
        rating: 4.1,
        city: "Lyon",
    }
];

const ArtisanCard = ({ artisan }) => {
    return (
        <Card className="mb-4" style={{ display: 'flex', flexDirection: 'column' }}>
            <Card.Img variant="top" src={artisan.photo} className="artisan-image" />
            <Card.Body className="text-center"> {/* Ajout de text-center ici pour centrer tout le texte dans le corps de la carte */}
                <Card.Title>{artisan.name}</Card.Title>
                <Card.Text>{artisan.description}</Card.Text>
                <Card.Text className="text-muted">{artisan.city}</Card.Text> {/* La ville est aussi centrée */}
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