import React, { useState, useEffect } from 'react';
import "./Devis4.css";


const Devis4 = ({ nextStep, prevStep, quoteData, updateQuoteData }) => {
    // Initialisation de l'état pour l'aire de surface (AT) et l'épaisseur du béton (e)
    const [aireSurface, setAireSurface] = useState(quoteData.aireSurface || 0);
    const [epaisseurBeton, setEpaisseurBeton] = useState(quoteData.epaisseurBeton || 0.15); // Valeur par défaut de 0.15m

    // Utilisation de useEffect pour calculer les matériaux lorsque les valeurs changent
    useEffect(() => {
        // Calcul du volume de la dalle
        const volumeDalle = aireSurface * epaisseurBeton;
        // Calcul de la quantité de ciment
        const quantiteCiment = (volumeDalle * 350) / 50;
        // Calcul de la quantité de sable
        const quantiteSable = volumeDalle * 0.4 * 1.5;
        // Calcul de la quantité de gravier
        const quantiteGravier = quantiteSable * 2;

        // Mise à jour des données du devis
        updateQuoteData({
            aireSurface,
            epaisseurBeton,
            volumeDalle,
            quantiteCiment,
            quantiteSable,
            quantiteGravier,
        });
    }, [aireSurface, epaisseurBeton]);

    // Gestion des changements dans les champs de saisie
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'aireSurface') {
            setAireSurface(Number(value));
        } else if (name === 'epaisseurBeton') {
            setEpaisseurBeton(Number(value));
        }
    };

    return (
        <div className='devis4'>
            <h2>Étape 4: Nombre de Sacs de Ciment pour une Dalle</h2>
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
            <br />
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
            <br />
            <h3>Résultats</h3>
            <p>Volume de la Dalle (m³): {quoteData.volumeDalle?.toFixed(2) || 'N/A'}</p>
            <p>Quantité de Ciment (sacs de 50kg): {quoteData.quantiteCiment?.toFixed(2) || 'N/A'}</p>
            <p>Quantité de Sable (Tonnes): {quoteData.quantiteSable?.toFixed(2) || 'N/A'}</p>
            <p>Quantité de Gravier (Tonnes): {quoteData.quantiteGravier?.toFixed(2) || 'N/A'}</p>
            <br />
            <button onClick={prevStep}>Précédent</button>
            <button onClick={nextStep}>Suivant</button>
        </div>
    );
};

export default Devis4;
