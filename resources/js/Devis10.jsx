import React, { useState } from 'react';

const Devis10 = ({ nextStep, prevStep, quoteData, updateQuoteData }) => {
    const [surfacePeinture, setSurfacePeinture] = useState(quoteData.surfacePeinture || '');

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'surfacePeinture':
                setSurfacePeinture(value);
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <h2>Étape 10 : Peinture</h2>
            <label>
                Surface à peindre (m²):
                <input type="number" name="surfacePeinture" value={surfacePeinture} onChange={handleChange} />
            </label>
            <br />
            <button onClick={prevStep}>Précédent</button>
            <button onClick={nextStep}>Suivant</button>
        </div>
    );
};

export default Devis10;
