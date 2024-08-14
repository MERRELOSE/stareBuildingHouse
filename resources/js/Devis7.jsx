import React, { useState, useEffect } from 'react';
import './Devis7.css';

const Devis7 = ({ nextStep, prevStep, quoteData, updateQuoteData }) => {
    const [ecartementFermes, setEcartementFermes] = useState(2); // Valeur par défaut de 2m pour l'écartement
    const [nombreFermes, setNombreFermes] = useState(0);
    const [dimensionFerme, setDimensionFerme] = useState('');
    const [nombreMadrier, setNombreMadrier] = useState(0);
    const [nombreChevrons, setNombreChevrons] = useState(0);

    // Utiliser useEffect pour calculer le nombre de fermes chaque fois que l'écartement ou le périmètre change
    useEffect(() => {
        calculerNombreFermes();
    }, [ecartementFermes, quoteData.perimetre]);

    // Calcul du nombre de fermes
    const calculerNombreFermes = () => {
        const lb = parseFloat(quoteData.perimetre) || 0;
        const nf = Math.ceil(lb / ecartementFermes);
        setNombreFermes(nf);
    };

    // Utiliser useEffect pour calculer le nombre de madriers chaque fois que la dimension ou le nombre de fermes change
    useEffect(() => {
        calculerNombreMadrier();
    }, [dimensionFerme, nombreFermes]);

    // Calcul du nombre de madriers
    const calculerNombreMadrier = () => {
        const df = parseFloat(dimensionFerme) || 0;
        const nf = parseInt(nombreFermes) || 0;
        const madriers = (df * nf) / 4.5;
        setNombreMadrier(Math.ceil(madriers));
    };

    // Gestion des changements de dimension
    const handleDimensionChange = (e) => {
        setDimensionFerme(e.target.value);
    };

    // Envoi des données au parent
    const handleSubmit = () => {
        // Vérification des champs requis
        if (dimensionFerme && nombreFermes && nombreChevrons) {
            updateQuoteData({
                ...quoteData,
                nombreFermes,
                dimensionFerme,
                nombreMadrier,
                nombreChevrons,
            });
            nextStep();
        } else {
            alert('Veuillez remplir tous les champs requis.');
        }
    };

    return (
        <div className="devis7">
            <h2>Étape 5: Toiture - Madrier et Chevrons</h2>
            <div className="form-group">
                <label htmlFor="ecartementFermes">
                    Ecartement entre fermes (m) :
                </label>
                <select
                    id="ecartementFermes"
                    value={ecartementFermes}
                    onChange={(e) => setEcartementFermes(parseFloat(e.target.value))}
                >
                    <option value={1.5}>1.5 m</option>
                    <option value={2}>2 m</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="nombreFermes">
                    Nombre de fermes (Nf) :
                </label>
                <input
                    type="number"
                    id="nombreFermes"
                    value={nombreFermes}
                    onChange={(e) => setNombreFermes(parseInt(e.target.value))}
                    step="1" 
                    min="0"
                    readOnly // Le nombre de fermes est calculé automatiquement
                />
            </div>
            <div className="form-group">
                <label htmlFor="dimensionFerme">
                    Dimension d'une ferme (Df en m) :
                </label>
                <input
                    type="number"
                    id="dimensionFerme"
                    value={dimensionFerme}
                    onChange={handleDimensionChange}
                    placeholder="Entrez la dimension de la ferme"
                    step="0.5"
                    min="0"
                />
            </div>
            <div className="form-group">
                <label htmlFor="nombreMadrier">
                    Nombre de madriers :
                </label>
                <input
                    type="number"
                    id="nombreMadrier"
                    value={nombreMadrier}
                    onChange={(e) => setNombreMadrier(parseInt(e.target.value))}
                    step="1" 
                    min="0"
                    readOnly // Le nombre de madriers est calculé automatiquement
                />
            </div>
            <div className="form-group">
                <label htmlFor="nombreChevrons">
                    Nombre de chevrons (Nc) :
                </label>
                <input
                    type="number"
                    id="nombreChevrons"
                    value={nombreChevrons}
                    onChange={(e) => setNombreChevrons(parseInt(e.target.value))}
                    step="1"
                    min="0"
                />
            </div>
            <div className="button-group">
                <button onClick={prevStep}>Précédent</button>
                <button onClick={handleSubmit}>Suivant</button>
            </div>
        </div>
    );
};

export default Devis7;
