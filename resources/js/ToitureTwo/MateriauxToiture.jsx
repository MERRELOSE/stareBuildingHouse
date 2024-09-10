import React, { useState, useEffect } from 'react';
import './MateriauxToiture.css';

const MateriauxToiture = ({ nextStep, prevStep, quoteData, updateQuoteData }) => {
    const [ecartementFermes, setEcartementFermes] = useState(3);
    const [longueurDevelopper, setLongueurDevelopper] = useState(quoteData.longueurDevelopper || 0);
    const [nombreFermes, setNombreFermes] = useState(0);
    const [dimensionFerme, setDimensionFerme] = useState('');
    const [nombreMadrier, setNombreMadrier] = useState(0);
    const [nombreChevrons, setNombreChevrons] = useState(0);

    // Ajout des prix pour les matériaux
    const prixMadrier = 15; // Exemple de prix par unité
    const prixChevrons = 10; // Exemple de prix par unité

    useEffect(() => {
        calculerNombreFermes();
    }, [ecartementFermes, longueurDevelopper]);

    const calculerNombreFermes = () => { 
        const lb = parseFloat(longueurDevelopper) || 0;
        const nf = Math.ceil(lb / ecartementFermes);
        setNombreFermes(nf);
    };

    useEffect(() => {
        calculerNombreMadrier();
    }, [dimensionFerme, nombreFermes]);

    const calculerNombreMadrier = () => {
        const df = parseFloat(dimensionFerme) || 0;
        const nf = parseInt(nombreFermes) || 0;
        const madriers = (df * nf) / 4.5;
        setNombreMadrier(Math.ceil(madriers));
    };

    // Calcul du coût total
    const calculerCoutTotal = () => {
        const coutMadrier = nombreMadrier * prixMadrier;
        const coutChevrons = nombreChevrons * prixChevrons;
        return coutMadrier + coutChevrons;
    };

    const handleDimensionChange = (e) => {
        setDimensionFerme(e.target.value);
    };

    const handleLongueurChange = (e) => {
        setLongueurDevelopper(e.target.value);
    };

    const handleSubmit = () => {
        if (longueurDevelopper && dimensionFerme && nombreFermes && nombreChevrons) {
            updateQuoteData({
                ...quoteData,
                longueurDevelopper,
                nombreFermes,
                dimensionFerme,
                nombreMadrier,
                nombreChevrons,
                coutTotal: calculerCoutTotal() // Ajout du coût total aux données du devis
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
                <label htmlFor="longueurDevelopper">Longueur développée (Ld en m) :</label>
                <input
                    type="number"
                    id="longueurDevelopper"
                    value={longueurDevelopper}
                    onChange={handleLongueurChange}
                    placeholder="Entrez la longueur développée du bâtiment"
                    step="0.5"
                    min="0"
                />
            </div>

            <div className="form-group">
                <label htmlFor="ecartementFermes">Écartement entre fermes (m) :</label>
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
                <label htmlFor="nombreFermes">Nombre de fermes (Nf) :</label>
                <input
                    type="number"
                    id="nombreFermes"
                    value={nombreFermes}
                    readOnly 
                />
            </div>

            <div className="form-group">
                <label htmlFor="dimensionFerme">Dimension d'une ferme (Df en m) :</label>
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
                <label htmlFor="nombreMadrier">Nombre de madriers :</label>
                <input
                    type="number"
                    id="nombreMadrier"
                    value={nombreMadrier}
                    readOnly 
                />
            </div>

            <div className="form-group">
                <label htmlFor="nombreChevrons">Nombre de chevrons (Nc) :</label>
                <input
                    type="number"
                    id="nombreChevrons"
                    value={nombreChevrons}
                    onChange={(e) => setNombreChevrons(parseInt(e.target.value))}
                    step="1"
                    min="0"
                />
            </div>

            <div className="cost-summary">
                <h3>Résumé des Coûts</h3>
                <p>Coût des Madriers : {nombreMadrier * prixMadrier} €</p>
                <p>Coût des Chevrons : {nombreChevrons * prixChevrons} €</p>
                <p><strong>Coût Total : {calculerCoutTotal()} €</strong></p>
            </div>

            <div className="button-group">
                <button onClick={prevStep}>Précédent</button>
                <button onClick={handleSubmit}>Suivant</button>
            </div>
        </div>
    );
};

export default MateriauxToiture;
