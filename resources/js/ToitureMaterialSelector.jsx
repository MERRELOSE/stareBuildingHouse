import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './ToitureMaterialSelector.css';

const ToitureMaterialSelector = ({ nextStep, prevStep, updateQuoteData }) => {
    const { typeToiture } = useParams(); // Récupérer le type de toiture depuis les paramètres de la route
    const [material, setMaterial] = useState('');
    const [error, setError] = useState('');

    const handleSelection = (value) => {
        setMaterial(value);
        setError(''); // Réinitialiser l'erreur lors de la sélection d'un matériau
    };

    const handleSubmit = () => {
        if (material) {
            updateQuoteData({ materialToiture: material });
            nextStep();
        } else {
            setError('Veuillez sélectionner un matériau.');
        }
    };

    return (
        <div className="toiture-material-selector">
            <h2>Choisissez le Matériau pour {typeToiture === 'toitPlat' ? 'Toit Plat' : 'Toit en Pente'}</h2>
            <div className="toiture-options">
                {typeToiture === 'toitPlat' && (
                    <>
                        <div
                            className={`toiture-card ${material === 'membraneEPDM' ? 'selected' : ''}`}
                            onClick={() => handleSelection('membraneEPDM')}
                        >
                            <img src="path/to/epdm-membrane-image.jpg" alt="Membrane EPDM" />
                            <h3>Membrane EPDM</h3>
                            <p>Membrane en caoutchouc pour toiture plate, durable et résistante aux intempéries.</p>
                        </div>
                        <div
                            className={`toiture-card ${material === 'bitume' ? 'selected' : ''}`}
                            onClick={() => handleSelection('bitume')}
                        >
                            <img src="./components/Bitumes.jpg" alt="Bitume" />
                            <h3>Bitume</h3>
                            <p>Solution économique pour toit plat, facile à installer et à entretenir.</p>
                        </div>
                    </>
                )}
                {typeToiture === 'toitEnPente' && (
                    <>
                        <div
                            className={`toiture-card ${material === 'toleOndulee' ? 'selected' : ''}`}
                            onClick={() => handleSelection('toleOndulee')}
                        >
                            <img src="path/to/tole-ondulee-image.jpg" alt="Tôle Ondulée" />
                            <h3>Tôle Ondulée</h3>
                            <p>Toiture en tôle ondulée, idéale pour une solution économique et durable.</p>
                        </div>
                        <div
                            className={`toiture-card ${material === 'tuiles' ? 'selected' : ''}`}
                            onClick={() => handleSelection('tuiles')}
                        >
                            <img src="path/to/tiles-image.jpg" alt="Tuiles" />
                            <h3>Tuiles</h3>
                            <p>Toit esthétique et durable en tuiles, offrant une excellente isolation.</p>
                        </div>
                    </>
                )}
            </div>
            {error && <div className="error-message">{error}</div>}
            <button onClick={prevStep} className="prev-button">
                Précédent
            </button>
            <button onClick={handleSubmit} className="next-button">
                Suivant
            </button>
        </div>
    );
};

export default ToitureMaterialSelector;
