import React from 'react';
import { Button } from 'react-bootstrap'; // Assurez-vous que React Bootstrap est installé

function PagesConstruction() {
    return (
        <div className="text-center py-5">
            <h1 style={{ color: '#cd2c2e' }}>Page en construction</h1>
            <p style={{ color: '#cd2c2e' }}>Cette page est actuellement en cours de construction. Merci de votre patience.</p>

            <div className="d-flex justify-content-center mt-4">
                <Button
                    variant="success"
                    style={{
                        backgroundColor: '#82b864',
                        borderColor: '#82b864',
                        marginBottom: '20px',
                    }}
                    href="/"
                >
                    Retour
                </Button>
            </div>
        </div>
    );
}

export default PagesConstruction;