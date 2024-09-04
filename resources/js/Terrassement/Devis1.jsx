import React, { useState, useEffect } from 'react';
import './Devis1.css';

const Devis1 = ({ nextStep, quoteData, updateQuoteData }) => {
    const [aireDalle, setAireDalle] = useState(quoteData.aireDalle || '');
    const [epaisseurFondation, setEpaisseurFondation] = useState(quoteData.epaisseurFondation || '');

    useEffect(() => {
        if (aireDalle && epaisseurFondation) {
            const volumeBeton = aireDalle * epaisseurFondation;
            const quantiteCiment = (volumeBeton * 200) / 50;
            const quantiteSable = volumeBeton * 0.4 * 1.5;
            const quantiteGravier = volumeBeton * 0.8 * 1.6;

            updateQuoteData({
                epaisseurFondation,
                volumeBeton,
                quantiteCiment,
                quantiteSable,
                quantiteGravier,
            });
        }
    }, [aireDalle && epaisseurFondation]);

    const handleChange = (e) => {
        const { name, value } = e.target;
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
    };

    const handleNext = () => {
        if (aireDalle && epaisseurFondation) {
            nextStep();
        } else {
            alert('Veuillez remplir tous les champs avant de continuer.');
        }
    };

    return (
        <div className='devis1'>
            <h2>Étape 1: Terrassement</h2>
            <label>
                Aire de la surface de la dalle en béton (en m²):
                <input type="number" name="aireDalle" value={aireDalle} onChange={handleChange} step="0.01" min="0" />
            </label>
            <br />
            <label>
                Épaisseur de la dalle en béton (en mêtre):
                <input type="number" name="epaisseurFondation" value={epaisseurFondation} onChange={handleChange} step="0.01" min="15cm" max="20cm" />
            </label>
            <br />
            <button onClick={handleNext}>Suivant</button>
        </div>
    );
};

export default Devis1;
