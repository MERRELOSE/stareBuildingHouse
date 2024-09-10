import React, { useState } from 'react';
import './Devis.css';
import Terrassement from '../Terrassement/Terrassement.jsx';
import Fondation from '../Fondation/Fondation.jsx';
import Blocs from '../Blocs/Blocs.jsx';
import Beton from '../Beton/Beton.jsx';
import Elevation from '../ElevationDesMurs/Elevation';
import ToitureSelector from '../Toiture/ToitureSelector';
import MateriauxToiture from '../ToitureTwo/MateriauxToiture.jsx';
import ToleGalvanise from '../ToleGalvanisee/ToleGalvanise.JSX';
import TileSelection from '../TileCarreau/TileSelection';

const Devis = () => {
    const [step, setStep] = useState(1);
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
        tileType: '',
        surfaceUtile: 0,
        numberOfTiles: 0,
        laborCost: 0,
        sandQuantity: 0,
        cementQuantity: 0,
        gravelQuantity: 0,
        stoneQuantity: 0,
        waterQuantity: 0,
        sandCost: 0,
        cementCost: 0,
        gravelCost: 0,
        stoneCost: 0,
        waterCost: 0,
    });

    const nextStep = () => {
        setStep(prevStep => prevStep + 1);
    };

    const prevStep = () => {
        setStep(prevStep => prevStep - 1);
    };

    const updateQuoteData = (newData) => {
        setQuoteData(prevData => ({
            ...prevData,
            ...newData,
        }));
    };

    const confirmDevis = () => {
        console.log("Devis confirmé avec succès!", quoteData);
        alert("Votre devis a été confirmé avec succès !");
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return <Terrassement nextStep={nextStep} quoteData={quoteData} updateQuoteData={updateQuoteData} />;
            case 2:
                return <Fondation nextStep={nextStep} prevStep={prevStep} quoteData={quoteData} updateQuoteData={updateQuoteData} />;
            case 3:
                return <Blocs nextStep={nextStep} prevStep={prevStep} quoteData={quoteData} updateQuoteData={updateQuoteData} />;
            case 4:
                return <Beton nextStep={nextStep} prevStep={prevStep} quoteData={quoteData} updateQuoteData={updateQuoteData} />;
            case 5:
                return <Elevation nextStep={nextStep} prevStep={prevStep} quoteData={quoteData} updateQuoteData={updateQuoteData} />;
            case 6:
                return <ToitureSelector nextStep={nextStep} prevStep={prevStep} quoteData={quoteData} updateQuoteData={updateQuoteData} />;
            case 7:
                if (quoteData.materialToiture === 'toleGalvanisee') {
                    return <MateriauxToiture nextStep={nextStep} prevStep={prevStep} quoteData={quoteData} updateQuoteData={updateQuoteData} />;
                } else {
                    return (
                        <div>
                            <p>Sélectionnez d'abord un matériau de toiture.</p>
                            <button onClick={prevStep}>Retour</button>
                        </div>
                    );
                }
            case 8:
                return <ToleGalvanise nextStep={nextStep} prevStep={prevStep} quoteData={quoteData} updateQuoteData={updateQuoteData} />;
            case 9:
                return <TileSelection nextStep={nextStep} prevStep={prevStep} quoteData={quoteData} updateQuoteData={updateQuoteData} />;
            case 10:
                return <DevisFinal quoteData={quoteData} totalCost={calculateTotalCost()} onConfirm={confirmDevis} onEdit={prevStep} />;
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
