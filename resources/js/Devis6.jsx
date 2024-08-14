import React, { useState, useEffect } from 'react';
import "./Devis6.css"

const Devis6 = ({ nextStep, prevStep, quoteData, updateQuoteData }) => {
    const [longueurPoutre, setLongueurPoutre] = useState(quoteData.longueurPoutre || 0);
    const [longueurEtrier, setLongueurEtrier] = useState(quoteData.longueurEtrier || 0);
    const [volumeBeton, setVolumeBeton] = useState(quoteData.volumeBeton || 0);

    useEffect(() => {
        // Fonction pour calculer les valeurs
        const calculateValues = () => {
            const perimetre = quoteData.perimetre || 0;
            const longueurCommerciale = 12; // Longueur commerciale par défaut

            // Calculs
            const longueurDeveloppee = perimetre * 4 + 24; // 24 m pour les barres de fer
            const nombreArmature = longueurDeveloppee / longueurCommerciale;
            const intervalle = 0.2; // 20 cm
            const nombreEtriers = (perimetre / intervalle) + 1;
            const longueurEtrierTotal = (nombreEtriers * longueurEtrier) + 12; // Ajouter une marge de 12 m
            const volume = perimetre * longueurPoutre;
            const quantiteCiment = (volume * 350) / 50;
            const quantiteSable = volume * 0.4 * 1.5;
            const quantiteCaillasse = quantiteSable * 2;

            // Mise à jour de l'état global si les valeurs ont changé
            updateQuoteData((prevData) => {
                const newData = {
                    longueurDeveloppee,
                    nombreArmature,
                    nombreEtriers,
                    longueurEtrierTotal,
                    volume,
                    quantiteCiment,
                    quantiteSable,
                    quantiteCaillasse,
                };
                // Comparer l'état précédent avec le nouvel état
                if (JSON.stringify(prevData) !== JSON.stringify(newData)) {
                    return newData;
                }
                return prevData;
            });
        };

        calculateValues();
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

    const formatValue = (value) => {
        return value !== undefined && value !== null ? value.toFixed(2) : 'N/A';
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
            <h3>Résultats</h3>
            <p>Longueur Développée de Fer (m): {formatValue(quoteData.longueurDeveloppee)}</p>
            <p>Nombre d'Armatures: {formatValue(quoteData.nombreArmature)}</p>
            <p>Nombre d'Étriers: {formatValue(quoteData.nombreEtriers)}</p>
            <p>Longueur Totale d'Étriers (m): {formatValue(quoteData.longueurEtrierTotal)}</p>
            <p>Volume de Béton (m³): {formatValue(quoteData.volume)}</p>
            <p>Quantité de Ciment (sacs de 50kg): {formatValue(quoteData.quantiteCiment)}</p>
            <p>Quantité de Sable (Tonnes): {formatValue(quoteData.quantiteSable)}</p>
            <p>Quantité de Caillasse (Tonnes): {formatValue(quoteData.quantiteCaillasse)}</p>
            <br />
            <button onClick={prevStep}>Précédent</button>
            <button onClick={nextStep}>Suivant</button>
        </div>
    );
};

export default Devis6;
