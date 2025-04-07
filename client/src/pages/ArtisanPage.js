import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

function ArtisanPage() {
    const { id } = useParams(); // Récupère l'ID de l'artisan depuis l'URL
    const [artisan, setArtisan] = useState(null); // Stocke les données de l'artisan
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        phone: '',
        message: '',
    });

    const navigate = useNavigate(); // Hook pour naviguer vers la page précédente

    // Référence pour l'image de l'artisan
    const imageRef = useRef(null);

    useEffect(() => {
        // Fonction pour récupérer les données de l'artisan
        const fetchArtisan = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/artisan/${id}`);
                setArtisan(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération de l'artisan:", error);
            }
        };

        fetchArtisan(); // N'oublie pas d'appeler la fonction
    }, [id]);

    // Une fois que les données de l'artisan sont chargées, scroller vers l'image
    useEffect(() => {
        if (artisan && imageRef.current) {
            imageRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center',
            });
        }
    }, [artisan]);

    const validateEmail = (email) => {
        // Expression régulière pour valider l'email
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Vérification si tous les champs requis sont remplis
        if (!formData.nom || !formData.prenom || !formData.email || !formData.phone || !formData.message) {
            alert("Tous les champs doivent être remplis avant de soumettre !");
            return;
        }

        // Vérification si l'email est valide
        if (!validateEmail(formData.email)) {
            alert("L'email que vous avez entré n'est pas valide. Veuillez entrer un email valide.");
            return;
        }

        // Simulation de l'envoi de l'email
        const emailData = {
            from: formData.email, // L'email de l'utilisateur
            to: artisan.email, // L'email de l'artisan
            subject: "Demande de contact",
            message: formData.message,
        };

        console.log("Simulation d'envoi d'email...");
        console.log("De:", emailData.from);
        console.log("À:", emailData.to);
        console.log("Sujet:", emailData.subject);
        console.log("Message:", emailData.message);
        console.log("Numéro de téléphone:", formData.phone);

        alert("Demande envoyée. Vous recevrez une réponse dans les 48h.");

        setFormData({
            nom: '',
            prenom: '',
            email: '',
            phone: '',
            message: '',
        });
    };

    if (!artisan) return <p>Chargement...</p>;

    return (
        <div className="artisan-page">
            {/* Carte artisan */}
            <Card className="artisan-card mb-4" style={{ display: 'flex', flexDirection: 'column', maxWidth: '900px', margin: '0 auto' }}>
                <Card.Img
                    ref={imageRef} // Lier la référence à l'image de l'artisan
                    variant="top"
                    src={`http://localhost:8080/images/${artisan.image}`}
                    alt={artisan.nom}
                    className="artisan-image"
                    style={{ height: '300px', objectFit: 'cover' }}
                />
                <Card.Body style={{ textAlign: 'center' }}>
                    <Card.Title>{artisan.nom}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{artisan.specialite}</Card.Subtitle>
                    <Card.Text>{artisan.a_propos}</Card.Text>
                    <div className="mb-3">
                        <span>Note : </span>
                        {[...Array(5)].map((_, index) => (
                            <span key={index} className={index < Math.floor(artisan.note) ? "text-warning" : "text-muted"}>★</span>
                        ))}
                        <span> {artisan.note}/5</span>
                    </div>

                    <Card.Text><strong>Ville:</strong> {artisan.ville}</Card.Text>
                    {artisan.site_web ? (
                        <Card.Text>
                            <strong>Site web:</strong> <a href={artisan.site_web} target="_blank" rel="noopener noreferrer">{artisan.site_web}</a>
                        </Card.Text>
                    ) : (
                        <Card.Text><strong>Site web:</strong> Non disponible</Card.Text>
                    )}
                </Card.Body>
            </Card>

            <div className="d-flex justify-content-center mt-4">
                <Button
                    variant="success"
                    onClick={() => navigate(-1)}  // Retour à la page précédente
                    style={{ backgroundColor: '#82b864', borderColor: '#82b864', marginBottom: '20px' }}
                >
                    Retour
                </Button>
            </div>

            {/* Formulaire */}
            <section className="formulaire mb-5 p-4" style={{ border: '1px solid #dedede', borderRadius: '10px', maxWidth: '900px', margin: '0 auto' }}>
                <h2 className="text-center mb-4">Formulaire</h2>
                <Form onSubmit={handleFormSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formNom">
                                <Form.Label>Nom</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nom"
                                    value={formData.nom}
                                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formPrenom">
                                <Form.Label>Prénom</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Prénom"
                                    value={formData.prenom}
                                    onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formPhone">
                                <Form.Label>Téléphone</Form.Label>
                                <Form.Control
                                    type="tel"
                                    placeholder="Téléphone"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3" controlId="formMessage">
                        <Form.Label>Votre message</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                        <Button
                            variant="primary"
                            type="submit"
                            style={{ backgroundColor: '#f1f8fc', borderColor: '#0074cf', color: 'black' }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#0074c7'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#f1f8fc'}
                        >
                            Envoyer
                        </Button>
                    </div>
                </Form>
            </section>
        </div>
    );
}

export default ArtisanPage;