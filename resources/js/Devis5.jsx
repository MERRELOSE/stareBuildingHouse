import React, { useState, useEffect } from 'react';
import "./Devis5.css"

const Devis5 = ({ nextStep, prevStep, quoteData, updateQuoteData }) => {
    // Initialisation de l'état pour la surface utile
    const [surfaceUtile, setSurfaceUtile] = useState(quoteData.surfaceUtile || 0);

    // Utilisation de useEffect pour calculer les matériaux lorsque la surface utile change
    useEffect(() => {
        // Calcul du nombre de blocs nécessaires
        const nombreBlocs = (surfaceUtile * 13) + ((65 * surfaceUtile) / 100);
        // Calcul du nombre de sacs de ciment nécessaires
        const quantiteCiment = nombreBlocs / 25;
        // Calcul de la quantité de sable nécessaire en tonnes
        const quantiteSable = (quantiteCiment * 3 * 60 * 1000) * 1.5 / 1000;

        // Mise à jour des données du devis
        updateQuoteData({
            surfaceUtile,
            nombreBlocs,
            quantiteCiment,
            quantiteSable,
        });
    }, [surfaceUtile]);

    // Gestion des changements dans les champs de saisie
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'surfaceUtile') {
            setSurfaceUtile(Number(value));
        }
    };

    // Fonction pour obtenir une valeur formatée ou un texte par défaut
    const formatValue = (value) => {
        return value !== undefined && value !== null ? value.toFixed(0) : 'N/A';
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
            <h3>Résultats</h3>
            <p>Nombre de Blocs: {formatValue(quoteData.nombreBlocs)}</p>
            <p>Quantité de Ciment (sacs de 50kg): {formatValue(quoteData.quantiteCiment)}</p>
            <p>Quantité de Sable (Tonnes): {formatValue(quoteData.quantiteSable)}</p>
            <br />
            <button onClick={prevStep}>Précédent</button>
            <button onClick={nextStep}>Suivant</button>
        </div>
    );
};

export default Devis5;
