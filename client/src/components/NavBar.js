import React, { useEffect, useState, useRef } from 'react';
import { Navbar, Nav, Container, Spinner } from 'react-bootstrap'; // Ajout du Spinner pour indiquer un chargement
import Logo from '../images/Logo.jpg';
import './navBar.css';

// Fonction pour retirer les accents des branches
function removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

function NavBar() {
    const [branches, setBranches] = useState([]);
    const [isOpen, setIsOpen] = useState(false); // Etat pour gérer l'ouverture du menu
    const [isLoading, setIsLoading] = useState(true); // Etat de chargement
    const navbarRef = useRef(null); // Référence du menu

    useEffect(() => {
        // Charger les branches depuis l'API avec la variable d'environnement
        fetch(`${process.env.REACT_APP_API_URL}api/branche`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur API: ${response.statusText}`);
                }
                return response.json(); // Directement en JSON
            })
            .then(data => {
                console.log('Branches reçues:', data);
                setBranches(data); // On reçoit directement le JSON
                setIsLoading(false); // Une fois les données reçues, on arrête le chargement
            })
            .catch(error => {
                console.error('Erreur:', error);
                setIsLoading(false); // Si une erreur se produit, on arrête également le chargement
            });

        // Fonction pour fermer le menu lorsque l'on clique en dehors
        const handleClickOutside = (event) => {
            if (navbarRef.current && !navbarRef.current.contains(event.target)) {
                setIsOpen(false); // Fermer le menu
            }
        };

        // Ajouter un écouteur d'événement pour détecter les clics en dehors
        document.addEventListener('click', handleClickOutside);

        // Nettoyage : retirer l'écouteur d'événement lorsqu'on quitte le composant
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // Gérer l'ouverture/fermeture du menu
    const handleToggle = () => {
        setIsOpen(!isOpen); // Ouvrir ou fermer le menu lorsque l'icône toggle est cliquée
    };

    return (
        <Navbar expand="lg" style={{ backgroundColor: '#f1f8fc' }} ref={navbarRef}>
            <Container>
                <Navbar.Brand href="/home">
                    <img
                        src={Logo}
                        alt="Mon Artisan Logo"
                        style={{ height: '150px' }}
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} />
                <Navbar.Collapse id="basic-navbar-nav" className={isOpen ? 'show' : ''}>
                    <Nav className="ms-auto">
                        <Nav.Link href="/home" className="nav-link">Accueil</Nav.Link>

                        {/* Affichage conditionnel pour afficher un spinner pendant le chargement */}
                        {isLoading ? (
                            <Nav.Link className="nav-link" disabled>
                                <Spinner animation="border" size="sm" /> Chargement...
                            </Nav.Link>
                        ) : (
                            branches.map((branche) => (
                                <Nav.Link
                                    key={branche.id}
                                    href={`/${encodeURIComponent(removeAccents(branche.categorie.toLowerCase()))}`}
                                    className="nav-link"
                                >
                                    {branche.categorie}
                                </Nav.Link>
                            ))
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;