import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import './header.css';

function Header() {
    const [searchTerm, setSearchTerm] = useState('');
    const [artisans, setArtisans] = useState([]);
    const [loading, setLoading] = useState(false);
    const searchInputRef = useRef(null); // Référence pour l'input de recherche
    const [inputWidth, setInputWidth] = useState('300px'); // État pour la largeur de la barre de recherche
    const [inputOffsetTop, setInputOffsetTop] = useState(0); // État pour la position verticale de l'input
    const resultsRef = useRef(null); // Référence pour la liste des résultats

    const métiers = [
        { id: 1, nom: 'Boucher' },
        { id: 2, nom: 'Boulanger' },
        { id: 3, nom: 'Chocolatier' },
        { id: 4, nom: 'Traiteur' },
        { id: 5, nom: 'Chauffagiste' },
        { id: 6, nom: 'Electricien' },
        { id: 7, nom: 'Menuisier' },
        { id: 8, nom: 'Plombier' },
        { id: 9, nom: 'Bijoutier' },
        { id: 10, nom: 'Couturier' },
        { id: 11, nom: 'Ferronier' },
        { id: 12, nom: 'Coiffeur' },
        { id: 13, nom: 'Coiffeur' },
        { id: 14, nom: 'Coiffeur' },
        { id: 15, nom: 'Fleuriste' },
        { id: 16, nom: 'Toiletteur' },
        { id: 17, nom: 'Webdesign' }
    ];

    const navigateToPage = (artisanId) => {
        // Rediriger vers la page de l'artisan avec son ID
        window.location.href = `/artisan/${artisanId}`;
    };

    // Fonction de recherche avec debounce (délai avant d'envoyer la requête)
    const fetchArtisans = useCallback(async (term) => {
        if (term.length < 2) {
            setArtisans([]);
            return; // Ne pas effectuer de recherche si moins de 2 caractères
        }

        setLoading(true);
        try {
            const response = await axios.get('https://localhost:8080/artisan', {
                params: { search: term },
            });

            setArtisans(response.data); // Mettre à jour les artisans avec la réponse du serveur

        } catch (error) {
            console.error('Erreur lors de la récupération des artisans:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Mettre en place un délai (debounce) pour éviter les appels excessifs
    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        // Appeler fetchArtisans avec un délai
        setTimeout(() => fetchArtisans(value), 500); // Attendre 500ms après la dernière frappe
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchArtisans(searchTerm); // Effectuer la recherche au clic du bouton
    };

    // Détecter la largeur et la position de la barre de recherche au montage
    const handleInputRef = () => {
        if (searchInputRef.current) {
            setInputWidth(`${searchInputRef.current.offsetWidth}px`);
            setInputOffsetTop(searchInputRef.current.offsetTop + searchInputRef.current.offsetHeight); // Récupérer la position verticale
        }
    };

    // Ajouter un gestionnaire d'événement pour fermer la liste si on clique en dehors
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                resultsRef.current && !resultsRef.current.contains(event.target) &&
                searchInputRef.current && !searchInputRef.current.contains(event.target)
            ) {
                setArtisans([]); // Masquer les résultats de la recherche
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    // Texte changeant toutes les 8 secondes
    const steps = [
        "1) Choisir la catégorie d’artisanat dans le menu: En haut à droite de la page, choisissez le corps de métier qui correspond à votre besoin.",
        "2) Choisir un artisan: Rechercher l'artisan via son nom dans la barre de recherche ou en cliquant sur un des boutons, qui correspond au métier souhaiter.",
        "3) Le contacter via le formulaire de contact: Remplir le formulaire de contact, l'envoyer et obtener une réponses de notre artisan dans les 48h."
    ];

    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prevStep) => (prevStep + 1) % steps.length);
        }, 8000); // Change l'étape toutes les 8 secondes

        return () => clearInterval(interval); // Nettoyer l'intervalle au démontage du composant
    }, [steps.length]);

    // Fonction pour ajouter un saut de ligne après les ":"
    const formatStepText = (text) => {
        const parts = text.split(':');
        return (
            <>
                <span>{parts[0]}:</span>
                <br />
                <span>{parts[1]}</span>
            </>
        );
    };

    return (
        <header className="text-center mb-4">
            <h1>Comment trouver mon artisan</h1>

            {/* Animation de texte changeant */}
            <div className="text-changer-container">
                <div className="text-changer">
                    {formatStepText(steps[currentStep])}
                </div>
            </div>

            <Form
                className="d-flex justify-content-center mb-4"
                onSubmit={handleSearchSubmit}
                style={{ marginTop: '30px' }} // Ajout du margin-top ici
            >
                <Form.Control
                    ref={searchInputRef} // Assigner la ref pour récupérer la largeur
                    type="search"
                    placeholder="Recherche"
                    className="me-2"
                    aria-label="Search"
                    style={{ width: '300px' }}
                    value={searchTerm}
                    onChange={handleChange} // Mettre à jour le terme de recherche
                    onFocus={handleInputRef} // Détecter la largeur et la position quand l'utilisateur clique
                />
                <Button variant="outline-primary" type="submit" disabled={loading}>
                    {loading ? 'Chargement...' : 'Rechercher'}
                </Button>
            </Form>

            {/* Affichage des résultats de la recherche */}
            {searchTerm.length >= 2 && artisans.length > 0 && (
                <ListGroup
                    ref={resultsRef} // Référence pour la liste des résultats
                    className="search-results"
                    style={{
                        width: inputWidth, // Appliquer la largeur de l'input à la liste
                        position: 'absolute', // Position absolue pour qu'elle apparaisse sous la barre
                        top: inputOffsetTop, // Position verticale juste en dessous de l'input
                        left: '46.55%', // Centrer horizontalement
                        transform: 'translateX(-50%)', // Ajuster pour centrer l'élément
                        zIndex: 1000, // Éviter que la liste soit masquée par d'autres éléments
                    }}
                >
                    {artisans.map((artisan) => (
                        <ListGroup.Item
                            key={artisan.id}
                            onClick={() => navigateToPage(artisan.id)}
                            style={{ cursor: 'pointer' }}
                        >
                            {artisan.nom} {/* Affiche le nom de l'artisan */}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}

            {/* Affichage des métiers */}
            <div className="grid-container">
                {métiers.map((métier, index) => (
                    <Button
                        key={index}
                        style={{ backgroundColor: '#0074c7', borderColor: '#0074c7', margin: '3px' }}
                        onClick={() => navigateToPage(métier.id)} // Utilise l'ID de l'artisan
                    >
                        {métier.nom}
                    </Button>
                ))}
            </div>
        </header>
    );
}

export default Header;