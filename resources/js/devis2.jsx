import React, { useState, useEffect } from 'react';
import './Devis2.css';

const Devis2 = ({ nextStep, prevStep, quoteData, updateQuoteData }) => {
    // État pour stocker toutes les informations des trois composants
    const [volumeFondation, setVolumeFondation] = useState(quoteData.volumeFondation || '');
    const [volumeChappe, setVolumeChappe] = useState(quoteData.volumeChappe || '');
    const [aireSurface, setAireSurface] = useState(quoteData.aireSurface || 0);
    const [epaisseurBeton, setEpaisseurBeton] = useState(quoteData.epaisseurBeton || 0.15);

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

        // Calculs pour Dalle
        const volumeDalle = aireSurface * epaisseurBeton;
        const quantiteCimentDalle = (volumeDalle * 350) / 50;
        const quantiteSableDalle = volumeDalle * 0.4 * 1.5;
        const quantiteGravierDalle = quantiteSableDalle * 2;

        updateQuoteData(prevData => ({
            ...prevData,
            aireSurface,
            epaisseurBeton,
            volumeDalle,
            quantiteCimentDalle,
            quantiteSableDalle,
            quantiteGravierDalle,
        }));

    }, [volumeFondation, volumeChappe, aireSurface, epaisseurBeton]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'volumeFondation':
                setVolumeFondation(value);
                break;
            case 'volumeChappe':
                setVolumeChappe(value);
                break;
            case 'aireSurface':
                setAireSurface(Number(value));
                break;
            case 'epaisseurBeton':
                setEpaisseurBeton(Number(value));
                break;
            default:
                break;
        }
    };

    return (
        <div className='devis2'>
            <h2>Étape 2: Informations Complètes pour le Devis</h2>

            <div className="section">
                <h3>Fondation en Moellon</h3>
                <label>
                    Volume de la fondation (m³) :
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

            <div className="section">
                <h3>Dalle</h3>
                <label>
                    Aire de Surface Habitable ou du Bâtiment (m²):
                    <input
                        type="number"
                        name="aireSurface"
                        value={aireSurface}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                    />
                </label>
                <label>
                    Épaisseur du Béton (m):
                    <input
                        type="number"
                        name="epaisseurBeton"
                        value={epaisseurBeton}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                    />
                </label>
                <p>Volume de la Dalle (m³): {quoteData.volumeDalle?.toFixed(2) || 'N/A'}</p>
                <p>Quantité de Ciment (sacs de 50kg): {quoteData.quantiteCimentDalle?.toFixed(2) || 'N/A'}</p>
                <p>Quantité de Sable (Tonnes): {quoteData.quantiteSableDalle?.toFixed(2) || 'N/A'}</p>
                <p>Quantité de Gravier (Tonnes): {quoteData.quantiteGravierDalle?.toFixed(2) || 'N/A'}</p>
            </div>

            <br />
            <button onClick={prevStep}>Précédent</button>
            <button onClick={nextStep}>Suivant</button>
        </div>
    );
};

export default Devis2;
