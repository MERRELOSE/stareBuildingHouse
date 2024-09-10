import React, { useState, useEffect } from 'react';
import './Terrassement.css';

const Terrassement = ({ nextStep, quoteData, updateQuoteData }) => {
    const [aireDalle, setAireDalle] = useState(quoteData.aireDalle || '');
    const [epaisseurFondation, setEpaisseurFondation] = useState(quoteData.epaisseurFondation || '');

    // Coûts unitaires (à ajuster selon les prix du marché)
    const coutCimentUnitaire = 10; // Coût d'un sac de ciment de 50kg
    const coutSableUnitaire = 30;  // Coût du mètre cube de sable
    const coutGravierUnitaire = 40; // Coût du mètre cube de gravier
    const coutCaillasseUnitaire = 25; // Coût du mètre cube de caillasse
    const coutEauUnitaire = 5; // Coût du mètre cube d'eau

    useEffect(() => {
        if (aireDalle > 0 && epaisseurFondation > 0) {
            const volumeBeton = aireDalle * epaisseurFondation;
            const quantiteCiment = (volumeBeton * 200) / 50;  // 200 kg de ciment pour 1m³
            const quantiteSable = volumeBeton * 0.4 * 1.5;   // 0.4m³ de sable pour 1m³ de béton
            const quantiteGravier = volumeBeton * 0.8 * 1.6; // 0.8m³ de gravier pour 1m³ de béton
            const quantiteCaillasse = volumeBeton * 0.5; // Ex : 0.5m³ de caillasse pour 1m³ de béton
            const quantiteEau = volumeBeton * 0.6; // Ex : 0.6m³ d'eau pour 1m³ de béton

            // Calculs des coûts totaux
            const coutTotalCiment = quantiteCiment * coutCimentUnitaire;
            const coutTotalSable = quantiteSable * coutSableUnitaire;
            const coutTotalGravier = quantiteGravier * coutGravierUnitaire;
            const coutTotalCaillasse = quantiteCaillasse * coutCaillasseUnitaire;
            const coutTotalEau = quantiteEau * coutEauUnitaire;

            // Met à jour les données avec cumul des quantités
            updateQuoteData({
                ...quoteData, // Garde les autres données existantes
                aireDalle,
                epaisseurFondation,
                volumeBeton,
                quantiteCiment: (quoteData.quantiteCiment || 0) + quantiteCiment, // Ajoute la quantité calculée
                quantiteSable: (quoteData.quantiteSable || 0) + quantiteSable,   // Ajoute la quantité calculée
                quantiteGravier: (quoteData.quantiteGravier || 0) + quantiteGravier, // Ajoute la quantité calculée
                quantiteCaillasse: (quoteData.quantiteCaillasse || 0) + quantiteCaillasse, // Ajoute la quantité calculée
                quantiteEau: (quoteData.quantiteEau || 0) + quantiteEau, // Ajoute la quantité calculée
                coutTotalCiment: (quoteData.coutTotalCiment || 0) + coutTotalCiment, 
                coutTotalSable: (quoteData.coutTotalSable || 0) + coutTotalSable,
                coutTotalGravier: (quoteData.coutTotalGravier || 0) + coutTotalGravier,
                coutTotalCaillasse: (quoteData.coutTotalCaillasse || 0) + coutTotalCaillasse,
                coutTotalEau: (quoteData.coutTotalEau || 0) + coutTotalEau,
            });
        }
    }, [aireDalle, epaisseurFondation]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (value >= 0) {
            switch (name) {
                case 'aireDalle':
                    setAireDalle(value);
                    break;
                case 'epaisseurFondation':
                    setEpaisseurFondation(value);
                    break;
                default:
                    break;
            }
        }
    };

    const handleNext = () => {
        if (aireDalle > 0 && epaisseurFondation > 0) {
            nextStep();
        } else {
            alert('Veuillez remplir tous les champs correctement avant de continuer.');
        }
    };

    return (
        <div className='devis1'>
            <h2>Étape 1: Terrassement</h2>
            <label>
                Aire de la surface de la dalle en béton (en m²):
                <input 
                    type="number" 
                    name="aireDalle" 
                    value={aireDalle} 
                    onChange={handleChange} 
                    step="0.01" 
                    min="0" 
                    aria-label="Aire de la dalle en béton" 
                />
            </label>
            <br />
            <label>
                Épaisseur de la dalle en béton (en mètres):
                <input 
                    type="number" 
                    name="epaisseurFondation" 
                    value={epaisseurFondation} 
                    onChange={handleChange} 
                    step="0.01" 
                    min="0.15" 
                    max="0.20" 
                    aria-label="Épaisseur de la dalle en béton" 
                />
            </label>
            <br />
            <button onClick={handleNext}>Suivant</button>
        </div>
    );
};

export default Terrassement;
