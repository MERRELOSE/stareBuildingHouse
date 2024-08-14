import React, { useState } from 'react';

const Devis12 = ({ prevStep, quoteData, }) => {
    const [finitionsInt, setFinitionsInt] = useState(quoteData.finitionsInt || '');
    const [finitionsExt, setFinitionsExt] = useState(quoteData.finitionsExt || '');

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'finitionsInt':
                setFinitionsInt(value);
                break;
            case 'finitionsExt':
                setFinitionsExt(value);
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <h2>Étape 12 : Finitions Intérieures et Extérieures</h2>
            <label>
                Finitions intérieures:
                <input type="text" name="finitionsInt" value={finitionsInt} onChange={handleChange} />
            </label>
            <br />
            <label>
                Finitions extérieures:
                <input type="text" name="finitionsExt" value={finitionsExt} onChange={handleChange} />
            </label>
            <br />
            <button onClick={prevStep}>Précédent</button>
            <button onClick={() => alert('Devis complet !')}>Terminer</button>
        </div>
    );
};

export default Devis12;
