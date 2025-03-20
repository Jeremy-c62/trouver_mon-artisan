import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';

import chaufagiste from '../images/btp/chaufagiste.jpg'; // Import de l'image de Toni
import ferronier from '../images/fab/ferronier.jpg'; // Import de l'image de Marie
import chocolatier from '../images/alim/chocolatier.jpg'; // Import de l'image de Jean

import "./home.css";

// Composante ArtisanCard
const ArtisanCard = ({ artisan }) => {
    return (
        <Card className="mb-4" style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
            <Card.Img variant="top" src={artisan.photo} className="artisan-image" />
            <Card.Body>
                <Card.Title>{artisan.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{artisan.specialization}</Card.Subtitle> {/* Ajout de la spécialisation */}
                <Card.Text>{artisan.description}</Card.Text>
                <Card.Text className="text-muted">{artisan.city}</Card.Text> {/* Ajout de la ville */}
                <div>
                    <span>Note: </span>
                    {[...Array(5)].map((_, index) => (
                        <span key={index} className={index < Math.floor(artisan.rating) ? "text-warning" : "text-muted"}>★</span>
                    ))}
                    <span> {artisan.rating}/5</span>
                </div>
                <Button variant="link" href={artisan.profileLink} className="mt-2">
                    En savoir plus <FaArrowRight />
                </Button>
            </Card.Body>
        </Card>
    );
};

function Home() {
    // Liste des artisans avec leurs détails
    const artisans = [
        {
            name: 'Orville Salmons',
            specialization: 'Chauffagiste',
            description: 'Chauffagiste avec plus de 20 ans d\'expérience dans la région, je propose des services d\'installation, d\'entretien et de réparation de systèmes de chauffage. Expert en solutions efficaces et durables, je garantis un service de qualité rapide et fiable. Faites confiance à un professionnel local reconnu pour son savoir-faire et son engagement envers la satisfaction des clients.',
            city: 'Evian',
            photo: chaufagiste,
            rating: 5,
            profileLink: '/artisan/5',
        },
        {
            name: 'Ernest Carignan',
            specialization: 'Ferronnier',
            description: 'Ferronnier, depuis 15 ans ,j\'allie tradition et innovation pour créer des pièces métalliques sur mesure qui allient robustesse et esthétique. De la ferronnerie d\'art à l\'agencement métallique, mon travail est une véritable passion. Je vous propose des créations uniques qui enrichiront l\'esthétique de votre intérieur ou extérieur, tout en garantissant leur longévité.',
            city: 'Le Puy-en-Velay',
            photo: ferronier,
            rating: 5,
            profileLink: '/artisan/11',
        },
        {
            name: 'Chocolaterie Labbé',
            specialization: 'Chocolatier',
            description: 'Chocolatier avec plus de 18 ans d\'expérience, alliant savoir-faire traditionnel et innovation. Mes créations sont élaborées à partir d\'ingrédients de qualité, pour offrir des saveurs raffinées et gourmandes. Chaque pièce est confectionnée avec soin pour satisfaire les amateurs de chocolat. Reconnu pour mon expertise, je m\'engage à proposer des produits d\'exception, qui allient plaisir et authenticité.',
            city: 'Lyon',
            photo: chocolatier,
            rating: 4.9,
            profileLink: '/artisan/3',
        }
    ];

    return (
        <Container className="mt-4" style={{ backgroundColor: '#f1f8fc' }}>
            <section className="artisan-section text-center mb-5">
                {/* L'image avec coins arrondis */}
            </section>

            <div className="artisan-text">
                <h2>L'Artisan dans notre région</h2>
                <p>
                    Nos artisans sont au cœur de nos préoccupations, et nous travaillons
                    pour que vous trouviez le meilleur artisan près de chez vous. Découvrez
                    nos talents locaux, experts dans leurs domaines respectifs.
                </p>
            </div>

            {/* Section : Artisan du mois */}
            <section className="artisan-du-mois mb-5">
                <h2 className="text-center mb-4">Artisan du mois</h2>
                <Row>
                    {artisans.map((artisan, index) => (
                        <Col xs={12} md={4} key={index}>
                            <ArtisanCard artisan={artisan} />
                        </Col>
                    ))}
                </Row>
            </section>
        </Container>
    );
}

export default Home;