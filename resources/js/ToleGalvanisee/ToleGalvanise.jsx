import React, { useState, useEffect } from 'react';
import './ToleGalvanise.css';

const ToleGalvanise = ({ nextStep, prevStep, quoteData, updateQuoteData }) => {
    const [surfaceCouvrir, setSurfaceCouvrir] = useState(quoteData.surfaceCouvrir || '');
    const [surfaceUtileTole, setSurfaceUtileTole] = useState(quoteData.surfaceUtileTole || '');
    const [nombreTole, setNombreTole] = useState(0);

    useEffect(() => {
        calculerNombreTole();
    }, [surfaceCouvrir, surfaceUtileTole]);

    const calculerNombreTole = () => {
        const sc = parseFloat(surfaceCouvrir) || 0;
        const sut = parseFloat(surfaceUtileTole) || 0;
        if (sut > 0) {
            const nt = (sc / sut) * 1.15; // Ajouter 15% de marge
            setNombreTole(Math.ceil(nt));
        }
    };

    const handleSubmit = () => {
        if (surfaceCouvrir > 0 && surfaceUtileTole > 0) {
            updateQuoteData({
                surfaceCouvrir,
                surfaceUtileTole,
                nombreTole,
            });
            nextStep();
        } else {
            alert('Veuillez remplir tous les champs requis avec des valeurs positives.');
        }
    };

    return (
        <div className="devis8">
            <h2>Étape 8: Couverture en Tôle Galvanisée</h2>
            <div className="form-group">
                <label htmlFor="surfaceCouvrir">Surface à couvrir (Sc en m²) :</label>
                <input
                    type="number"
                    id="surfaceCouvrir"
                    value={surfaceCouvrir}
                    onChange={(e) => setSurfaceCouvrir(e.target.value)}
                    placeholder="Entrez la surface à couvrir"
                    step="0.01" min="0"
                />
            </div>
            <div className="form-group">
                <label htmlFor="surfaceUtileTole">Surface utile de la tôle (Sut en m²) :</label>
                <input
                    type="number"
                    id="surfaceUtileTole"
                    value={surfaceUtileTole}
                    onChange={(e) => setSurfaceUtileTole(e.target.value)}
                    placeholder="Entrez la surface utile d'une tôle"
                    step="0.01" min="0"
                />
            </div>
            <div className="form-group">
                <label htmlFor="nombreTole">Nombre de tôles à acheter (Nt) :</label>
                <input
                    type="number"
                    id="nombreTole"
                    value={nombreTole.toFixed(0)}
                    readOnly
                />
            </div>
            <div className="button-group">
                <button onClick={prevStep}>Précédent</button>
                <button onClick={handleSubmit}>Suivant</button>
            </div>
        </div>
    );
};

export default ToleGalvanise;
