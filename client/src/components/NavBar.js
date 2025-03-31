import React, { useEffect, useState, useRef } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Logo from '../images/Logo.jpg';
import './navBar.css';

function removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

function NavBar() {
    const [branches, setBranches] = useState([]);
    const [isOpen, setIsOpen] = useState(false); // Etat pour gérer l'ouverture du menu
    const navbarRef = useRef(null); // Référence du menu

    useEffect(() => {
        // Charger les branches depuis l'API avec la variable d'environnement
        fetch(`${process.env.REACT_APP_API_URL}/api/branches`)
            .then(response => {
                console.log('Réponse brute:', response);
                return response.text(); // Changez en .text() pour voir le contenu
            })
            .then(data => {
                console.log('Données reçues:', data);
                setBranches(JSON.parse(data)); // Transformez seulement si c'est bien du JSON
            })
            .catch(error => console.error('Erreur:', error));

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
                <Navbar.Collapse id="basic-navbar-nav" in={isOpen}>
                    <Nav className="ms-auto">
                        <Nav.Link href="/home" className="nav-link">Accueil</Nav.Link>
                        {branches.map((branche) => (
                            <Nav.Link
                                key={branche.id}
                                href={`/${removeAccents(branche.categorie.toLowerCase())}`}
                                className="nav-link"
                            >
                                {branche.categorie}
                            </Nav.Link>
                        ))}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
