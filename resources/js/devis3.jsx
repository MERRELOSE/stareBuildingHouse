import React, { useState, useEffect } from 'react';
import './Devis3.css';

const Devis3 = ({ nextStep, prevStep, quoteData, updateQuoteData }) => {
    // Initialisation de l'état pour stocker le volume de la chape
    const [volumeChappe, setVolumeChappe] = useState(quoteData.volumeChappe || '');

    useEffect(() => {
        if (volumeChappe !== '') {
            const volumeChappeNum = parseFloat(volumeChappe);
            const quantiteCiment = (volumeChappeNum * 350) / 50; // Calcul de la quantité de ciment
            const quantiteSable = volumeChappeNum * 0.4 * 1.5;   // Calcul de la quantité de sable
            const quantiteGravier = volumeChappeNum * 0.8 * 1.6; // Calcul de la quantité de gravier

            updateQuoteData({
                volumeChappe: volumeChappeNum,
                quantiteCiment,
                quantiteSable,
                quantiteGravier,
            });
        }
    }, [volumeChappe, updateQuoteData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'volumeChappe':
                setVolumeChappe(value); // Mise à jour du volume de la chape dans l'état
                break;
            default:
                break;
        }
    };

    return (
        <div className='devis3'>
            <h2>Étape 3: Chape d'Égalisation</h2>
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
            <br />
            <h3>Matériaux nécessaires</h3>
            <p>Quantité de ciment : {quoteData.quantiteCiment?.toFixed(2)} sacs</p>
            <p>Quantité de sable : {quoteData.quantiteSable?.toFixed(2)} tonnes</p>
            <p>Quantité de gravier : {quoteData.quantiteGravier?.toFixed(2)} tonnes</p>
            <br />
            <button onClick={prevStep}>Précédent</button>
            <button onClick={nextStep}>Suivant</button>
        </div>
    );
};

export default Devis3;
