import React, { useState, useEffect } from 'react';
import './Devis1.css';

const Devis1 = ({ nextStep, quoteData, updateQuoteData }) => {
    const [perimetre, setPerimetre] = useState(quoteData.perimetre || '');
    const [hauteurFondation, setHauteurFondation] = useState(quoteData.hauteurFondation || '');
    const [largeurBeton, setLargeurBeton] = useState(quoteData.largeurBeton || '');

    useEffect(() => {
        if (perimetre && hauteurFondation && largeurBeton) {
            const volumeBeton = perimetre * hauteurFondation * largeurBeton;
            const quantiteCiment = (volumeBeton * 200) / 50;
            const quantiteSable = volumeBeton * 0.4 * 1.5;
            const quantiteGravier = volumeBeton * 0.8 * 1.6;

            updateQuoteData({
                perimetre,
                hauteurFondation,
                largeurBeton,
                volumeBeton,
                quantiteCiment,
                quantiteSable,
                quantiteGravier,
            });
        }
    }, [perimetre, hauteurFondation, largeurBeton]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'perimetre':
                setPerimetre(value);
                break;
            case 'hauteurFondation':
                setHauteurFondation(value);
                break;
            case 'largeurBeton':
                setLargeurBeton(value);
                break;
            default:
                break;
        }
    };

    const handleNext = () => {
        if (perimetre && hauteurFondation && largeurBeton) {
            nextStep();
        } else {
            alert('Veuillez remplir tous les champs avant de continuer.');
        }
    };

    return (
        <div className='devis1'>
            <h2>Étape 1: Terrassement</h2>
            <label>
                Périmètre (Longueur) du terrain habitable (m):
                <input type="number" name="perimetre" value={perimetre} onChange={handleChange} step="0.01" min="0" />
            </label>
            <br />
            <label>
                Épaisseur du béton (m):
                <input type="number" name="hauteurFondation" value={hauteurFondation} onChange={handleChange} step="0.01" min="0" />
            </label>
            <br />
            <label>
                Largeur du béton (m):
                <input type="number" name="largeurBeton" value={largeurBeton} onChange={handleChange} step="0.01" min="0" />
            </label>
            <br />
            <button onClick={handleNext}>Suivant</button>
        </div>
    );
};

export default Devis1;
