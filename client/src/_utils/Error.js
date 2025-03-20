import React from 'react';
import { Button } from 'react-bootstrap';
import notFoundImage from '../images/not-found404.jpg';

const Error = () => {
    return (
        <div
            className='Error'
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <img
                src={notFoundImage}
                alt="Error 404"
                style={{
                    maxWidth: '100%',
                    height: 'auto',
                    marginBottom: '20px',
                }}
            />
            <h3 style={{ color: '#cd2c2e' }}>Cette pages n'existe pas! Veuillez vérifier votre URL !</h3>
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

export default Error;