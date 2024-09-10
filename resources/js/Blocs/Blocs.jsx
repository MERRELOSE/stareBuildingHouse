import React, { useState, useEffect } from 'react';
import "./Blocs.css";

const Blocs = ({ nextStep, prevStep, quoteData, updateQuoteData }) => {
    // Initialisation de l'état pour la surface utile
    const [surfaceUtile, setSurfaceUtile] = useState(quoteData.surfaceUtile || 0);

    // Coûts unitaires (à ajuster en fonction du marché)
    const coutBlocUnitaire = 1.5;  // Coût par bloc
    const coutCimentUnitaire = 10; // Coût d'un sac de ciment de 50kg
    const coutSableUnitaire = 30;  // Coût du mètre cube de sable
    const coutCaillasseUnitaire = 25; // Coût du mètre cube de caillasse
    const coutEauUnitaire = 5; // Coût du mètre cube d'eau

    // Utilisation de useEffect pour calculer les matériaux lorsque la surface utile change
    useEffect(() => {
        if (surfaceUtile > 0) {
            const nombreBlocs = (surfaceUtile * 13) + ((65 * surfaceUtile) / 100); // Calcul des blocs nécessaires
            const quantiteCiment = nombreBlocs / 25; // 1 sac de ciment pour 25 blocs
            const quantiteSable = (quantiteCiment * 3 * 60 * 1000) * 1.5 / 1000; // Sable en fonction du ciment
            const quantiteCaillasse = surfaceUtile * 0.5; // Exemple : 0.5m³ de caillasse par m² de surface utile
            const quantiteEau = surfaceUtile * 0.3; // Exemple : 0.3m³ d'eau par m² de surface utile

            // Calcul des coûts
            const coutTotalBlocs = nombreBlocs * coutBlocUnitaire;
            const coutTotalCiment = quantiteCiment * coutCimentUnitaire;
            const coutTotalSable = quantiteSable * coutSableUnitaire;
            const coutTotalCaillasse = quantiteCaillasse * coutCaillasseUnitaire;
            const coutTotalEau = quantiteEau * coutEauUnitaire;

            // Mise à jour des données du devis
            updateQuoteData(prevData => ({
                ...prevData,
                surfaceUtile,
                nombreBlocs,
                quantiteCiment,
                quantiteSable,
                quantiteCaillasse,
                quantiteEau,
                coutTotalBlocs,
                coutTotalCiment,
                coutTotalSable,
                coutTotalCaillasse,
                coutTotalEau,
            }));
        }
    }, [surfaceUtile, updateQuoteData]);

    // Gestion des changements dans les champs de saisie
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'surfaceUtile') {
            setSurfaceUtile(Number(value));
        }
    };

    return (
        <div className='devis5'>
            <h2>Étape 3: Nombre de Blocs</h2>
            <label>
                Surface Utile (m²):
                <input
                    type="number"
                    name="surfaceUtile"
                    value={surfaceUtile}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                />
            </label>
            <br />
            <button onClick={prevStep}>Précédent</button>
            <button onClick={nextStep}>Suivant</button>
        </div>
    );
};

export default Blocs;
