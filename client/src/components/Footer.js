import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer style={{ backgroundColor: '#f1f8fc' }} className="py-4">
            <Container className="text-center">
                <Row className="justify-content-center">
                    <Col md={4} className="text-center">
                        <p style={{ marginBottom: '10px' }}>Pages légales</p>
                        <ul className="list-unstyled">
                            {/* Utilisation de Link pour la navigation */}
                            <li><Link to="/pagesconstruction">Mentions légales</Link></li>
                            <li><Link to="/pagesconstruction">Données personnelles</Link></li>
                            <li><Link to="/pagesconstruction">Accessibilité</Link></li>
                            <li><Link to="/pagesconstruction">Cookies</Link></li>
                        </ul>
                    </Col>
                    <Col md={4} className="text-center">
                        <p style={{ marginBottom: '10px' }}>Contact</p>
                        <address style={{ marginBottom: '0px' }}>
                            <p style={{ marginBottom: '0px' }}>101 cours Charlemagne</p>
                            <p style={{ marginBottom: '0px' }}>CS 20033</p>
                            <p style={{ marginBottom: '0px' }}>69269 LYON CEDEX 02</p>
                            <p style={{ marginBottom: '0px' }}>France</p>
                            <p style={{ marginBottom: '0px' }}><a href="tel:+33426734000">+33 (0)4 26 73 40 00</a></p>
                        </address>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;