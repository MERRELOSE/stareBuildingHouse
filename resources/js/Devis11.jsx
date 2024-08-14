import React, { useState } from 'react';

const Devis11 = ({ nextStep, prevStep, quoteData, updateQuoteData }) => {
    const [nombrePortes, setNombrePortes] = useState(quoteData.nombrePortes || '');
    const [nombreFenêtres, setNombreFenêtres] = useState(quoteData.nombreFenêtres || '');

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'nombrePortes':
                setNombrePortes(value);
                break;
            case 'nombreFenêtres':
                setNombreFenêtres(value);
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <h2>Étape 11 : Menuiserie Intérieure</h2>
            <label>
                Nombre de portes:
                <input type="number" name="nombrePortes" value={nombrePortes} onChange={handleChange} />
            </label>
            <br />
            <label>
                Nombre de fenêtres:
                <input type="number" name="nombreFenêtres" value={nombreFenêtres} onChange={handleChange} />
            </label>
            <br />
            <button onClick={prevStep}>Précédent</button>
            <button onClick={nextStep}>Suivant</button>
        </div>
    );
};

export default Devis11;
