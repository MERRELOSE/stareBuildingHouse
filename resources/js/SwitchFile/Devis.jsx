import React, { useState } from 'react';
import './Devis.css'
import Devis1 from '../Terrassement/Devis1.jsx';
import Devis2 from '../Fondation/Devis2';
import Devis5 from '../Blocs/Devis5';
import Devis6 from '../Beton/Devis6';
import Elevation from '../ElevationDesMurs/Elevation'; // Import du nouveau composant Élévation
import ToitureSelector from '../Toiture/ToitureSelector';
import Devis7 from '../ToitureTwo/Devis7';
import Devis8 from '../ToleGalvanisee/Devis8';
import TileSelection from '../TileCarreau/TileSelection';  // Composant pour la sélection de revêtement de sol
import DevisFinal from '../Devis/DevisFinal'; // Importation du composant final

const Devis = () => {
    const [step, setStep] = useState(1); // Étape actuelle du processus de devis
    const [quoteData, setQuoteData] = useState({
        perimetre: '',
        hauteurFondation: '',
        largeurFondation: '',
        longueurDeblai: '',
        quantiteRemblai: '',
        largeurBeton: '',
        epaisseurFondation: '',
        epaisseurChappe: '',
        aireHabitable: '',
        ciment: '',
        sable: '',
        gravier: '',
        blocs: '',
        charpente: '',
        toiture: '',
        typeToiture: '',
        materialToiture: '',
        plomberie: '',
        electricite: '',
        revetements: '',
        peinture: '',
        menuiserie: '',
        finitions: '',
        // Ajouts pour les revêtements de sol
        tileType: '',
        surfaceUtile: 0,
        numberOfTiles: 0,
    });

    // Calcul du coût total basé sur les données du devis
    const calculateTotalCost = () => {
        // Exemple de calcul : ajoutez des calculs détaillés ici
        const costMaterial = 100 * quoteData.surfaceUtile; // coût estimatif par m²
        const costLabour = 2000; // coût estimatif de la main-d'œuvre
        return costMaterial + costLabour;
    };

    // Fonction pour passer à l'étape suivante
    const nextStep = () => {
        setStep((prevStep) => prevStep + 1);
    };

    // Fonction pour revenir à l'étape précédente
    const prevStep = () => {
        setStep((prevStep) => prevStep - 1);
    };

    // Fonction pour mettre à jour les données du devis
    const updateQuoteData = (newData) => {
        setQuoteData((prevData) => ({
            ...prevData,
            ...newData,
        }));
    };

    // Fonction pour confirmer le devis final
    const confirmDevis = () => {
        // Logique pour sauvegarder le devis ou informer l'utilisateur
        console.log("Devis confirmé avec succès!", quoteData);
        alert("Votre devis a été confirmé avec succès !");
    };

    // Fonction pour rendre le composant approprié en fonction de l'étape actuelle
    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <Devis1
                        nextStep={nextStep}
                        quoteData={quoteData}
                        updateQuoteData={updateQuoteData}
                    />
                );
            case 2:
                return (
                    <Devis2
                        nextStep={nextStep}
                        prevStep={prevStep}
                        quoteData={quoteData}
                        updateQuoteData={updateQuoteData}
                    />
                );
            case 3:
                return (
                    <Devis5
                        nextStep={nextStep}
                        prevStep={prevStep}
                        quoteData={quoteData}
                        updateQuoteData={updateQuoteData}
                    />
                );
            case 4:
                return (
                    <Devis6
                        nextStep={nextStep}
                        prevStep={prevStep}
                        quoteData={quoteData}
                        updateQuoteData={updateQuoteData}
                    />
                );
            case 5:
                return (
                    <Elevation // Ajout de l'étape Élévation ici
                        nextStep={nextStep}
                        prevStep={prevStep}
                        quoteData={quoteData}
                        updateQuoteData={updateQuoteData}
                    />
                );
            case 6:
                return (
                    <ToitureSelector
                        nextStep={nextStep}
                        prevStep={prevStep}
                        quoteData={quoteData}
                        updateQuoteData={updateQuoteData}
                    />
                    );
            case 7:
                if (quoteData.materialToiture === 'toleGalvanisee') {
                    return (
                        <Devis7
                            nextStep={nextStep}
                            prevStep={prevStep}
                            quoteData={quoteData}
                            updateQuoteData={updateQuoteData}
                        />
                    );
                }
                else {
                    return (
                        <div>
                            <p>Sélectionnez d'abord un matériau de toiture.</p>
                            <button onClick={prevStep}>Retour</button>
                        </div>
                    );
                }
            case 8:
                    return (
                        <Devis8
                            nextStep={nextStep}
                            prevStep={prevStep}
                            quoteData={quoteData}
                            updateQuoteData={updateQuoteData}
                        />
                    );
            case 9:
                return (
                    <TileSelection
                        nextStep={nextStep}
                        prevStep={prevStep}
                        quoteData={quoteData}
                        updateQuoteData={updateQuoteData}
                    />
                );
            case 10:
                return (
                    <DevisFinal
                        quoteData={quoteData}
                        totalCost={calculateTotalCost()}
                        onConfirm={confirmDevis}
                        onEdit={prevStep}
                    />
                );
            default:
                return <h3>Erreur: étape inconnue.</h3>;
        }
    };

    return (
        <div className="devis-container">
            <h1>Processus de Devis</h1>
            {renderStep()}
        </div>
    );
};

export default Devis;
