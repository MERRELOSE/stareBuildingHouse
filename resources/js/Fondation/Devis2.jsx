import React, { useState, useEffect } from 'react';
import './Devis2.css';

const Devis2 = ({ nextStep, prevStep, quoteData, updateQuoteData }) => {
    // État pour stocker toutes les informations des trois composants
    const [volumeFondation, setVolumeDalleBeton] = useState(quoteData.volumeFondation || '');
    const [volumeChappe, setVolumeChappe] = useState(quoteData.volumeChappe || '');

    // Utilisation de useEffect pour calculer les matériaux lorsque les valeurs changent
    useEffect(() => {
        // Calculs pour Fondation en Moellon
        if (volumeFondation !== '') {
            const volumeFondationNum = parseFloat(volumeFondation);
            const volumeMoellon = volumeFondationNum * 1.3; // Volume de Moellon
            const quantiteCimentFondation = (volumeFondationNum * 150) / 50; // Quantité de Ciment
            const quantiteSableFondation = volumeFondationNum * 0.4 * 1.5; // Quantité de Sable

            updateQuoteData(prevData => ({
                ...prevData,
                volumeFondation: volumeFondationNum,
                volumeMoellon,
                quantiteCimentFondation,
                quantiteSableFondation,
            }));
        }

        // Calculs pour Chape d'Égalisation
        if (volumeChappe !== '') {
            const volumeChappeNum = parseFloat(volumeChappe);
            const quantiteCimentChappe = (volumeChappeNum * 350) / 50; // Quantité de Ciment
            const quantiteSableChappe = volumeChappeNum * 0.4 * 1.5;   // Quantité de Sable
            const quantiteGravierChappe = volumeChappeNum * 0.8 * 1.6; // Quantité de Gravier

            updateQuoteData(prevData => ({
                ...prevData,
                volumeChappe: volumeChappeNum,
                quantiteCimentChappe,
                quantiteSableChappe,
                quantiteGravierChappe,
            }));
        }
    })
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'volumeFondation':
                setVolumeDalleBeton(value);
                break;
            case 'volumeChappe':
                setVolumeChappe(value);
                break;
            default:
                break;
        }
    };

    return (
        <div className='devis2'>
            <h2>Étape 2: Fondation</h2><br />

            <div className="section">
                <h3>Fondation en Moellon</h3>
                <label>
                    Volume de la Fondation (m³) :
                    <input
                        type="number"
                        name="volumeFondation"
                        value={volumeFondation}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                    />
                </label>
                <p>Volume de moellon : {quoteData.volumeMoellon?.toFixed(2)} m³</p>
                <p>Quantité de ciment : {quoteData.quantiteCimentFondation?.toFixed(2)} sacs</p>
                <p>Quantité de sable : {quoteData.quantiteSableFondation?.toFixed(2)} tonnes</p>
            </div>

            <div className="section">
                <h3>Chape d'Égalisation</h3>
                <label>
                    Volume de la chape d'égalisation (m³):
                    <input
                        type="number"
                        name="volumeChappe"
                        value={volumeChappe}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                    />
                </label>
                <p>Quantité de ciment : {quoteData.quantiteCimentChappe?.toFixed(2)} sacs</p>
                <p>Quantité de sable : {quoteData.quantiteSableChappe?.toFixed(2)} tonnes</p>
                <p>Quantité de gravier : {quoteData.quantiteGravierChappe?.toFixed(2)} tonnes</p>
            </div>

            <br />
            <button onClick={prevStep}>Précédent</button>
            <button onClick={nextStep}>Suivant</button>
        </div>
    );
};

export default Devis2;
