import React, { useState, useEffect } from 'react';
import './Fondation.css';

const Fondation = ({ nextStep, prevStep, quoteData, updateQuoteData }) => {
    const [volumeFondation, setVolumeFondation] = useState(quoteData.volumeFondation || '');
    const [volumeChappe, setVolumeChappe] = useState(quoteData.volumeChappe || '');

    // Coûts unitaires (à ajuster en fonction du marché)
    const coutCimentUnitaire = 10;  // Coût d'un sac de ciment de 50kg
    const coutSableUnitaire = 30;   // Coût du mètre cube de sable
    const coutGravierUnitaire = 40; // Coût du mètre cube de gravier
    const coutCaillasseUnitaire = 25; // Coût du mètre cube de caillasse
    const coutEauUnitaire = 5; // Coût du mètre cube d'eau

    useEffect(() => {
        if (volumeFondation !== '') {
            const volumeFondationNum = parseFloat(volumeFondation);
            const volumeMoellon = volumeFondationNum * 1.3;
            const quantiteCimentFondation = (volumeFondationNum * 150) / 50;  // 150kg de ciment par m³
            const quantiteSableFondation = volumeFondationNum * 0.4 * 1.5;     // Sable
            const quantiteCaillasseFondation = volumeFondationNum * 0.5; // Ex : 0.5m³ de caillasse pour 1m³ de béton
            const quantiteEauFondation = volumeFondationNum * 0.6; // Ex : 0.6m³ d'eau pour 1m³ de béton

            const coutTotalCimentFondation = quantiteCimentFondation * coutCimentUnitaire;
            const coutTotalSableFondation = quantiteSableFondation * coutSableUnitaire;
            const coutTotalCaillasseFondation = quantiteCaillasseFondation * coutCaillasseUnitaire;
            const coutTotalEauFondation = quantiteEauFondation * coutEauUnitaire;

            updateQuoteData(prevData => ({
                ...prevData,
                volumeFondation: volumeFondationNum,
                volumeMoellon,
                quantiteCimentFondation: (prevData.quantiteCimentFondation || 0) + quantiteCimentFondation,
                quantiteSableFondation: (prevData.quantiteSableFondation || 0) + quantiteSableFondation,
                quantiteCaillasseFondation: (prevData.quantiteCaillasseFondation || 0) + quantiteCaillasseFondation,
                quantiteEauFondation: (prevData.quantiteEauFondation || 0) + quantiteEauFondation,
                coutTotalCimentFondation: (prevData.coutTotalCimentFondation || 0) + coutTotalCimentFondation,
                coutTotalSableFondation: (prevData.coutTotalSableFondation || 0) + coutTotalSableFondation,
                coutTotalCaillasseFondation: (prevData.coutTotalCaillasseFondation || 0) + coutTotalCaillasseFondation,
                coutTotalEauFondation: (prevData.coutTotalEauFondation || 0) + coutTotalEauFondation,
            }));
        }

        if (volumeChappe !== '') {
            const volumeChappeNum = parseFloat(volumeChappe);
            const quantiteCimentChappe = (volumeChappeNum * 350) / 50;  // 350kg de ciment par m³
            const quantiteSableChappe = volumeChappeNum * 0.4 * 1.5;
            const quantiteGravierChappe = volumeChappeNum * 0.8 * 1.6;
            const coutTotalCimentChappe = quantiteCimentChappe * coutCimentUnitaire;
            const coutTotalSableChappe = quantiteSableChappe * coutSableUnitaire;
            const coutTotalGravierChappe = quantiteGravierChappe * coutGravierUnitaire;

            updateQuoteData(prevData => ({
                ...prevData,
                volumeChappe: volumeChappeNum,
                quantiteCimentChappe: (prevData.quantiteCimentChappe || 0) + quantiteCimentChappe,
                quantiteSableChappe: (prevData.quantiteSableChappe || 0) + quantiteSableChappe,
                quantiteGravierChappe: (prevData.quantiteGravierChappe || 0) + quantiteGravierChappe,
                coutTotalCimentChappe: (prevData.coutTotalCimentChappe || 0) + coutTotalCimentChappe,
                coutTotalSableChappe: (prevData.coutTotalSableChappe || 0) + coutTotalSableChappe,
                coutTotalGravierChappe: (prevData.coutTotalGravierChappe || 0) + coutTotalGravierChappe,
            }));
        }
    }, [volumeFondation, volumeChappe]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'volumeFondation':
                setVolumeFondation(value);
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
            </div>

            <br />
            <button onClick={prevStep}>Précédent</button>
            <button onClick={nextStep}>Suivant</button>
        </div>
    );
};

export default Fondation;
