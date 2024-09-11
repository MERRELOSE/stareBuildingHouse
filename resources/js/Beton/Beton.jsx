import React, { useState, useEffect } from 'react';
import "./Beton.css";

const Beton = ({ nextStep, prevStep, quoteData, updateQuoteData }) => {
    const [longueurPoutre, setLongueurPoutre] = useState(quoteData.longueurPoutre || 0);
    const [longueurEtrier, setLongueurEtrier] = useState(quoteData.longueurEtrier || 0);
    const [volumeBeton, setVolumeBeton] = useState(quoteData.volumeBeton || 0);

    // Coûts unitaires des matériaux
    const costPerCiment = 50;       // Coût unitaire du ciment par sac (en euros)
    const costPerSable = 30;        // Coût unitaire du sable par m³
    const costPerCaillasse = 40;    // Coût unitaire de la caillasse par m³
    const costPerEau = 5;           // Coût du mètre cube d'eau (à ajouter si nécessaire)

    useEffect(() => {
        const perimetre = quoteData.perimetre || 0;
        const longueurCommerciale = 12; // Longueur commerciale par défaut

        // Calculs des quantités
        const longueurDeveloppee = perimetre * 4 + 24; // 24 m pour les barres de fer
        const nombreArmature = longueurDeveloppee / longueurCommerciale;
        const intervalle = 0.2; // 20 cm
        const nombreEtriers = (perimetre / intervalle) + 1;
        const longueurEtrierTotal = (nombreEtriers * longueurEtrier) + 12; // Ajouter une marge de 12 m
        const volume = perimetre * longueurPoutre;
        const quantiteCiment = (volume * 350) / 50;
        const quantiteSable = volume * 0.4 * 1.5;
        const quantiteCaillasse = quantiteSable * 2;
        const quantiteEau = volume * 0.5; // Exemple : 0.5m³ d'eau par m³ de béton

        // Calcul des coûts
        const coutCiment = quantiteCiment * costPerCiment;
        const coutSable = quantiteSable * costPerSable;
        const coutCaillasse = quantiteCaillasse * costPerCaillasse;
        const coutEau = quantiteEau * costPerEau;

        // Mise à jour des données du devis avec les quantités et les coûts
        updateQuoteData(prevData => ({
            ...prevData,
            longueurDeveloppee,
            nombreArmature,
            nombreEtriers,
            longueurEtrierTotal,
            volume,
            quantiteCiment,
            quantiteSable,
            quantiteCaillasse,
            quantiteEau,
            coutCiment,
            coutSable,
            coutCaillasse,
            coutEau,
        }));
    }, [longueurPoutre, longueurEtrier, volumeBeton, quoteData.perimetre, updateQuoteData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'longueurPoutre') {
            setLongueurPoutre(Number(value));
        } else if (name === 'longueurEtrier') {
            setLongueurEtrier(Number(value));
        } else if (name === 'volumeBeton') {
            setVolumeBeton(Number(value));
        }
    };

    return (
        <div className='devis6'>
            <h2>Étape 4: Poutre de Ceinture</h2>
            <label>
                Longueur de la poutre (m):
                <input
                    type="number"
                    name="longueurPoutre"
                    value={longueurPoutre}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                />
            </label>
            <br />
            <label>
                Longueur d'étrier (m):
                <input
                    type="number"
                    name="longueurEtrier"
                    value={longueurEtrier}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                />
            </label>
            <br />
            <label>
                Volume de béton (m³):
                <input
                    type="number"
                    name="volumeBeton"
                    value={volumeBeton}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                />
            </label>
            <br />
            <div className="actionbutton">
                <button onClick={prevStep}>Précédent</button>
                <button 
                    onClick={nextStep} 
                    disabled={longueurPoutre <= 0 || longueurEtrier <= 0 || volumeBeton <= 0} // Désactive le bouton si l'un des champs est à zéro
                >
                    Suivant
                </button>
            </div>
        </div>
    );
};

export default Beton;
